const { transactionController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const route = require('express').Router();
const uploader = require('../helper/uploader');

route.post('/',
    readToken,
    transactionController.newTransaction)
route.get('/detail', transactionController.getTransactionTimeAndBank)
route.patch('/uploadimagepayment/:uuid', readToken, uploader('/ImgPayment', 'PAY').array('images', 1), transactionController.uploadImagePayment)
route.patch('/updatetransactionstatus', transactionController.updateTransactionStatus)
route.patch('/rejecttransaction', transactionController.rejectTransaction)
route.patch('/confirmtransaction', transactionController.confirmTransaction)


route.get('/testget', transactionController.testGet)

module.exports = route;