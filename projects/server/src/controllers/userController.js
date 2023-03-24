const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");

let salt = bcrypt.genSaltSync(10);

module.exports = {
  //1. REGISTER
  register: async (req, res, next) => {
    try {
      let checkExistingUser = await model.users.findAll({
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
          let regis = await model.users.create({
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
      let getuser = await model.users.findAll({
        where: sequelize.or(
          { email: req.body.email },
          { phone: req.body.phone }
        ),
      });
      console.log("ini getuser buat login :", getuser);
      if (getuser.length > 0) {
        let decrypt = bcrypt.compareSync(
          req.body.password,
          getuser[0].dataValues.password
        );
        if (decrypt) {
          let { id, uuid, name, email, phone, roleId, image_profile } =
            getuser[0].dataValues;
          // GENERATE TOKEN ---> 400h buat gampang aja developnya jgn lupa diganti!
          let token = createToken({ uuid }, "400h"); //td id, uuid
          // LOGIN SUCCESS
          return res.status(200).send({
            success: true,
            message: "Login success ✅",
            token,
            name,
            email,
            phone,
            roleId,
            image_profile,
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Wrong password ❌",
          });
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
      let getuser = await model.users.findAll({
        where: {
          uuid: req.decrypt.uuid,
        },
      });
      let { id, uuid, name, email, phone, roleId, image_profile } =
        getuser[0].dataValues;
      // GENERATE TOKEN ---> 400h buat gampang aja developnya jgn lupa diganti!
      let token = createToken({ uuid }, "400h"); // td uuid
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
      //1. get old password
      let getData = await model.users.findAll({
        where: {
          uuid: req.decrypt.uuid, 
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
              req.body.newPassword = bcrypt.hashSync(req.body.newPassword, salt);
              //5. update the password field in the database with the value of req.body.newPassword
              await model.users.update(
                { password: req.body.newPassword },
                {
                  where: {
                    uuid: req.decrypt.uuid,
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
};
