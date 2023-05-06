const route = require("express").Router();
const {
  roomOrders,
  roomMaintenances,
  availableRooms,
  myProperty,
} = require("../controllers/calendarController");
const { readToken } = require("../helper/jwt");

route.post("/room-orders", readToken, roomOrders);
route.post("/room-maintenances", readToken, roomMaintenances);
route.post("/available-rooms", readToken, availableRooms);
route.get("/my-property", readToken, myProperty);


module.exports = route;
