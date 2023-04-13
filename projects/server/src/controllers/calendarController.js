const sequelize = require("sequelize");
const model = require("../models");

module.exports = {
  //1. GET BOOKED ROOM INFO
  getallroominfo: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
