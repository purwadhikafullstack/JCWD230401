const route = require("express").Router();
const {
  //   topDestination,
  //   roomRecommendation,
  propertyCategory,
  allLocation,
} = require("../controllers/landingController");

route.post("/property-category", propertyCategory);
// route.post("/top-destination", topDestination);
// route.post("/room-recommendation", roomRecommendation);
route.post("/all-location", allLocation);

module.exports = route;
