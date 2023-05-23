const transactionController = require("./transactionController");
const userController = require("./userController");
const calendarController = require("./calendarController");
const landingController = require("./landingController");
const categoryController = require("./categoryController");
const propertyController = require("./propertyController");
const orderController = require("./orderController");
const roomController = require("./roomController");
const reviewController = require("./reviewController");
const maintenanceController = require("./maintenanceController");
const reportController = require("./reportController");
const specialController = require("./specialController");

module.exports = {
    calendarController,
    categoryController,
    landingController,
    maintenanceController,
    orderController,
    propertyController,
    reportController,
    reviewController,
    roomController,
    specialController,
    transactionController,
    userController,
};
