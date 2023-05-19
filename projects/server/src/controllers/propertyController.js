const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const con = require("../helper/dbCon");
const fs = require("fs");

module.exports = {
    getAllProperty: async (req, res, next) => {
        let get = await model.property.findAll({
            include: [
                { model: model.picture_property },
                {
                    model: model.property_location,
                    include: [{ model: model.province }],
                },
                {
                    model: model.room,
                    order: [["price", "DESC"]], // belom kelar msh tunggu dri mas abdi
                },
            ],
        });
        console.log("resss", get);
        res.status(200).send(get);
    },
    filterProperty: async (req, res, next) => {
        try {
            console.log("req.query", req.query);
            let {
                page,
                size,
                name,
                sortby,
                order,
                category,
                city,
                start,
                end,
            } = req.query;
            if (!page) {
                page = 0;
            }
            if (!size) {
                size = 6;
            }
            if (!sortby) {
                sortby = "property";
            }
            if (!order) {
                order = "ASC";
            }

            if (!start) {
                start = new Date().toISOString().split("T")[0];
            }

            if (!end) {
                end = new Date();
                let oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
                end = new Date(end.getTime() + oneDayInMs)
                    .toISOString()
                    .split("T")[0];
                console.log("endd", end);
            }

            let get = await model.property.findAndCountAll({
                distinct: true,
                where: { property: { [sequelize.Op.like]: `%${name}%` } },
                include: [
                    {
                        model: model.room,
                        attributes: ["id", "price"],
                        required: true,
                        order: [[model.room, "price", "asc"]],
                    },
                    {
                        model: model.picture_property,
                        required: true,
                        attributes: ["picture"],
                    },
                    {
                        model: model.category,
                        required: true,
                        attributes: ["category"],
                        where: {
                            category: { [sequelize.Op.like]: `%${category}%` },
                        },
                    },
                    {
                        model: model.property_location,
                        required: true,
                        include: [
                            {
                                model: model.province,
                                required: true,
                                where: {
                                    name: { [sequelize.Op.like]: `%${city}%` },
                                },
                            },
                        ],
                    },
                ],
                order:
                    sortby == "property"
                        ? [[sortby, order]]
                        : [[model.room, sortby, order]],
            });

            const query = `
            Select r.*, o.start_date, o.end_date, t.transaction_statusId FROM rooms r left join orders o on r.id=o.roomId 
            left join transactions t on o.transactionId = t.id WHERE start_date is null OR start_date < '${start}' OR start_date > '${end}' OR end_date < '${start}' OR end_date > '${end}' OR t.transaction_statusId IN (4,5) order by r.propertyId;`;
            const getAvailable = await con.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });
            let newData = [];
            let plainObj = get.rows.map((e) => e.get({ plain: true })); // merubah object sequelize to plain object javascript
            plainObj.forEach((val, i) => {
                let temp = [];
                val.rooms.forEach((valData, idx) => {
                    let check = getAvailable.filter((e) => {
                        return valData.id == e.id;
                    });
                    if (check.length) {
                        temp.push(check[0]);
                    }
                });
                if (temp.length) {
                    newData.push({
                        ...val,
                        rooms: temp,
                    });
                }
            });

            // let filterData =  newData.slice((page - 1) * size, page * size )
            let filterData = newData.slice(page * size, page * size + size);
            console.log("filter DATAA", filterData);

            return res.status(200).send({
                data: filterData,
                datanum: newData.length,
            });
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
                req.body.start = new Date().toISOString().split("T")[0];
            }

            if (!req.body.end) {
                req.body.end = new Date();
                let oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
                req.body.end = new Date(req.body.end.getTime() + oneDayInMs)
                    .toISOString()
                    .split("T")[0];
                console.log("endd", req.body.end);
            }

            let getPropertyId = await model.property.findAll({
                where: {
                    uuid: req.body.uuid,
                },
            });

            let get = await model.room.findAll({
                where: {
                    propertyId: getPropertyId[0].dataValues.id,
                    id: {
                        [sequelize.Op.notIn]: [
                            sequelize.literal(
                                `SELECT roomId FROM orders join transactions on orders.transactionId = transactions.id WHERE start_date >= '${req.body.start}' AND end_date <= '${req.body.end}' AND transactions.transaction_statusId IN (1,2,3)`
                            ), // tambahin transaction_statusId
                        ],
                    },
                },
                include: [
                    { model: model.room_category, attributes: ["name"] },
                    { model: model.picture_room, attributes: ["picture"] },
                ],
            });
            res.status(200).send(get);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getPropertyDetail: async (req, res, next) => {
        let get = await model.property.findAll({
            include: [
                {
                    model: model.room,
                    attributes: ["price"],
                },
                {
                    model: model.property_location,
                    include: [{ model: model.regency }],
                },
                {
                    model: model.picture_property,
                },
                {
                    model: model.user,
                    include: [
                        { model: model.user_detail, attributes: ["name"] },
                    ],
                },
            ],
            order: [[model.room, "price", "asc"]],
            where: {
                uuid: req.body.uuid,
            },
        });
        res.status(200).send(get);
    },
    getPicturePropertyDetail: async (req, res, next) => {
        let getProperty = await model.property.findAll({
            where: {
                uuid: req.body.uuid,
            },
        });
        let getPictureProperty = await model.picture_property.findAll({
            where: {
                propertyId: getProperty[0].dataValues.id,
            },
        });
    },
    getAllPropertyTenant: async (req, res, next) => {
        try {
            let get = await model.property.findAll({
                include: [
                    {
                        model: model.property_location,
                        attributes: ["address"],
                    },
                ],
            });
            console.log("get all properties:", get);
            return res.status(200).send({
                success: true,
                data: get,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getProvince: async (req, res, next) => {
        try {
            let get = await model.province.findAll({
                attributes: [
                    ["id", "value"],
                    ["name", "label"],
                ],
            });
            return res.status(200).send(get);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getRegencyByProvinceId: async (req, res, next) => {
        try {
            console.log("province_id", req.body.province_id);
            let get = await model.regency.findAll({
                where: {
                    province_id: req.body.province_id,
                },
                attributes: [
                    ["id", "value"],
                    ["name", "label"],
                    ["province_id", "province_id"],
                ],
            });
            return res.status(200).send(get);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    addProperty: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            let {
                category,
                property,
                description,
                address,
                regencyId,
                provinceId,
                zipcode,
                country,
                gmaps,
            } = JSON.parse(req.body.data);

            let addCategory = await model.category.create(
                {
                    uuid: uuidv4(),
                    category: category,
                },
                { transaction: ormTransaction }
            );

            let addProperty = await model.property.create(
                {
                    uuid: uuidv4(),
                    property,
                    description,
                    categoryId: addCategory.dataValues.id,
                    userId: req.decrypt.id,
                },
                { transaction: ormTransaction }
            );

            if (req.files.length) {
                let newArr = req.files.map((val, idx) => {
                    delete val.fieldname;
                    delete val.originalname;
                    delete val.encoding;
                    delete val.mimetype;
                    delete val.destination;
                    delete val.path;
                    delete val.size;
                    val.picture = `/ImgProperty/${val.filename}`;
                    delete val.filename;
                    return { ...val, propertyId: addProperty.dataValues.id };
                });
                await model.picture_property.bulkCreate(newArr);
            }

            let addPropertyLocation = await model.property_location.create(
                {
                    uuid: uuidv4(),
                    address: address,
                    zip: zipcode,
                    country: country,
                    gmaps: gmaps,
                    regencyId: regencyId,
                    provinceId: provinceId,
                    propertyId: addProperty.dataValues.id,
                },
                { transaction: ormTransaction }
            );

            await ormTransaction.commit();

            return res.status(200).send({
                success: true,
                message: "Added new property",
            });
        } catch (error) {
            await ormTransaction.rollback();
            console.log(error);
            next(error);
        }
    },
    getPropertyData: async (req, res, next) => {
        try {
            let get = await model.property.findAll({
                where: { uuid: req.params.uuid },
                include: [
                    {
                        model: model.category,
                        attributes: ["category"],
                    },
                    {
                        model: model.picture_property,
                        attributes: ["picture", "id"],
                        required: false,
                        where: {
                            isDeleted: 0,
                        },
                    },
                    {
                        model: model.property_location,
                    },
                ],
            });

            return res.status(200).send({
                success: true,
                data: get,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    editProperty: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            let getPropertyByUuid = await model.property.findAll({
                where: {
                    uuid: req.params.uuid,
                },
                include: [
                    { model: model.property_location, attributes: ["id"] },
                    { model: model.category, attributes: ["id"] },
                ],
            });

            let editCategory = await model.category.update(
                {
                    category: req.body.category,
                },
                {
                    where: {
                        id: getPropertyByUuid[0].dataValues.categoryId,
                    },
                },
                { transaction: ormTransaction }
            );

            let editProperty = await model.property.update(
                {
                    property: req.body.property,
                    description: req.body.description,
                },
                {
                    where: {
                        uuid: getPropertyByUuid[0].dataValues.uuid,
                    },
                },
                { transaction: ormTransaction }
            );

            let editPropertyLocation = await model.property_location.update(
                {
                    address: req.body.address,
                    zip: req.body.zipcode,
                    country: req.body.country,
                    regencyId: req.body.regencyId,
                    provinceId: req.body.provinceId,
                    gmaps: req.body.gmaps,
                },
                {
                    where: {
                        id: getPropertyByUuid[0].dataValues.property_location
                            .id,
                    },
                },
                { transaction: ormTransaction }
            );

            await ormTransaction.commit();

            return res.status(200).send({
                success: true,
                message: "Added new property",
            });
        } catch (error) {
            await ormTransaction.rollback();
            console.log(error);
            next(error);
        }
    },
    updateImageProperty: async (req, res, next) => {
        try {
            if (!isNaN(req.query.id)) {
                let get = await model.picture_property.findAll({
                    where: {
                        id: req.query.id,
                    },
                });
                console.log("ini req.files:", req.files);
                let update = await model.picture_property.update(
                    {
                        picture: `/ImgProperty/${req.files[0].filename}`,
                    },
                    {
                        where: {
                            id: req.query.id,
                        },
                    }
                );
                if (fs.existsSync(`./src/public${get[0].dataValues.picture}`)) {
                    fs.unlinkSync(`./src/public${get[0].dataValues.picture}`);
                }
            } else {
                let add = await model.picture_property.create({
                    propertyId: req.query.propertyId,
                    picture: `/ImgProperty/${req.files[0].filename}`,
                });
            }
            res.status(200).send({
                success: true,
                message: "Image Updated/Uploaded",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deletePropertyPicture: async (req, res, next) => {
        try {
            let del = await model.picture_property.update(
                {
                    isDeleted: 1,
                },
                {
                    where: {
                        id: req.query.id,
                    },
                }
            );
            res.status(200).send({
                success: true,
                message: "Image Deleted",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    listProperty: async (req, res, next) => {
        try {
            let { page, size, sortby, order } = req.query;
            if (!page) {
                page = 0;
            }
            if (!size) {
                size = 10;
            }
            if (!sortby) {
                sortby = "property";
            }
            if (!order) {
                order = "ASC";
            }

            let get = await model.property.findAndCountAll({
                offset: parseInt(page * size),
                limit: parseInt(size),
                where: {
                    property: {
                        [sequelize.Op.like]: `%${req.query.property}%`,
                    },
                    isDeleted: false,
                },
                include: [
                    {
                        model: model.property_location,
                        attributes: ["address"],
                    },
                ],
                order: [[sortby, order]],
            });
            console.log("get list:", get);
            return res.status(200).send({
                data: get.rows,
                totalPages: Math.ceil(get.count / size),
                datanum: get.count,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deleteProperty: async (req, res, next) => {
        try {
            let del = await model.property.update(
                {
                    isDeleted: true,
                },
                {
                    where: {
                        uuid: req.params.uuid,
                    },
                }
            );
            res.status(200).send({
                success: true,
                message: "Property Deleted",
                data: del,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
