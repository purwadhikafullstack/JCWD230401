const reportController = require("../controllers/reportController");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();

route.get("/income", reportController.getIncomeToday);
route.get("/users", reportController.getUserPerDay);

route.get("/transaction-chart", reportController.transactionChart);
route.get("/property-chart/:idProperty", reportController.propertyChart);
route.get("/user-chart", reportController.userChart);

module.exports = route;
