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
          console.log("Check data after hash password :", req.body);
          const uuid = uuidv4();
          const { name, email, password, phone } = req.body;
          let regis = await model.users.create(
            {
              uuid,
              name,
              email,
              phone,
              password,
              roleId: 1,
            }
          );
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
          let token = createToken({ id, uuid }, "400h");
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
      let token = createToken({ id, uuid }, "400h");
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
};
