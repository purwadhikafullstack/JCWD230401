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
    // edit property
    editProperty: async (req, res, next) => {
        try {
            let get = await model.property.findAll({
                where: { uuid: req.params.uuid },
                attributes: ["picture"],
            });
            console.log("req.body.data", req.body.data);
            console.log("req.files", req.files);
            let { property, address, description, category, userId } =
                JSON.parse(req.body.data);
            if (req.files.length === 0) {
                let edit = await model.property.update(
                    {
                        property,
                        address,
                        description,
                        categoryId: category,
                        userId: userId,
                    },
                    {
                        where: {
                            uuid: req.params.uuid,
                        },
                    }
                );
                console.log("Data edit:", edit);
                return res.status(200).send({
                    success: true,
                    message: "Property updated",
                });
            } else {
                await model.property.update(
                    {
                        property,
                        address,
                        description,
                        categoryId: category,
                        userId: userId,
                        picture: `/picProperty/${req.files[0]?.filename}`,
                    },
                    {
                        where: {
                            uuid: req.params.uuid,
                        },
                    }
                );
                if (
                    fs.existsSync(`./src/public${get[0].dataValues.picture}`) &&
                    !get[0].dataValues.picture.includes("default")
                ) {
                    fs.unlinkSync(`./src/public${get[0].dataValues.picture}`);
                }
            }
            return res.status(200).send({
                success: true,
                message: "Edit Product Success",
            });
        } catch (error) {
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
                        uuid: req.body.uuid,
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
