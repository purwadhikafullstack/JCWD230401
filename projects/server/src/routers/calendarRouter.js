const route = require("express").Router();
const {
  getroomorders,
  getroommaintenance,
  getavailablerooms,
} = require("../controllers/calendarController");
const { readToken } = require("../helper/jwt");

route.post("/getroomorders", readToken, getroomorders);
route.post("/getroommaintenance", readToken, getroommaintenance);
route.post("/getavailablerooms", readToken, getavailablerooms);

module.exports = route;
