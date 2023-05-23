const specialController = require("../controllers/specialController");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();


route.post("/create", specialController.createSpecialPrice)

route.get(
    "/room/:uuid",
    specialController.listSpecialPrice
);

route.get("/data/:uuid", specialController.getRoomData)

route.patch("/delete", specialController.deleteSpecialPrice);

route.patch("/active/:uuid", specialController.editIsActiveSpecial)

module.exports = route;
