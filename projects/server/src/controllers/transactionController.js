const model = require('../models');
const sequelize = require('sequelize');
const path = require('path');
const { v4: uuidv4 } = require("uuid");

module.exports = {
    newTransaction: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {

            // GET USER GAK PERLU KRN DI DECRYPT ADA USER ID
            let transaksi = await model.transaction.create({
                uuid: uuidv4(),
                transaction_statusId: 1,
                userId: req.decrypt.id,
                expiredAT: req, // ???????????????????????????????????????
            },
                { transaction: ormTransaction }
            );

            let addOrder = await model.order.create({
                uuid: uuidv4(),
                startDate: req.body.start,
                endDate: req.body.end,
                price: req.body.price,
                transactionId: transaksi.dataValues.id,
                roomId: req.body.roomId
            },
                { transaction: ormTransaction }
            );

            await ormTransaction.commit();
            res.status(200).send({
                success: true,
                data: addOrder
            })

        } catch (error) {
            await ormTransaction.rollback();
            console.log(error);
            next(error);
        }
    }
}