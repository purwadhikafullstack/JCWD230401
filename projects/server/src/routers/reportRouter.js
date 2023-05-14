const reportController = require("../controllers/reportController");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();


route.get("/income", reportController.getIncomeToday)

route.get("/chart", reportController.chart)

module.exports = route;