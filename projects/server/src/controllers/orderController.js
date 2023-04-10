const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const transporter = require("../helper/nodemailer");

module.exports = {
    getAllOrder: async (req,res,next) => {
        let get = await model.order.findAndCountAll({
            // offset: parseInt(),
            // limit: parseInt(),
            where: {
                start_date: {
                    [sequelize.Op.gte]: '2023-04-04', // filter by date
                },
                end_date: {
                    [sequelize.Op.lte]: '2023-04-05', // filter by date
                },
                id: { [sequelize.Op.like]: `%%` } // filter by order id
            },
            include: [
                {
                    model: model.transaction, 
                    attributes: ['transaction_statusId'],
                    where: {
                        transaction_statusId: { [sequelize.Op.like]: `%%` }, // filter by transaction_status
                        userId: 2
                    }
                }
            ],
            order:  [['start_date', 'ASC']] // order by date or order id
        });
        res.status(200).send({
            data: get,
            datanum: get.count
        })
    }
}