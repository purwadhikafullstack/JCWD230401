const route = require('express').Router();
const { orderController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.get("/getallorder", readToken, orderController.getAllOrder);
route.get("/getactionsneeded", readToken, orderController.getActionsNeededTenant);
route.get("/getsummary", orderController.getSummary);
// route.get("/getactionsneeded", orderController.tesss);


module.exports = route;