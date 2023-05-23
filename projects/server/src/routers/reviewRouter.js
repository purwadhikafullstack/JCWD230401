const route = require('express').Router();
const { reviewController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.get('/getaverageandreviewproperty', reviewController.getAverageAndReviewProperty)
route.post('/', readToken, reviewController.addReview)
route.get('/', reviewController.getAllReview)
route.get('/average', reviewController.getAverage)



module.exports = route;