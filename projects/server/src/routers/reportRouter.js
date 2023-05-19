const reportController = require("../controllers/reportController");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();


route.get("/income", reportController.getIncomeToday)
route.get("/users", reportController.getUserPerDay)
route.get("/property", reportController.propertyChart)

route.get("/transactionchart", reportController.transactionChart)
route.get("/propertychart/:idProperty", reportController.propertyChart)
route.get("/userchart", reportController.userChart)

module.exports = route;