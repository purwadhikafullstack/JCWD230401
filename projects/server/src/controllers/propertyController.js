const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const transporter = require("../helper/nodemailer");
const con =  require('../helper/dbCon')


module.exports = {
    getAllProperty: async (req, res, next) => {
        let get = await model.property.findAll({
            include: [
                { model: model.picture_property },
                { model: model.property_location, include: [{ model: model.province }] },
                {
                    model: model.room,
                    order: [['price', 'DESC']] // belom kelar msh tunggu dri mas abdi
                },
            ],
        });
        console.log("resss", get)
        res.status(200).send(get)
    },
    filterProperty: async (req, res, next) => {
        try {
            console.log("req.query", req.query)
            let { page, size, name, sortby, order, category, city } = req.query;
            if (!page) {
                page = 0;
            }
            if (!size) {
                size = 6;
            }
            if (!sortby) {
                sortby = 'property'
            }
            if (!order) {
                order = 'ASC'
            }

            let get = await model.property.findAndCountAll({
                offset: parseInt(page * size),
                limit: parseInt(size),
                distinct: true,
                where: { property: { [sequelize.Op.like]: `%${name}%` } },
                include: [
                    {
                        model: model.room, attributes: ['id', 'price'], required: true, order: [[model.room, 'price', 'asc']],
                        include: [{
                            model: model.order,
                            required: false,
                            where: {
                                [sequelize.Op.or]: [
                                   { id: {
                                        [sequelize.Op.notIn]: [
                                            sequelize.literal(`SELECT roomId FROM orders WHERE start_date >= '2023-04-03' AND end_date <= '2023-04-06' OR start_date is null and end_date is null`)
                                        ]
                                    }},
                                    {
                                        id: null
                                    }

                                ]
                            },
                        }]
                    },
                    {
                        model: model.picture_property, required: true, attributes: ['picture']
                    },
                    {
                        model: model.category, required: true, attributes: ['category'], where: {
                            category: { [sequelize.Op.like]: `%${category}%` }
                        }
                    },
                    { model: model.property_location, required: true, include: [{ model: model.province, required: true, where: { name: { [sequelize.Op.like]: `%${city}%` } } }] }
                ],
                order: sortby == 'property' ? [[sortby, order]] : [[model.room, sortby, order]]
            })
            console.log("getttttt filter categoryyyy", get)
            return res.status(200).send({
                data: get.rows,
                datanum: get.count,
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    testing: async (req, res, next) => {
        try {
            // let get = await model.room_category.findAll({
            //     include: [{
            //         model: model.room, where: {
            //             // id: {
            //             //     [sequelize.Op.notIn]: sequelize.literal(`
            //             //     SELECT orders.roomId FROM orders JOIN transactions ON orders.transactionId = transactions.id WHERE transactions.transaction_statusId = 2`)
            //             // }
            //         }
            //     }]
            // })

            // const con = new sequelize(
            //     'tempatku_database',
            //     'daniel',
            //     '1234567890',
            //     {
            //         host: "localhost",
            //         dialect: "mysql",
            //         operatorsAliases: false,
            //         pool: {
            //             max: 5,
            //             min: 0,
            //             acquire: 30000,
            //             idle: 10000
            //         },
            //     },
            // );

            // const query = `select * from room_categories join rooms on room_categories.id = rooms.room_categoryId join picture_rooms on rooms.id = picture_rooms.roomId where rooms.id not in (select roomId from orders join transactions on orders.transactionId = transactions.id where transaction_statusId in (1,2))`
            // const query = `select * from room_categories join rooms on room_categories.id = rooms.room_categoryId where rooms.id not in (select roomId from orders join transactions on orders.transactionId = transactions.id where transaction_statusId in (1,2) and not (start_date >= '2023-04-04' and end_date <= '2023-04-05'));`

            // query get available room only !
            // const query = `select * from rooms where propertyId = 2 and rooms.id not in (select roomId from orders where start_date >= '2023-04-03' and end_date <= '2023-04-06')`
            // const get = await con.query(query, { type: sequelize.QueryTypes.SELECT })
            // console.log('ini gett queryyy', get)
            // res.status(200).send(get)

            // GET ROOM DETAIL DONE !!!
            let get = await model.room.findAll({
                where: {
                    propertyId: 2,
                    id: {
                        [sequelize.Op.notIn]: [
                            sequelize.literal(`SELECT roomId FROM orders WHERE start_date >= '2023-04-05' AND end_date <= '2023-04-06'`)
                        ]
                    }
                }
            });
            res.status(200).send(get)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}