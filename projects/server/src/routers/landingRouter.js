const route = require("express").Router();
const {
  propertyRecommendation,
  allLocation,
} = require("../controllers/landingController");

route.get("/property-recommendation", propertyRecommendation);
route.post("/all-location", allLocation);

module.exports = route;
