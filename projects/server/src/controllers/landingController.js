const sequelize = require("sequelize");
const model = require("../models");

module.exports = {
  //1. ALL LOCATION SEARCH FIELD
  allLocation: async (req, res, next) => {
    try {
      let get = await model.regency.findAll({});
      console.log("isi get :", get);
      res.status(200).send(get);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  //2. PROPERTY CATEGORIES
  propertyCategory: async (req, res, next) => {
    try {
      let get = await model.category.findAll({
        where: {
          isDeleted: 0,
        },
        group: ["category"],
      });
      console.log("isi get :", get);
      res.status(200).send(get);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  //3. TOP DESTINATIONS
  //   topDestination: async (req, res, next) => {
  //     try {
  //     } catch (error) {
  //       console.log(error);
  //       next(error);
  //     }
  //   },
  //4. ROOM RECOMMENDATIONS
  //   roomRecommendation: async (req, res, next) => {
  //     try {
  //     } catch (error) {
  //       console.log(error);
  //       next(error);
  //     }
  //   },
};
