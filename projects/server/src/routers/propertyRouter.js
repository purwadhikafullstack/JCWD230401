const { propertyController } = require("../controllers");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();
const uploader = require("../helper/uploader");

route.get("/getallpropertytenant", propertyController.getAllPropertyTenant);
route.post("/getregency", propertyController.getRegency);
route.get("/getprovince", propertyController.getProvince);
route.post(
    "/addproperty",
    readToken,
    uploader("/ImgProperty", "PTY").array("images", 5),
    propertyController.addProperty
);
route.get("/getpropertydata/:uuid", propertyController.getPropertyData);
route.patch("/editproperty", uploader("/ImgProperty", "PTY").array("images", 5), propertyController.editProperty);
route.patch("/deleteproperty", propertyController.deleteProperty);

module.exports = route;
