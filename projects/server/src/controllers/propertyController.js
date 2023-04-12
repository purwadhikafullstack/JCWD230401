const model = require("../models");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports = {
    // get property
    getAllPropertyTenant: async (req, res, next) => {
        try {
            let get = await model.property.findAll({
                where: {
                    isDeleted: false,
                },
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
    // get province
    getProvince: async (req, res, next) => {
        try {
            let get = await model.province.findAll({
                attributes: ["id", "name"],
            });
            return res.status(200).send(get);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // get regency
    getRegency: async (req, res, next) => {
        try {
            let get = await model.regency.findAll({
                where: {
                    province_id: req.body.province_id,
                },
            });
            return res.status(200).send(get);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // create property
    addProperty: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            // console.log("req.body.data", req.body.data);
            // console.log("req.decrypt", req.decrypt);
            // console.log("req.files", req.files);
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
            // console.log("Data Property:", addProperty);
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
                // console.log("newArr:", newArr);
            }
            console.log("req.files:", req.files);
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
    // get property
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
                        attributes: ["picture"],
                    },
                    {
                        model: model.property_location,
                    },
                ],
            });
            console.log("getPropertyData:", get[0].dataValues.property);
            return res.status(200).send({
                success: true,
                data: get,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    // edit property
    editProperty: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            // console.log("req.body.data", req.body.data);
            // console.log("req.decrypt", req.decrypt);
            // console.log("req.files", req.files);
            let {
                uuidProperty,
                category,
                categoryId,
                property_location_id,
                property,
                description,
                address,
                regencyId,
                provinceId,
                zipcode,
                country,
            } = JSON.parse(req.body.data);

            console.log("req.body.data:", JSON.parse(req.body.data));
            // console.log("test", uuidProperty)
            let editCategory = await model.category.update(
                {
                    category: category,
                },
                {
                    where: {
                        id: categoryId,
                    },
                },
                { transaction: ormTransaction }
            );

            let editProperty = await model.property.update(
                {
                    property,
                    description,
                },
                {
                    where: {
                        uuid: uuidProperty,
                    },
                },
                { transaction: ormTransaction }
            );
            // console.log("Data Property:", addProperty);

            if (req.files.length) {
                // create new image
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
                    return { ...val, propertyId: editProperty.dataValues.id };
                });
                await model.picture_property.bulkCreate(newArr);
                // console.log("newArr:", newArr);
            }
            console.log("req.files:", req.files);
            let editPropertyLocation = await model.property_location.update(
                {
                    address: address,
                    zip: zipcode,
                    country: country,
                    regencyId: regencyId,
                    provinceId: provinceId,
                },
                {
                    where: {
                        id: property_location_id,
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
    // delete property
    deleteProperty: async (req, res, next) => {
        try {
            let del = await model.property.update(
                {
                    isDeleted: true,
                },
                {
                    where: {
                        uuid: uuidProperty, // PIKIRIN COKKK
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
