const route = require('express').Router();
const { register, login, keeplogin } = require("../controllers/userController");
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.post('/register', checkUser, register);
route.post('/auth', login);
route.get('/keeplogin', readToken, keeplogin);

module.exports = route;