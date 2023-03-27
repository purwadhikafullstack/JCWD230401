const { propertyController } = require("../controllers");
const route = require("express").Router();

route.get("/getallproperty", propertyController.getAllProperty);
route.post("/addproperty", propertyController.addProperty);
route.patch("/deleteproperty", propertyController.deleteProperty);
route.patch("/editproperty", propertyController.editProperty);

module.exports = route;
