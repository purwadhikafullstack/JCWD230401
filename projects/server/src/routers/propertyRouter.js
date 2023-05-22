const route = require("express").Router();
const { propertyController } = require("../controllers");
const { readToken } = require("../helper/jwt");
const { checkUser } = require("../helper/validator");
const uploader = require("../helper/uploader");
const uploader2mb = require("../helper/uploader2");

route.get("/", propertyController.getAllProperty);
route.get("/filter", propertyController.filterProperty);
route.get("/getroomavailable", propertyController.getRoomAvailable);
route.get("/getpropertydetail", propertyController.getPropertyDetail);
route.get("/getpictureproperty", propertyController.getPicturePropertyDetail);
route.get("/getallpropertytenant", propertyController.getAllPropertyTenant);
route.get("/getprovince", propertyController.getProvince);
route.post("/getregencybyid", propertyController.getRegencyByProvinceId);
route.post(
    "/addproperty",
    readToken,
    uploader2mb("/ImgProperty", "PTY").array("images", 5),
    propertyController.addProperty
);
route.get("/getpropertydata/:uuid", propertyController.getPropertyData);
route.patch("/editproperty/:uuid", propertyController.editProperty);
route.patch(
    "/deleteproperty/:uuid",
    readToken,
    propertyController.deleteProperty
);
route.get("/list", readToken, propertyController.listProperty);
route.patch(
    "/updateimageproperty",
    uploader2mb("/ImgProperty", "PTY").array("images", 1),
    propertyController.updateImageProperty
);
route.patch("/deleteimageproperty", propertyController.deletePropertyPicture);
route.get("/available", propertyController.getAvailableProperty);

module.exports = route;
