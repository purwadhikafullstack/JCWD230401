const { roomController } = require("../controllers");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();
const uploader = require("../helper/uploader");

route.get(
    "/getpropertynameandid",
    // readToken,
    roomController.getPropertyNameAndIdByUserId
);
route.post(
    "/addroom",
    readToken,
    uploader("/ImgRoom", "ROM").array("images", 5),
    roomController.addRoom
);

module.exports = route;
