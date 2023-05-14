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
route.patch("/editroom/:uuid", roomController.editRoom);
route.get("/getroomdata/:uuid", roomController.getRoomData);
route.patch(
    "/updateimageroom",
    uploader("/ImgRoom", "ROM").array("images", 1),
    roomController.updateImageRoom
);
route.patch("/deleteimageroom", roomController.deleteRoomPicture);
route.get("/getlistroom", roomController.listRoom);
route.patch("/deleteroom/:uuid", readToken, roomController.deleteRoom);

module.exports = route;
