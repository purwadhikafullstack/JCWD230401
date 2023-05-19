const maintenanceController = require("../controllers/maintenanceController");
const { readToken } = require("../helper/jwt");
const route = require("express").Router();

route.post("/addmaintenance", maintenanceController.createMaintenance);

route.get(
    "/getmaintenancebyroomuuid/:uuid",
    maintenanceController.listMaintenance
);

route.patch("/deletemaintenance", maintenanceController.deleteMaintenance);

route.patch("/editactive/:uuid", maintenanceController.editIsActiveMaintenance)

module.exports = route;
