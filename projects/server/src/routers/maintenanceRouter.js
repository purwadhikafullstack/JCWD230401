const maintenanceController = require("../controllers/maintenanceController");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();

route.post("/create", maintenanceController.createMaintenance);

route.get("/room/:uuid", maintenanceController.listMaintenance);

route.get("/data/:uuid", maintenanceController.getRoomData);

route.patch("/delete", maintenanceController.deleteMaintenance);

route.patch("/active/:uuid", maintenanceController.editIsActiveMaintenance);

module.exports = route;
