const sequelize = require("sequelize");
const model = require("../models");

module.exports = {
  //1. ALL LOCATION SEARCH FIELD
  allLocation: async (req, res, next) => {
    try {
      let { name } = req.body;
      let get = await model.regency.findAll({
        attributes: ["name"],
        where: { name: { [sequelize.Op.like]: `%${name}%` } },
      });
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
  // dari tabel order include property_location
  //     } catch (error) {
  //       console.log(error);
  //       next(error);
  //     }
  //   },
  //4. PROPERTY RECOMMENDATIONS
  propertyRecommendation: async (req, res, next) => {
    try {
      // 1. get top rating roomId minimum average rating is 4.00
      let get = await model.review.findAll({
        attributes: [
          "roomId",
          [sequelize.fn("avg", sequelize.col("rating")), "average_rating"],
        ],
        where: sequelize.literal(
          `roomId NOT IN (SELECT id FROM rooms WHERE isDeleted = 1)`
        ),
        group: ["roomId"],
        having: sequelize.literal("AVG(rating) >= 4.00"),
        order: [[sequelize.literal("average_rating"), "DESC"]],
        limit: 4,
        include: [
          {
            model: model.room,
            attributes: ["propertyId"],
            include: [
              {
                model: model.property,
                where: {
                  isDeleted: 0,
                },
                include: [
                  { model: model.picture_property, attributes: ["picture"] },
                  {
                    model: model.property_location,
                    include: [
                      {
                        model: model.province,
                        attributes: ["name"],
                      },
                      {
                        model: model.regency,
                        attributes: ["name"],
                      },
                    ],
                  },
                  {
                    model: model.room,
                  },
                ],
              },
            ],
          },
        ],
      });
      res.status(200).send(get);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
