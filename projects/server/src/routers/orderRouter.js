const route = require('express').Router();
const { orderController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.post("/getallorder", orderController.getAllOrder);


module.exports = route;