const { propertyController } = require("../controllers");
const route = require("express").Router();

route.get("/getallpropertytenant", propertyController.getAllPropertyTenant);
route.post("/addproperty", propertyController.addProperty);
route.patch("/deleteproperty", propertyController.deleteProperty);
route.patch("/editproperty", propertyController.editProperty);

module.exports = route;
