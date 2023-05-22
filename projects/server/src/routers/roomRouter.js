const { roomController } = require("../controllers");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();
const uploader = require("../helper/uploader");
const uploader2mb = require("../helper/uploader2");
route.get("/roompayment", roomController.getDetailRoomTransaction);

route.get(
    "/getpropertynameandid",
    readToken,
    roomController.getPropertyNameAndIdByUserId
);
route.post(
    "/addroom",
    readToken,
    uploader2mb("/ImgRoom", "ROM").array("images", 5),
    roomController.addRoom
);
route.patch("/editroom/:uuid", roomController.editRoom);
route.get("/getroomdata/:uuid", roomController.getRoomData);
route.patch(
    "/updateimageroom",
    uploader2mb("/ImgRoom", "ROM").array("images", 1),
    roomController.updateImageRoom
);
route.patch("/deleteimageroom", roomController.deleteRoomPicture);
route.get("/getlistroom", roomController.listRoom);
route.patch("/deleteroom/:uuid", readToken, roomController.deleteRoom);

module.exports = route;
