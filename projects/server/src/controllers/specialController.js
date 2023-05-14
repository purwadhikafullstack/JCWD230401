const model = require("../models");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports = {
    createSpecialPrice: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            let get = await model.room.findOne({
                where: {
                    id: req.body.roomId,
                },
            });
            let addSpecial = await model.special_price.create(
                {
                    uuid: uuidv4(),
                    startDate: req.body.specialStartDate,
                    endDate: req.body.specialEndDate,
                    priceOnDate: req.body.price,
                    roomId: req.body.roomId,
                },
                { transaction: ormTransaction }
            );

            await ormTransaction.commit();

            res.status(200).send({
                success: true,
                message: "Special Price created",
                data: addSpecial,
            });
        } catch (error) {
            await ormTransaction.rollback();
            console.log(error);
            next(error);
        }
    },
    listSpecialPrice: async (req, res, next) => {
        try {
            let { page, size, sortby, order } = req.query;
            if (!page) {
                page = 0;
            }
            if (!size) {
                size = 5;
            }
            if (!sortby) {
                sortby = "id";
            }
            if (!order) {
                order = "DESC";
            }

            let getRoomId = await model.room.findOne({
                where: {
                    uuid: req.params.uuid,
                },
            });

            let count = await model.special_price.findAll({
                where: {
                    roomId: getRoomId.id,
                },
            });

            let get = await model.special_price.findAndCountAll({
                offset: parseInt(page * size),
                limit: parseInt(size),
                include: [
                    {
                        model: model.room,
                        where: {
                            isDeleted: false,
                        },
                        include: [
                            {
                                model: model.room_category,
                            },
                        ],
                    },
                ],
                where: {
                    roomId: getRoomId.id,
                },
                order: [[sortby, order]],
            });

            res.status(200).send({
                data: get.rows,
                totalPages: Math.ceil(get.count / size),
                datanum: count.length,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deleteSpecialPrice: async (req, res, next) => {
        try {
            console.log("req.body", req.body);
            let get = await model.special_price.findAll({
                where: {
                    uuid: req.body.uuid,
                },
            });
            let del = await model.special_price.update(
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
                message: "Special Price Deleted",
                data: get,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    editIsActiveSpecial: async (req, res, next) => {
        try {
            let get = await model.special_price.findOne({
                where: {
                    uuid: req.params.uuid,
                },
            });
            // console.log(
            //     "get.dataValues[0].isActive", get.dataValues.isActive
            // );
            if (get.dataValues.isActive === true) {
                await model.special_price.update(
                    {
                        isActive: false,
                    },
                    {
                        where: {
                            uuid: get.dataValues.uuid,
                        },
                    }
                );
            } else {
                await model.special_price.update(
                    {
                        isActive: true,
                    },
                    {
                        where: {
                            uuid: get.dataValues.uuid,
                        },
                    }
                );
            }
            // console.log("get", get);
            res.status(200).send({
                success: true,
                // data: get
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
