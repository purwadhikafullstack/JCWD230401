const model = require("../models");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports = {
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
