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
  //3. PROPERTY RECOMMENDATIONS
  propertyRecommendation: async (req, res, next) => {
    try {
      // get top rating roomId minimum average rating is 4.00
      let get = await model.review.findAll({
        attributes: [
          "roomId",
          [sequelize.fn("avg", sequelize.col("rating")), "average_rating"],
        ],
        include: [
          {
            model: model.room,
            where: { isDeleted: 0 },
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
                ],
              },
            ],
            attributes: [
              [sequelize.fn("MIN", sequelize.col("price")), "lowest_price"],
            ],
            required: false,
            right: true,
            group: ["propertyId"],
          },
        ],
        group: ["propertyId"],
        having: sequelize.where(
          sequelize.fn("avg", sequelize.col("rating")),
          ">=",
          4.0
        ),
        // order: [[sequelize.literal("average_rating"), "DESC"]],
        order: sequelize.literal("rand()"),
        limit: 20,
      });
      res.status(200).send(get);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
