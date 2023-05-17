const specialController = require("../controllers/specialController");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();


route.post("/addspecialprice", specialController.createSpecialPrice)

route.get(
    "/getspecialpricebyroomuuid/:uuid",
    specialController.listSpecialPrice
);

route.patch("/deletespecialprice", specialController.deleteSpecialPrice);

route.patch("/editactive/:uuid", specialController.editIsActiveSpecial)

module.exports = route;
