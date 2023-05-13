const route = require('express').Router();
const { propertyController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.get('/', propertyController.getAllProperty)
route.get('/filter', propertyController.filterProperty)
route.get('/getroomavailable', propertyController.getRoomAvailable)


route.get('/getpropertydetail', propertyController.getPropertyDetail)
route.get('/getpictureproperty', propertyController.getPicturePropertyDetail)

route.get('/available', propertyController.getAvailableProperty)

module.exports = route;