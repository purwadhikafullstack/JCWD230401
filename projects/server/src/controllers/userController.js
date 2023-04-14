const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const transporter = require("../helper/nodemailer");

let salt = bcrypt.genSaltSync(10);

module.exports = {
  //1. REGISTER
  register: async (req, res, next) => {
    try {
      let checkExistingUser = await model.user.findAll({
        where: sequelize.or(
          { email: req.body.email },
          { phone: req.body.phone }
        ),
      });
      if (checkExistingUser == 0) {
        if (req.body.password == req.body.confirmationPassword) {
          delete req.body.confirmationPassword;
          req.body.password = bcrypt.hashSync(req.body.password, salt);
          console.log("Check data after hash password :", req.body); //testing purposes
          const uuid = uuidv4();
          const { name, email, password, phone } = req.body;
          let regis = await model.user.create({
            uuid,
            name,
            email,
            phone,
            password,
            roleId: 1,
          });
          return res.status(200).send({
            success: true,
            message: "register account success ✅",
            data: regis,
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Error❌: Passwords do not match.",
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: "Error❌: Email or phone number exist.",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  //2. LOGIN
  login: async (req, res, next) => {
    try {
      //1. find email or phone from db
      let getuser = await model.user.findAll({
        where: sequelize.or(
          { email: req.body.email },
          { phone: req.body.phone }
        ),
      });
      console.log("ini getuser buat login :", getuser);
      console.log(
        "ini getuser[0].dataValues.attempts buat login :",
        getuser[0].dataValues.attempts
      );
      //2. if found compare hashed password with req.body.password
      if (getuser.length > 0) {
        let checkpw = bcrypt.compareSync(
          req.body.password,
          getuser[0].dataValues.password
        );
        //3. if isSuspended false 0 & checkpw true 1 ? reset pw attempts : pw attempts + 1
        if (checkpw && getuser[0].dataValues.isSuspended == 0) {
          //4. update the attempts field in the database with 0
          await model.user.update(
            { attempts: 0 },
            {
              where: {
                id: getuser[0].dataValues.id,
              },
            }
          );
          let {
            id,
            uuid,
            name,
            email,
            phone,
            roleId,
            image_profile,
            isSuspended,
            attempts,
          } = getuser[0].dataValues;
          // GENERATE TOKEN ---> 400h buat gampang aja developnya jgn lupa diganti!
          let token = createToken({ id, roleId, isSuspended }, "400h"); //24 jam
          // LOGIN SUCCESS
          return res.status(200).send({
            success: true,
            message: "Login success ✅",
            token,
            name,
            email,
            phone,
            roleId, //---> kirim or not?
            attempts,
            image_profile,
          });
        } else {
          //3. jika salah passwordnya attempt + 1 sampe 5 kali nanti suspended
          if (getuser[0].dataValues.attempts < 5) {
            await model.user.update(
              { attempts: getuser[0].dataValues.attempts + 1 },
              {
                where: {
                  id: getuser[0].dataValues.id,
                },
              }
            );
            res.status(400).send({
              success: false,
              message: `Wrong password ❌ attempt number : ${
                getuser[0].dataValues.attempts + 1
              }`,
            });
          } else {
            await model.user.update(
              { isSuspended: 1 },
              {
                where: {
                  id: getuser[0].dataValues.id,
                },
              }
            );

            res.status(400).send({
              success: false,
              message: "Account suspended ❌ please reset your password",
            });
          }
        }
      } else {
        res.status(400).send({
          success: false,
          message: "Account not found ❌",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  //3. KEEP LOGIN
  keeplogin: async (req, res, next) => {
    try {
      console.log("Decrypt token:", req.decrypt);
      let getuser = await model.user.findAll({
        where: {
          id: req.decrypt.id,
        },
      });
      let { id, uuid, name, email, phone, roleId, image_profile, isSuspended } =
        getuser[0].dataValues;
      // GENERATE TOKEN ---> 400h buat gampang aja developnya jgn lupa diganti!
      let token = createToken({ id, roleId, isSuspended }, "400h"); //24 jam
      // KEEP LOGIN SUCCESS
      return res.status(200).send({
        success: true,
        message: "keep login success ✅",
        token,
        name,
        email,
        phone,
        roleId,
        image_profile,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  //4. CHANGE PASSWORD
  changepassword: async (req, res, next) => {
    try {
      //1. get old password from user yg login
      let getData = await model.user.findAll({
        where: {
          id: req.decrypt.id,
        },
        attributes: ["password"],
      });
      //1. compare current password (hashed) & req.body.password
      if (getData.length > 0) {
        let comparecurrentpw = bcrypt.compareSync(
          req.body.password,
          getData[0].dataValues.password //currentpw
        );
        if (comparecurrentpw) {
          //2. compare newpassword & confirmationpassword
          if (req.body.newPassword == req.body.confirmationPassword) {
            //3. compare new password & current password (hashed)
            let comparecurrentandnewpw = bcrypt.compareSync(
              req.body.newPassword,
              getData[0].dataValues.password //currentpw
            );
            if (!comparecurrentandnewpw) {
              delete req.body.confirmationPassword;
              //4. hash right before update
              req.body.newPassword = bcrypt.hashSync(
                req.body.newPassword,
                salt
              );
              //5. update the password field in the database with the value of req.body.newPassword & read token
              await model.user.update(
                { password: req.body.newPassword },
                {
                  where: {
                    id: req.decrypt.id,
                  },
                }
              );
              return res.status(200).send({
                success: true,
                message: "Change password success ✅",
              });
            } else {
              res.status(400).send({
                success: false,
                message:
                  "Error❌: Your new password cannot be the same as your current password.",
              });
            }
          } else {
            res.status(400).send({
              success: false,
              message:
                "Error❌: New password and confirmation password do not match.",
            });
          }
        } else {
          res.status(400).send({
            success: false,
            message: "Error❌: Current password is incorrect",
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: "Error❌: Current password not found",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  //5. FORGOT PASSWORD
  forgotpassword: async (req, res, next) => {
    try {
      //1. get user data by email
      let getData = await model.user.findAll({
        where: {
          email: req.body.email,
        },
      });
      // console.log("ini getData buat forgot pw :", getData);
      //2. create token to send by email ---> 400h buat gampang aja developnya
      let { id, name, roleId, isSuspended } = getData[0].dataValues;
      let token = createToken({ id, roleId, isSuspended }, "400h"); // apa aja yg jd token? //1 jam (forgot pw dan verifikasi)
      //3. send reset pw email
      await transporter.sendMail({
        from: "Tracker admin",
        to: req.body.email,
        subject: "Reset Password",
        html: `
        <div>
        <p>Hi ${name},</p>
        <p>We've received a request to reset your password.</p>
        <p>To reset your password, click the following link</p>
        <a href="http://localhost:3000/resetpassword/${token}">Reset your password</a> 
        <br>
        <p>Thanks,</p>
        <p>tempatku team</p>
        </div>
        `,
      });
      res.status(200).send({
        success: true,
        message: "email to reset password has been delivered ✅",
        token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  //6. RESET PASSWORD
  resetpassword: async (req, res, next) => {
    try {
      if (req.body.newPassword == req.body.confirmationPassword) {
        console.log("Decrypt token : ", req.decrypt);
        //1. hash right before update
        req.body.newPassword = bcrypt.hashSync(req.body.newPassword, salt);
        //2. update the password & isSuspended 
        await model.user.update(
          { password: req.body.newPassword, isSuspended: 0 },
          {
            //read token
            where: {
              id: req.decrypt.id,
            },
          }
        );
        return res.status(200).send({
          success: true,
          message: "Reset password success ✅",
        });
      } else {
        res.status(400).send({
          success: false,
          message:
            "Error❌: New password and confirmation password do not match.",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  
};
