const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const transporter = require("../helper/nodemailer");

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
                where: { property: { [sequelize.Op.like]: `%${name}%` } },
                include: [
                    {
                        model: model.room, required: true, attributes: ['price'], order: [[model.room, 'price', 'asc']],
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
                order: sortby == 'property' ? [[ sortby, order]] : [[ model.room, sortby, order]]
            })
            console.log("getttttt filter categoryyyy", get.count)
            return res.status(200).send({
                data: get.rows,
                totalPages: Math.ceil(get.count / size),
                datanum: get.count,
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}