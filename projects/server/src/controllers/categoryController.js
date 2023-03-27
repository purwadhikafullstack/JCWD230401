const model = require("../models");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    getAllCategory: async (req, res, next) => {
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
            res.status(200).send({
                success: true,
                message: "Category edited",
                data: edit,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
