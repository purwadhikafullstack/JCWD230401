const route = require('express').Router();
const { reviewController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.get('/getaverageandreviewproperty', reviewController.getAverageAndReviewProperty)



module.exports = route;