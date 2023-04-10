const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
// const transporter = require("../helper/nodemailer");
const con = require('../helper/dbCon')


module.exports = {
    getAllProperty: async (req, res, next) => {
        let get = await model.property.findAll({
            include: [
                { model: model.picture_property },
                {
                    model: model.property_location,
                    include: [{ model: model.province }]
                },
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
            let { page, size, name, sortby, order, category, city, start, end } = req.query;
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

            if (!start) {
                start = new Date().toISOString().split('T')[0];
            }

            if (!end) {
                end = new Date()
                let oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
                end = new Date(end.getTime() + oneDayInMs).toISOString().split('T')[0];
                console.log("endd", end);
            }

            let get = await model.property.findAndCountAll({
                // offset: parseInt(page * size),
                // limit: parseInt(size),
                distinct: true,
                where: { property: { [sequelize.Op.like]: `%${name}%` } },
                include: [
                    {
                        model: model.room,
                        attributes: ['id', 'price'],
                        required: true,
                        order: [[model.room, 'price', 'asc']],
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

            const query = `
            Select r.*, o.start_date, o.end_date FROM rooms r left join orders o on r.id=o.roomId 
            WHERE start_date is null OR start_date < '${start}' OR start_date > '${end}' OR end_date < '${start}' OR end_date > '${end}' order by r.propertyId;`
            const getAvailable = await con.query(query, {
                type: sequelize.QueryTypes.SELECT
            })
            let newData = [];
            let plainObj = get.rows.map(e => e.get({ plain: true })); // merubah object sequelize to plain object javascript
            plainObj.forEach((val, i) => {
                let temp = [];
                val.rooms.forEach((valData, idx) => {
                    let check = getAvailable.filter((e) => {
                        return valData.id == e.id
                    })
                    if (check.length) {
                        temp.push(check[0])
                    }
                });
                if (temp.length) {
                    newData.push({
                        ...val, rooms: temp
                    })
                };
            });

            // let filterData =  newData.slice((page - 1) * size, page * size )
            let filterData =  newData.slice(page * size, page * size + size)
            console.log("filter DATAA", filterData)

            return res.status(200).send({
                data: filterData,
                datanum: newData.length
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getRoomAvailable: async (req, res, next) => {
        try {
            // query get available room only !
            // const query = `select * from rooms where propertyId = 2 and rooms.id not in (select roomId from orders where start_date >= '2023-04-03' and end_date <= '2023-04-06')`
            // const get = await con.query(query, { type: sequelize.QueryTypes.SELECT })
            // console.log('ini gett queryyy', get)
            // res.status(200).send(get)

            if (!req.body.start) {
                req.body.start = new Date().toISOString().split('T')[0];
            }

            if (!req.body.end) {
                req.body.end = new Date()
                let oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
                req.body.end = new Date(req.body.end.getTime() + oneDayInMs).toISOString().split('T')[0];
                console.log("endd", req.body.end);
            }

            let getPropertyId = await model.property.findAll({
                where: {
                    uuid: req.body.uuid
                }
            });

            let get = await model.room.findAll({
                where: {
                    propertyId: getPropertyId[0].dataValues.id,
                    id: {
                        [sequelize.Op.notIn]: [
                            sequelize.literal(`SELECT roomId FROM orders WHERE start_date >= '${req.body.start}' AND end_date <= '${req.body.end}'`)
                        ]
                    }
                },
                include: [
                    {model: model.room_category, attributes: ['name']},
                    {model: model.picture_room, attributes: ['picture']},
                ]
            });
            res.status(200).send(get)
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    getPropertyDetail: async (req, res, next) => {
        let get = await model.property.findAll({
            include: [
                {
                    model: model.room,
                    attributes: ['price']
                },
                {
                    model: model.property_location, include: [{ model: model.regency }]
                },
                {
                    model: model.picture_property

                },
                {
                    model: model.user, include: [{model: model.user_detail, attributes: ['name']}]
                },

            ],
            order: [[model.room, 'price', 'asc']],
            where: {
                uuid: req.body.uuid
            },

        });
        res.status(200).send(get)
    },
    getPicturePropertyDetail: async (req,res,next) => {
        let getProperty = await model.property.findAll({
            where: {
                uuid: req.body.uuid
            }
        });
        let getPictureProperty = await model.picture_property.findAll({
            where: {
                propertyId : getProperty[0].dataValues.id
            }
        });

        res.status(200).send(getPictureProperty)
        console.log("getPictureProperty",getPictureProperty);
    }
}