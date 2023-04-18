const { roomController } = require('../controllers');
const route = require('express').Router();

route.post('/roompayment', roomController.getDetailRoomTransaction)



module.exports = route;