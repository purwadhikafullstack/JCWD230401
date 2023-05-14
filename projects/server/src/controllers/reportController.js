const model = require("../models");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

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
    chart: async (req, res, next) => {
        try {
            endDate = new Date().toISOString().split("T")[0];
            let tempDate = new Date() - 604800000;
            let sevenDaysAgo = new Date(tempDate).toISOString().split("T")[0];

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

            const options = {
                year: "2-digit",
                month: "2-digit",
                day: "numeric",
            };

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
};
