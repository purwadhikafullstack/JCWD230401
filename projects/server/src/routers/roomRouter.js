const { roomController } = require('../controllers');
const route = require('express').Router();

route.get('/roompayment', roomController.getDetailRoomTransaction)



module.exports = route;