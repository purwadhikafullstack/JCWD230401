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
            Select r.*, o.start_date, o.end_date, t.transaction_statusId FROM rooms r left join orders o on r.id=o.roomId 
            left join transactions t on o.transactionId = t.id WHERE start_date is null OR start_date < '${start}' OR start_date > '${end}' OR end_date < '${start}' OR end_date > '${end}' OR t.transaction_statusId = 5 order by r.propertyId;`

            // const query = `
            // Select r.*, o.start_date, o.end_date, t.transaction_statusId FROM rooms r left join orders o on r.id=o.roomId 
            // left join transactions t on o.transactionId = t.id WHERE (start_date >= '${start}' AND start_date <= '${end}' AND t.transaction_statusId = 5) OR (end_date >= '${start}' AND end_date <= '${end}' AND t.transaction_statusId = 5) OR start_date is null `

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
            let filterData = newData.slice(page * size, page * size + size)
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

            if (!req.query.start) {
                req.query.start = new Date().toISOString().split('T')[0];
            }

            if (!req.query.end) {
                req.query.end = new Date()
                let oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
                req.query.end = new Date(req.query.end.getTime() + oneDayInMs).toISOString().split('T')[0];
                console.log("endd", req.query.end);
            }

            let getPropertyId = await model.property.findAll({
                where: {
                    uuid: req.query.uuid
                }
            });

            let get = await model.room.findAll({
                where: {
                    propertyId: getPropertyId[0].dataValues.id,
                    isDeleted: 0,
                    [sequelize.Op.and]: [
                        {
                            id: {
                                [sequelize.Op.notIn]: [
                                    sequelize.literal(`(
                                        SELECT roomId FROM orders join transactions on orders.transactionId = transactions.id WHERE 
                                        ((start_date >= '${req.query.start}' AND start_date <= '${req.query.end}')
                                        OR 
                                        (end_date >= '${req.query.start}' AND end_date <= '${req.query.end}')
                                        ) 
                                        AND transactions.transaction_statusId IN (1,2,3,4)) 
                                        `)
                                ]
                            }
                        },
                        {
                            id: {
                                [sequelize.Op.notIn]: [
                                    sequelize.literal(`
                                    SELECT roomId FROM maintenances WHERE 
                                    (maintenances.startDate >= '${req.query.start}' and maintenances.startDate <= '${req.query.end}') 
                                    or 
                                    (maintenances.endDate >= '${req.query.start}' and maintenances.endDate <= '${req.query.end}') 
                                        `)
                                ],
                            },
                        }
                    ]

                },
                include: [
                    { model: model.room_category, attributes: ['name'] },
                    { model: model.picture_room, attributes: ['picture'] },
                ]
            });

            const query = `
                SELECT s.id, s.startDate, s.endDate, s.priceOnDate, s.isActive, s.roomId ,r.propertyId FROM special_prices s join rooms r
                on s.roomId = r.id 
                WHERE  '${req.query.start}' >= startDate 
                AND (
                    (startDate >= '${req.query.start}' and startDate <= '${req.query.end}') 
                    or 
                    (endDate >= '${req.query.start}' and endDate <= '${req.query.end}')
                )
                AND 
                isActive = 1
                ;
            `

            const special_prices = await con.query(query, {
                type: sequelize.QueryTypes.SELECT
            });



            const final = get.map((val1) => {
                let special_price = special_prices.find((val2) => val2.roomId === val1.dataValues.id)
                if (special_price) {
                    return { ...val1.dataValues, price: special_price.priceOnDate }
                } else {
                    return val1
                }
            })

            console.log("get room available", final);

            res.status(200).send(final)
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    getPropertyDetail: async (req, res, next) => {
        try {
            let get = await model.property.findAll({
                include: [
                    {
                        model: model.room,
                        attributes: ['id', 'price', 'uuid']
                    },
                    {
                        model: model.property_location, include: [{ model: model.regency }]
                    },
                    {
                        model: model.picture_property
                    },
                    {
                        model: model.user, include: [{ model: model.user_detail, attributes: ['name', 'image_profile'] }]
                    },

                ],
                order: [[model.room, 'price', 'asc']],
                where: {
                    uuid: req.query.uuid
                },

            });

            const query = `
                SELECT s.id, s.startDate, s.endDate, s.priceOnDate, s.isActive, s.roomId ,r.propertyId FROM special_prices s join rooms r
                on s.roomId = r.id 
                join properties p on r.propertyId = p.id
                WHERE  '${req.query.start}' >= startDate 
                AND (
                    (startDate >= '${req.query.start}' and startDate <= '${req.query.end}') 
                    or 
                    (endDate >= '${req.query.start}' and endDate <= '${req.query.end}')
                )
                AND s.isActive = 1
                AND p.uuid = '${req.query.uuid}'
                ;
            `

            const special_prices = await con.query(query, {
                type: sequelize.QueryTypes.SELECT
            });

            if (special_prices.length) {
                let newRoomPrice = get[0].dataValues.rooms.map((val, idx) => {
                    let special_price = special_prices.find((val2) => {
                        return val2.roomId === val.dataValues.id
                    })
                    val.dataValues = { ...val.dataValues, price: special_price ? special_price.priceOnDate : val.dataValues.price }
                    return val;
                })
                newRoomPrice = newRoomPrice.sort((a, b) => a.price - b.price)
                return res.status(200).send({ ...get[0].dataValues, rooms: newRoomPrice })
            } else {
                get[0].dataValues.rooms.sort((a, b) => a.dataValues.price - b.dataValues.price)
                res.status(200).send(get[0])
            }
        } catch (error) {
            console.log(error);
            next(error);
        }

    },
    getPicturePropertyDetail: async (req, res, next) => {
        try {
            let getProperty = await model.property.findAll({
                where: {
                    uuid: req.query.uuid
                }
            });
            let getPictureProperty = await model.picture_property.findAll({
                where: {
                    propertyId: getProperty[0].dataValues.id
                }
            });

            res.status(200).send(getPictureProperty)
            console.log("getPictureProperty", getPictureProperty);
        } catch (error) {
            console.log(error);
            next(error);
        }

    },
    getAvailableProperty: async (req, res, next) => {
        let today = new Date().toISOString().split('T')[0]
        let tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        let name = req.query.name || ''
        let start = req.query.start || today
        let end = req.query.end || new Date(tomorrow).toISOString().split('T')[0]
        let capacity = req.query.capacity || ''
        let category = req.query.category || ''
        let sortby = req.query.sortby || 'property'
        let order = req.query.order || "DESC"
        let city = req.query.city || ''
        let limit = parseInt(parseInt(req.query.size) || 3)
        let offset = parseInt(((parseInt(req.query.page) || 1) - 1) * (parseInt(req.query.size) || 3))

        // Available Property
        const query1 = `select properties.id, 
        properties.uuid as uuid,
        properties.property as property_name ,
        min(rooms.price) as property_price, 
        picture_properties.picture, 
        provinces.name as province_name, 
        regencies.name as regency_name,
        property_locations.country as country,
        avg(reviews.rating) as rating,
        count(*) OVER() AS total_data
        from properties
        join rooms on properties.id = rooms.propertyId
        join categories on properties.categoryId = categories.id
        left join reviews on rooms.id = reviews.roomId
        left join maintenances on rooms.id = maintenances.roomId -- maintenance
        join picture_properties on properties.id = picture_properties.propertyId
        join property_locations on properties.id = property_locations.propertyId
        join provinces on property_locations.provinceId = provinces.id
        join regencies on property_locations.regency_id = regencies.id
        where properties.property like '%${name}%' and properties.id in (
            select distinct propertyId from rooms where rooms.id not in (
                select roomId from orders join transactions 
                on orders.transactionId = transactions.id 
                where 
                transactions.transaction_statusId IN (1,2,3,4)
                and (
                (start_date >= '${start}' and start_date <= '${end}') 
                or 
                (end_date >= '${start}' and end_date <= '${end}'))
            ) AND rooms.id not in (
                SELECT roomId FROM maintenances WHERE (startDate >= '${start}' and startDate <= '${end}') 
                or 
                (endDate >= '${start}' and endDate <= '${end}') 
            ) AND properties.isDeleted = 0 AND rooms.capacity >= '${capacity}'
        ) AND categories.category LIKE '%${category}%' AND provinces.name LIKE '%${city}%'
        group by properties.id, properties.property, picture_properties.picture, provinces.name, 
        regencies.name
        order by properties.property ${order} 
        limit ${limit} offset ${offset}
        ;`

        // Special Price
        const query2 = `
        SELECT s.id, s.startDate, s.endDate, s.priceOnDate, s.isActive, r.propertyId FROM special_prices s join rooms r
        on s.roomId = r.id 
        WHERE  '${start}' >= startDate 
        AND (
            (startDate >= '${start}' and startDate <= '${end}') 
            or 
            (endDate >= '${start}' and endDate <= '${end}')
        )
        AND 
        isActive = 1
        ;`

        // Total Data (count)
        const query3 = `select 
        count(*) OVER() AS total_data
        from properties
        join rooms on properties.id = rooms.propertyId
        left join reviews on rooms.id = reviews.roomId
        join categories on properties.categoryId = categories.id
        left join maintenances on rooms.id = maintenances.roomId -- maintenance
        join picture_properties on properties.id = picture_properties.propertyId
        join property_locations on properties.id = property_locations.propertyId
        join provinces on property_locations.provinceId = provinces.id
        join regencies on property_locations.regency_id = regencies.id
        where properties.property like '%${name}%' and properties.id in (
            select distinct propertyId from rooms where rooms.id not in (
                select roomId from orders join transactions 
                on orders.transactionId = transactions.id 
                where 
                transactions.transaction_statusId IN (1,2,3,4)
                and (
                (start_date >= '${start}' and start_date <= '${end}') 
                or 
                (end_date >= '${start}' and end_date <= '${end}'))
            ) AND rooms.id not in (
                SELECT roomId FROM maintenances WHERE (startDate >= '${start}' and startDate <= '${end}') 
                or 
                (endDate >= '${start}' and endDate <= '${end}') 
            ) AND properties.isDeleted = 0 AND rooms.capacity >= '${capacity}'
        ) AND categories.category LIKE '%${category}%' AND provinces.name LIKE '%${city}%'
        group by properties.id, properties.property, picture_properties.picture, provinces.name, 
        regencies.name 
        ;`

        const room_available = await con.query(query1, {
            type: sequelize.QueryTypes.SELECT
        })

        const special_prices = await con.query(query2, {
            type: sequelize.QueryTypes.SELECT
        })

        const total_data = await con.query(query3, {
            type: sequelize.QueryTypes.SELECT
        })
        console.log("room_available", room_available);

        // function sort by
        const sortbyFunc = (result) => {
            if (sortby === 'price' && order === 'ASC') {
                return result.sort((a, b) => a.property_price - b.property_price)
            } else if (sortby === 'price' && order === 'DESC') {
                return result.sort((a, b) => b.property_price - a.property_price)
            } else {
                return result
            }
        }

        if (special_prices.length) {
            const final_result = room_available.map((val1) => {
                let special_price = special_prices.find((val2) => val2.propertyId === val1.id)
                if (special_price) {
                    return { ...val1, property_price: special_price.priceOnDate }
                } else {
                    return val1
                }
            })
            console.log("final result");
            res.status(200).send({
                success: true,
                data: sortbyFunc(final_result),
                total_data: total_data.length
            })
        } else {
            console.log("room_available");
            res.status(200).send({
                success: true,
                data: sortbyFunc(room_available),
                total_data: total_data.length
            })
        }
    }
}