const { propertyController } = require("../controllers");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();
const uploader = require("../helper/uploader");

route.get("/getallpropertytenant", propertyController.getAllPropertyTenant);
route.post(
    "/addproperty", readToken,
    uploader("/ImgProperty", "PTY").array("images", 1),
    propertyController.addProperty
);
route.patch("/deleteproperty", propertyController.deleteProperty);
route.patch("/editproperty", propertyController.editProperty);

module.exports = route;
