const model = require('../models');
const sequelize = require('sequelize');
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const fs = require('fs')
const schedule = require('node-schedule');


module.exports = {
    newTransaction: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            // EXPIRED AT + 2 HOUR
            let twoHoursLater = new Date();
            twoHoursLater.setHours(twoHoursLater.getHours() + 2)

            let transaksi = await model.transaction.create({
                uuid: uuidv4(),
                transaction_statusId: 1,
                userId: req.decrypt.id,
                discount: 0,
                expiredAt: twoHoursLater.toISOString(),
                invoice_number: twoHoursLater.getTime()
            },
                { transaction: ormTransaction }
            );

            let addOrder = await model.order.create({
                uuid: uuidv4(),
                start_date: req.body.start,
                end_date: req.body.end,
                price: req.body.price,// kalo ada special price gimana ?
                transactionId: transaksi.dataValues.id,
                roomId: req.body.roomId
            },
                { transaction: ormTransaction }
            );

            // NODE-SCHEDULE
            const task = schedule.scheduleJob(twoHoursLater, async function () { // nnti twoHoursLater di ubah ke variable paling atas kalo udah selesai testing
                let get = await model.transaction.findAll({
                    attributes: ['transaction_statusId'],
                    where: { id: transaksi.dataValues.id }
                });
                console.log("getttt : ", get)
                if (get[0].dataValues.transaction_statusId === 1) { // setelah 2 jam ga upload
                    let update = await model.transaction.update({
                        transaction_statusId: 5
                    }, {
                        where: {
                            id: transaksi.dataValues.id
                        }
                    });
                    console.log("transaction status di ubah ke canceled karena tidak membayar")
                }
            });

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
            attributes: ['createdAt', 'transaction_statusId', "invoice_number", "expiredAt"],
            where: {
                uuid: req.query.uuid
            },
            include: [
                {
                    model: model.order, attributes: ['start_date', 'end_date', 'price'],
                    include: [{
                        model: model.room, attributes: ['uuid', 'room_categoryId'],
                        include: [
                            {
                                model: model.room_category, attributes: ['user_id', 'name']
                            }
                        ]
                    }]
                },
                {
                    model: model.transaction_status, attributes: ['status']
                },
                {
                    model: model.user, attributes: ['uuid'],
                    include: [{
                        model: model.user_detail, attributes: ['name'] // user
                    }]
                }
            ]
        });
        let getBank = await model.user.findAll({
            include: [{ model: model.user_detail, attributes: ['name', 'account_number'] }], //  tenant
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
            image_payment: `/ImgPayment/${req.files[0].filename}`,
            transaction_statusId: 2
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
    updateTransactionStatus: async (req, res, next) => {
        let update = await model.transaction.update({
            transaction_statusId: req.body.transaction_statusId
        }, {
            where: {
                uuid: req.body.uuid
            }
        });
        res.status(200).send({
            success: true,
            message: "transaction status updated"
        })
    },
    rejectTransaction: async (req, res, next) => {
        try {
            const twoHoursLater = new Date();
            twoHoursLater.setHours(twoHoursLater.getHours() + 2);

            let update = await model.transaction.update({
                transaction_statusId: 4,
                expiredAt: twoHoursLater
            }, {
                where: {
                    uuid: req.body.uuid
                }
            });

            const task = schedule.scheduleJob(twoHoursLater, async function () {
                let get = await model.transaction.findAll({
                    attributes: ['transaction_statusId'],
                    where: { uuid: req.body.uuid }
                });
                console.log("getttt : ", get)
                if (get[0].dataValues.transaction_statusId === 4) { // setelah 2 jam ga bayar
                    let update = await model.transaction.update({
                        transaction_statusId: 5
                    }, {
                        where: {
                            uuid: req.body.uuid
                        }
                    });
                    console.log("transaction status di ubah ke canceled karena tidak membayar")
                }
            });
            res.status(200).send({
                success: true
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    testCron: async (req, res, next) => {
        console.log(new Date().toISOString());
        const checkinDate = new Date(`${2023 - 04 - 21}T04:00:00.147Z`); // req.body.start_date T 11.00AM WIB
        const today = new Date();

        // Calculate the difference in days between today and checkinDate
        const timeDiff = checkinDate.getTime() - today.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (dayDiff <= 1) {
            // Checkin date is today or tomorrow, so execute the function instantly
            console.log('The world is going to end today.');
        } else if (dayDiff == 2) {
            // Checkin date is 2 days in the future, so schedule the function to execute 1 day before the checkin date
            const prevDay = new Date(checkinDate.getTime() - (24 * 60 * 60 * 1000));
            const task = schedule.scheduleJob(prevDay, async function () {
                let update = await model.transaction.update({ transaction_statusId: 1 }, {
                    where: {
                        uuid: req.body.uuid
                    }
                })
            });
            task.once('run', () => {
                console.log('task ran once, cancelling schedule');
                task.cancel();
            });
        } else {
            // Checkin date is more than 2 days in the future, so schedule the function to execute on the checkin date
            const task = schedule.scheduleJob(checkinDate, function () {
                console.log('The world is going to end on ' + checkinDate.toDateString());
            });
            task.once('run', () => {
                console.log('task ran once, cancelling schedule');
                task.cancel();
            });
        }


        // const date = new Date("2023-04-21T19:37:00.147Z");

        // const job = schedule.scheduleJob(date, function () {
        //     console.log('The world is going to end today.');
        // });

        task.once('run', () => {
            console.log('task ran once, cancelling schedule');
            task.cancel();
        });
    }
}