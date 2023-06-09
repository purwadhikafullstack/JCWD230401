const route = require('express').Router();
const { orderController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.get("/", readToken, orderController.getAllOrder);
route.get("/actions-needed", readToken, orderController.getActionsNeededTenant);
route.get("/summary", readToken, orderController.getSummary);


module.exports = route;