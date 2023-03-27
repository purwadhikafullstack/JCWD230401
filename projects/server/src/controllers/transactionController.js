const model = require('../models');
const sequelize = require('sequelize');
const path = require('path');

module.exports = {
    newTransaction: async(req,res,next) => {
        try {

        let get = await model.users.findAll({
            where: {
                // ??????
            }
        });

        let transaksi = await model.transaction.create({
            // ?????
        });

        // let newArr = req.body

        // await model.order.bulkCreate(newArr)
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}