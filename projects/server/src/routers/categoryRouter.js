const route = require('express').Router();
const { categoryController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.get('/',categoryController.getAllCategory)

module.exports = route;