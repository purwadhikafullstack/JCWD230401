const { transactionController } = require('../controllers');
const route = require('express').Router();

route.post('/', transactionController.newTransaction)



module.exports = route;