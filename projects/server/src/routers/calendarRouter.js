const route = require("express").Router();
const { getroomorders, getroommaintenance } = require("../controllers/calendarController");
const { readToken } = require("../helper/jwt");

route.post("/getroomorders", readToken, getroomorders);
route.post("/getroommaintenance", readToken, getroommaintenance);

module.exports = route;