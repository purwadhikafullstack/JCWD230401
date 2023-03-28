const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const transporter = require("../helper/nodemailer");

module.exports = {
    getAllProperty: async (req,res,next) => {
        let get = await model.property.findAll({
            include: [
                { model: model.picture_property},
                { model: model.location},
                { model: model.room,
                     order: [['price', 'DESC']]
                    },
            ],
        });
        res.status(200).send(get)
    }
}