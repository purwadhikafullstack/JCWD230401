const model = require("../models");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const con = require("../helper/dbCon");

module.exports = {
    getIncomeToday: async (req, res, next) => {
        try {
            const { start, end } = req.query;

            let get = await model.order.sum("price", {
                where: {
                    createdAt: { [sequelize.Op.between]: [start, end] },
                },
            });

            res.status(200).send({
                success: true,
                income: get,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    transactionChart: async (req, res, next) => {
        try {
            let endDate = new Date().toISOString().split("T")[0];
            let tempDate = new Date() - 604800000;
            let sevenDaysAgo = new Date(tempDate).toISOString().split("T")[0];
            const options = {
                year: "2-digit",
                month: "2-digit",
                day: "numeric",
            };

            let dateArr = [];
            let totalArr = [];

            let chart = await model.order.findAll({
                attributes: ["price", "createdAt"],

                where: {
                    createdAt: {
                        [sequelize.Op.gte]: sevenDaysAgo,
                        [sequelize.Op.lte]: endDate,
                    },
                },

                include: [
                    {
                        model: model.transaction,
                        where: {
                            transaction_statusId: 3,
                        },
                    },
                ],
                order: [["createdAt", "ASC"]],
            });

            console.log("chart", chart);

            for (let i = 0; i < chart.length; i++) {
                dateArr.push(
                    new Date(chart[i].createdAt).toLocaleDateString(
                        "en-EN",
                        options
                    )
                );
                totalArr.push(chart[i].price);
            }

            res.status(200).send({
                success: true,
                data: {
                    date: dateArr,
                    total: totalArr,
                },
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getPropertyIncome: async (req, res, next) => {
        const { start, end } = req.query;
    },
    propertyChart: async (req, res, next) => {
        try {
            const { idProperty } = req.params;

            let endDate = new Date().toISOString().split("T")[0];
            let tempDate = new Date() - 604800000;
            let sevenDaysAgo = new Date(tempDate).toISOString().split("T")[0];
            const options = {
                year: "2-digit",
                month: "2-digit",
                day: "numeric",
            };

            let dateArr = [];
            let totalArr = [];

            // let getRoomIdByProperty = await model.room.findAll({
            //     attributes: ["id"],
            //     where: {
            //         propertyId,
            //     },
            //     raw: true,
            // });

            // console.log("getRoomId by Property id:", getRoomIdByProperty);

            // let rooms = getRoomIdByProperty.map((room) => room.id);

            // console.log("rooms after map:", rooms);

            let chart = await model.order.findAll({
                attributes: ["price", "createdAt"],
                where: {
                    createdAt: {
                        [sequelize.Op.gte]: sevenDaysAgo,
                        [sequelize.Op.lte]: endDate,
                    },
                },
                include: [
                    {
                        model: model.transaction,
                        where: {
                            transaction_statusId: 3,
                        },
                    },
                    {
                        model: model.room,
                        attributes: ["propertyId"],
                        where: {
                            propertyId: idProperty,
                        },
                    },
                ],
                order: [["createdAt", "ASC"]],
            });
            console.log("chart:", chart);

            for (let i = 0; i < chart.length; i++) {
                dateArr.push(
                    new Date(chart[i].createdAt).toLocaleDateString(
                        "en-EN",
                        options
                    )
                );
                totalArr.push(chart[i].price);
            }

            res.status(200).send({
                success: true,
                data: {
                    date: dateArr,
                    total: totalArr,
                },
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getUserPerDay: async (req, res, next) => {
        try {
            const { start, end } = req.query;

            const query = `SELECT o.createdAt, o.roomId, r.capacity, SUM(r.capacity) AS countRooms
            FROM orders o
            JOIN rooms r ON o.roomId = r.id
            WHERE o.createdAt BETWEEN '${start}' AND '${end}'
            GROUP BY o.roomId;`;

            const total_users = await con.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });

            res.status(200).send({
                success: true,
                data: total_users,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    userChart: async (req, res, next) => {
        try {
            endDate = new Date().toISOString().split("T")[0];
            let tempDate = new Date() - 604800000;
            let sevenDaysAgo = new Date(tempDate).toISOString().split("T")[0];

            let dateArr = [];
            let totalArr = [];

            let chart = await model.order.findAll({
                attributes: [
                    "createdAt",
                    [
                        sequelize.fn("SUM", sequelize.col("room.capacity")),
                        "totalUsers",
                    ],
                ],
                where: {
                    createdAt: {
                        [sequelize.Op.gte]: sevenDaysAgo,
                        [sequelize.Op.lte]: endDate,
                    },
                },
                include: [
                    {
                        model: model.room,
                        attributes: ["id", "capacity"],
                    },
                ],
            });

            const options = {
                year: "2-digit",
                month: "2-digit",
                day: "numeric",
            };
            console.log(chart);

            for (let i = 0; i < chart.length; i++) {
                dateArr.push(
                    new Date(chart[i].createdAt).toLocaleDateString(
                        "en-EN",
                        options
                    )
                );
                totalArr.push(chart[i].dataValues.totalUsers);
            }

            res.status(200).send({
                success: true,
                data: {
                    date: dateArr,
                    total: totalArr,
                },
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
