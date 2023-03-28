const route = require('express').Router();
const { propertyController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.get('/', propertyController.getAllProperty)


module.exports = route;