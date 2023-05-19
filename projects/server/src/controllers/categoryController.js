const model = require("../models");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    getAllCategoryTenant: async (req, res, next) => {
        try {
            let get = await model.category.findAll({
                where: {
                    isDeleted: false,
                },
            });
            console.log("get all categories:", get);
            return res.status(200).send({
                success: true,
                data: get,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    addCategory: async (req, res, next) => {
        try {
            let add = await model.category.create({
                uuid: uuidv4(),
                category: req.body.category,
            });
            console.log("add category", add);
            return res.status(200).send({
                success: true,
                message: "Added new category",
                data: add,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            let del = await model.category.update(
                {
                    isDeleted: true,
                },
                {
                    where: {
                        id: req.body.id,
                    },
                }
            );
            res.status(200).send({
                success: true,
                message: "Category deleted",
                data: del,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    editCategory: async (req, res, next) => {
        try {
            let get = await model.category.findAll({
                where: { uuid: req.params.uuid },
                attributes: ["picture"],
            });
            console.log("req.body.data", req.body.data);
            console.log("req.files", req.files);
            let { category } = JSON.parse(req.body.data);
            if (req.files.length === 0) {
                let edit = await model.category.update(
                    {
                        category: req.body.category,
                    },
                    {
                        where: {
                            id: req.body.id,
                        },
                    }
                );
                console.log("Data edit:", edit);
                res.status(200).send({
                    success: true,
                    message: "Category edited",
                });
            } else {
                await model.property.update(
                    {
                        category,
                        picture: `/picCategory/${req.files[0]?.filename}`,
                    },
                    {
                        where: {
                            id: req.body.id,
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
                message: "Category edited",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getAllCategory: async (req, res, next) => {
        try {
            let get = await model.category.findAll({
                where: {
                    isDeleted: 0
                }
            });
            console.log(get)
            res.status(200).send(get)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};
