const route = require("express").Router();
const { getallroominfo } = require("../controllers/calendarController");
const { readToken } = require("../helper/jwt");

route.post("/getallroominfo", getallroominfo);

module.exports = route;