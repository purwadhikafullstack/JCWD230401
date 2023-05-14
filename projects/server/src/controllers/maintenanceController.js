const model = require("../models");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports = {
    createMaintenance: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            let get = await model.room.findOne({
                where: {
                    id: req.body.roomId,
                },
            });

            let addMaintenance = await model.maintenance.create(
                {
                    uuid: uuidv4(),
                    startDate: req.body.maintenanceStartDate,
                    endDate: req.body.maintenanceEndDate,
                    remarks: req.body.remarks,
                    roomId: req.body.roomId,
                },
                { transaction: ormTransaction }
            );

            await ormTransaction.commit();

            res.status(200).send({
                success: true,
                message: "Mainentenace Price created",
                data: addMaintenance,
            });
        } catch (error) {
            await ormTransaction.rollback();
            console.log(error);
            next(error);
        }
    },
    listMaintenance: async (req, res, next) => {
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
                order = "ASC";
            }

            let getRoomId = await model.room.findOne({
                where: {
                    uuid: req.params.uuid,
                },
            });

            let count = await model.maintenance.findAll({
                where: {
                    roomId: getRoomId.id,
                },
            });

            let get = await model.maintenance.findAndCountAll({
                offset: parseInt(page * size),
                limit: parseInt(size),
                include: [
                    {
                        model: model.room,
                        where: {
                            isDeleted: false,
                        },
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
    deleteMaintenance: async (req, res, next) => {
        try {
            let del = await model.maintenance.update(
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
                data: del,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    editIsActiveMaintenance: async (req, res, next) => {
        try {
            let get = await model.maintenance.findOne({
                where: {
                    uuid: req.params.uuid,
                },
            });
            console.log(
                "get.dataValues[0].isActive", get.dataValues.isActive
            );
            if (get.dataValues.isActive === true) {
                await model.maintenance.update(
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
                await model.maintenance.update(
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
            console.log("get", get);
            res.status(200).send({
                success: true,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
