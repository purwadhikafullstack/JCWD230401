const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
// const transporter = require("../helper/nodemailer");

module.exports = {
    getAllCategory: async (req, res, next) => {
        try {
            let get = await model.category.findAll({
                where: {
                    isDeleted: 0
                }
            });
            console.log(get)
            res.status(200).send(get)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}