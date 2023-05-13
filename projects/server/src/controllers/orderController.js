const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const schedule = require('node-schedule');

module.exports = {
    getAllOrder: async (req, res, next) => {
        try {
            let get = await model.order.findAndCountAll({
                offset: parseInt(((req.query.page || 1) - 1) * (req.query.size || 3)),
                limit: parseInt(req.query.size || 3),
                where: {
                    start_date: {
                        [sequelize.Op.gte]: req.query.start || '2000-01-01', // filter by date
                    },
                    end_date: {
                        [sequelize.Op.lte]: req.query.end || '2030-01-01', // filter by date
                    }
                },
                include: [
                    {
                        model: model.transaction,
                        attributes: ['id', 'transaction_statusId', 'invoice_number', 'uuid'],
                        where: {
                            transaction_statusId: { [sequelize.Op.like]: `%${req.query.status}%` }, // filter by transaction_status
                            userId: req.decrypt.id, //////////// req.decrypt.id
                            invoice_number: { [sequelize.Op.like]: `%${req.query.invoice}%` } // filter by invoice number
                        },
                        include: [
                            {
                                model: model.transaction_status, attributes: ['status']
                            },
                            {
                                model: model.review, attributes: ['review', 'rating']
                            }
                        ]
                    },
                    {
                        model: model.room, attributes: ['id', 'capacity'],
                        include: [
                            {
                                model: model.room_category, attributes: ['name']
                            },
                            {
                                model: model.property, attributes: ['property']
                            },
                            {
                                model: model.picture_room, attributes: ['picture']
                            },
                        ]
                    }
                ],
                order: [[req.query.sortby || 'start_date', req.query.order || 'DESC']] // order by date or order id
            });
            console.log("data paginationnn", get.rows);
            res.status(200).send({
                data: get,
                datanum: get.count
            })
        } catch (error) {
            console.log(error);
            next(error);
        }

    },
    testing: async (req, res, next) => {
        // let get = await model.transaction.findAndCountAll({
        //     // offset: parseInt(((req.query.page || 1) - 1) * (req.query.size || 5)),
        //     // limit: parseInt(req.query.size || 5),
        //     // distinct: true,
        //     where: {
        //         transaction_statusId: 2,
        //     },
        //     include: [
        //         {
        //             model: model.order, required: true,
        //             include: [
        //                 {
        //                     model: model.room, required: true,
        //                     include: [
        //                         {
        //                             model: model.room_category, attributes: ['name'],
        //                         },
        //                         {
        //                             model: model.property, attributes: ['property'],
        //                             where: {
        //                                 userId: 2  // tenant (req.decrypt.id)
        //                             },
        //                             include: [
        //                                 {
        //                                     model: model.property_location, attributes: ['country'],
        //                                     include: [
        //                                         {
        //                                             model: model.regency, attributes: ['name'],
        //                                         }
        //                                     ]
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             model: model.user, attributes: ['uuid'], // user
        //             include: [
        //                 {
        //                     model: model.user_detail, attributes: ['name', 'image_profile']
        //                 }
        //             ]
        //         }
        //     ],
        //     order: [[req.query.sortby || 'id', req.query.order || 'desc']]
        // })
        // res.status(200).send(get)
    },
    getActionsNeededTenant: async (req, res, next) => {
        try {
            let get = await model.order.findAndCountAll({
                offset: parseInt(((req.query.page || 1) - 1) * (req.query.size || 5)),
                limit: parseInt(req.query.size || 1),
                include: [
                    {
                        model: model.transaction, required: true, where: { transaction_statusId: 2 },
                        include: [
                            {
                                model: model.user,
                                include: [{ model: model.user_detail }]
                            }
                        ]
                    },
                    {
                        model: model.room, required: true,
                        include: [
                            {
                                model: model.property, where: { userId: req.decrypt.id }, // req.decrypt.id
                                include: [
                                    {
                                        model: model.property_location, attributes: ['country'],
                                        include: [{ model: model.regency, attributes: ['name'] }]
                                    }
                                ]
                            },
                            {
                                model: model.room_category, attributes: ['name']
                            }
                        ]
                    }
                ],
                order: [[req.query.sortby || 'id', req.query.order || 'desc']]
            });
            res.status(200).send(get)
        } catch (error) {
            console.log(error);
            next(error);
        }

    },
    getSummary: async (req, res, next) => {
        try {
            let get = await model.order.findAndCountAll({
                offset: parseInt(((req.query.page || 1) - 1) * (req.query.size || 2)),
                limit: parseInt(req.query.size || 2),
                include: [
                    {
                        model: model.transaction, required: true, // invoice number
                        include: [
                            { model: model.transaction_status, attributes: ['status'] }, // transaction_status
                            { model: model.user, attributes: ['uuid'], include: [{ model: model.user_detail, attributes: ['name'] }] },

                        ]
                    },
                    {
                        model: model.room, attributes: ['uuid'], required: true,
                        include: [
                            { model: model.room_category, attributes: ['name'] }, // room name
                            { model: model.property, attributes: ['property'], where: { userId: req.decrypt.id } } // req.decrypt.id, property name
                        ]
                    },
                ],
                order: [[req.query.sortby || 'id', req.query.order || 'desc']]
            })
            res.status(200).send(get)
        } catch (error) {
            console.log(error);
            next(error);
        }

    },
    testCron: async (req, res, next) => {

        let get = await model.transaction.findAll({
            attributes: ['transaction_statusId'],
            where: { uuid: "10819e8b-bb12-4d47-a350-fb9818e7598a" }
        });
        console.log("gett", get[0].dataValues.transaction_statusId)
        res.send(get)
        // console.log(new Date().toISOString());
        // const checkinDate = new Date(`${2023 - 04 - 21}T04:00:00.147Z`); // req.body.start_date T 11.00AM WIB
        // const today = new Date();

        // // Calculate the difference in days between today and checkinDate
        // const timeDiff = checkinDate.getTime() - today.getTime();
        // const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // if (dayDiff <= 1) {
        //     // Checkin date is today or tomorrow, so execute the function instantly
        //     console.log('The world is going to end today.');
        // } else if (dayDiff == 2) {
        //     // Checkin date is 2 days in the future, so schedule the function to execute 1 day before the checkin date
        //     const prevDay = new Date(checkinDate.getTime() - (24 * 60 * 60 * 1000));
        //     const task = schedule.scheduleJob(prevDay, async function () {
        //         let update = await model.transaction.update({transaction_statusId: 1}, {
        //             where: {
        //                 uuid: req.body.uuid
        //             }
        //         })
        //     });
        //     task.once('run', () => {
        //         console.log('task ran once, cancelling schedule');
        //         task.cancel();
        //     });
        // } else {
        //     // Checkin date is more than 2 days in the future, so schedule the function to execute on the checkin date
        //     const task = schedule.scheduleJob(checkinDate, function () {
        //         console.log('The world is going to end on ' + checkinDate.toDateString());
        //     });
        //     task.once('run', () => {
        //         console.log('task ran once, cancelling schedule');
        //         task.cancel();
        //     });
        // }


        // // const date = new Date("2023-04-21T19:37:00.147Z");

        // // const job = schedule.scheduleJob(date, function () {
        // //     console.log('The world is going to end today.');
        // // });

        // task.once('run', () => {
        //     console.log('task ran once, cancelling schedule');
        //     task.cancel();
        // });
    }
}