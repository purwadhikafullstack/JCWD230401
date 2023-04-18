const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");

module.exports = {
    getDetailRoomTransaction: async (req, res, next) => {
        let get = await model.room.findAll({
            where: {
                uuid: req.query.uuid
            },
            include: [
                {
                    model: model.property,
                    include: [{
                        model: model.property_location, attributes: ['country', 'address'],
                        include: [{ model: model.regency, attributes: ['name'] }]
                    }]
                },
                { model: model.room_category },
                { model: model.picture_room },

            ]
        });
        res.status(200).send(get)
    }

};