const route = require("express").Router();
const {
  //   topDestination,
  propertyRecommendation,
  propertyCategory,
  allLocation,
} = require("../controllers/landingController");

route.get("/property-category", propertyCategory);
// route.get("/top-destination", topDestination);
route.get("/property-recommendation", propertyRecommendation);
route.post("/all-location", allLocation);

module.exports = route;
