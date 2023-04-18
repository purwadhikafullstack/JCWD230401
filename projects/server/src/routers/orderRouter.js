const route = require('express').Router();
const { orderController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.get("/getallorder", readToken, orderController.getAllOrder);
route.get("/getactionsneeded", orderController.getActionsNeededTenant);


module.exports = route;