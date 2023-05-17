const route = require("express").Router();
const { propertyController } = require("../controllers");
const { readToken } = require("../helper/jwt");
const { checkUser } = require("../helper/validator");
const uploader = require("../helper/uploader");

route.get("/", propertyController.getAllProperty);
route.post("/filter", propertyController.filterProperty);
route.post("/getroomavailable", propertyController.getRoomAvailable);

route.post("/getpropertydetail", propertyController.getPropertyDetail);
route.post("/getpictureproperty", propertyController.getPicturePropertyDetail);

route.get("/getallpropertytenant", propertyController.getAllPropertyTenant);
route.get("/getprovince", propertyController.getProvince);
route.post("/getregencybyid", propertyController.getRegencyByProvinceId);
route.post(
    "/addproperty",
    readToken,
    uploader("/ImgProperty", "PTY").array("images", 5),
    propertyController.addProperty
);
route.get("/getpropertydata/:uuid", propertyController.getPropertyData);
route.patch("/editproperty/:uuid", propertyController.editProperty);
route.patch(
    "/deleteproperty/:uuid",
    readToken,
    propertyController.deleteProperty
);
route.get("/getlistproperty", readToken, propertyController.listProperty);
route.patch(
    "/updateimageproperty",
    uploader("/ImgProperty", "PTY").array("images", 1),
    propertyController.updateImageProperty
);
route.patch("/deleteimageproperty", propertyController.deletePropertyPicture);

module.exports = route;
