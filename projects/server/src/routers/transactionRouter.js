const { transactionController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const route = require('express').Router();
const uploader = require('../helper/uploader');

route.post('/', readToken, transactionController.newTransaction)
route.get('/detail', transactionController.getTransactionTimeAndBank)
route.post('/uploadimagepayment/:uuid', readToken, uploader('/ImgPayment', 'PAY').array('images', 1), transactionController.uploadImagePayment)
route.patch('/cancelorreject', transactionController.cancelOrReject)



module.exports = route;