const model = require('../models');
const sequelize = require('sequelize');
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const fs = require('fs')

module.exports = {
    newTransaction: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            // EXPIRED AT + 2 HOUR
            let now = new Date();
            now.setHours(now.getHours() + 2)

            let transaksi = await model.transaction.create({
                uuid: uuidv4(),
                transaction_statusId: 1,
                userId: req.decrypt.id,
                discount: 0,
                expiredAT: now.toISOString(),
                invoice_number: now.getTime()
            },
                { transaction: ormTransaction }
            );

            let addOrder = await model.order.create({
                uuid: uuidv4(),
                start_date: req.body.start,
                end_date: req.body.end,
                price: req.body.price,
                transactionId: transaksi.dataValues.id,
                roomId: req.body.roomId
            },
                { transaction: ormTransaction }
            );

            await ormTransaction.commit();
            res.status(200).send({
                success: true,
                data1: transaksi,
                data2: addOrder
            })

        } catch (error) {
            await ormTransaction.rollback();
            console.log(error);
            next(error);
        }
    },
    getTransactionTimeAndBank: async (req, res, next) => {
        let getTransactionTime = await model.transaction.findAll({
            attributes: ['createdAt'],
            where: {
                uuid: req.body.uuid
            },
            include: [
                {
                    model: model.order, attributes: ['start_date', 'end_date', 'price'],
                    include: [{
                        model: model.room, attributes: ['room_categoryId'],
                        include: [{
                            model: model.room_category, attributes: ['user_id']
                        }]
                    }]
                },
                {
                    model: model.transaction_status, attributes: ['status']
                }
            ]
        });
        let getBank = await model.user.findAll({
            include: [{ model: model.user_detail, attributes: ['name', 'account_number'] }],
            attributes: ['uuid'],
            where: {
                id: getTransactionTime[0].orders[0].room.room_category.user_id
            }
        })
        res.status(200).send({
            success: true,
            timeAndPrice: getTransactionTime,
            bank: getBank
        })
    },
    uploadImagePayment: async (req, res, next) => {
        let get = await model.transaction.findAll({ // get untuk di pakai di fs
            attributes: ['image_payment'],
            where: {
                uuid: req.params.uuid
            }
        });
        console.log("get transs", get)
        console.log("req.files", req.files);
        let update = await model.transaction.update({
            image_payment: `/ImgPayment/${req.files[0].filename}`
        }, {
            where: {
                uuid: req.params.uuid
            }
        });
        if (fs.existsSync(`./src/public${get[0].dataValues.image_payment}`)) {
            fs.unlinkSync(`./src/public${get[0].dataValues.image_payment}`);
        }
        res.status(200).send({
            success: true,
            message: 'Image Uploaded',
            // data: update
        })
    },
    cancelOrReject: async (req, res, next) => {
        let update = await model.transaction.update({
            transaction_statusId: req.query.statusid
        }, {
            where: {
                uuid: req.query.uuid
            }
        });
        res.status(200).send({
            success: true,
            message: "transaction status updated"
        })
    }
}