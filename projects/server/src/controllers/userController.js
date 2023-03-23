const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");


let salt = bcrypt.genSaltSync(10);

module.exports = {
  //1. REGISTER
  register: async (req, res, next) => {
    const ormTransaction = await model.sequelize.transaction();
    try {
      let checkExistingUser = await model.users.findAll({
        where: {
          email: req.body.email
        }
      });
      if(checkExistingUser == 0){
        if(req.body.password == req.body.confirmationPassword){
          delete req.body.confirmationPassword;
          req.body.password = bcrypt.hashSync(req.body.password, salt);
          console.log("Check data after hash password :", req.body);
          const uuid = uuidv4();
          const { name, email, password, phone, roleId } = req.body;
          let regis = await model.users.create( 
          {
            uuid,
            name,
            email,
            phone,
            password,
            roleId,
          },
          {transaction: ormTransaction}         
          );
          await ormTransaction.commit();
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
          message: "Error❌: Email exist.",
        });
      }
    } catch (error) {
      await ormTransaction.rollback();
      console.log(error);
      next(error);
    }
  }
};
