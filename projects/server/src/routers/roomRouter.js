const { roomController } = require("../controllers");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();
const uploader = require("../helper/uploader");
const uploader2mb = require("../helper/uploader2");
route.get("/roompayment", roomController.getDetailRoomTransaction);

route.get(
    "/property-name-and-id",
    readToken,
    roomController.getPropertyNameAndIdByUserId
);
route.post(
    "/create",
    readToken,
    uploader2mb("/ImgRoom", "ROM").array("images", 5),
    roomController.addRoom
);
route.patch("/edit/:uuid", roomController.editRoom);
route.get("/data/:uuid", roomController.getRoomData);
route.patch(
    "/update-image",
    uploader2mb("/ImgRoom", "ROM").array("images", 1),
    roomController.updateImageRoom
);
route.patch("/delete-image", roomController.deleteRoomPicture);
route.get("/list", roomController.listRoom);
route.patch("/delete/:uuid", readToken, roomController.deleteRoom);

module.exports = route;
