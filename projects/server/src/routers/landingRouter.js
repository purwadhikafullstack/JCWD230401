const route = require("express").Router();
const {
  propertyRecommendation,
  propertyCategory,
  allLocation,
} = require("../controllers/landingController");

route.get("/property-category", propertyCategory);
route.get("/property-recommendation", propertyRecommendation);
route.post("/all-location", allLocation);

module.exports = route;
