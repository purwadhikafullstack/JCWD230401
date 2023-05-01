const sequelize = require("sequelize");
const model = require("../models");

module.exports = {
  //1. GET MY BOOKED ROOMS
  roomOrders: async (req, res, next) => {
    let getdata = await model.order.findAll({
      attributes: ["start_date", "end_date"],
      include: [
        {
          model: model.transaction,
          attributes: ["transaction_statusId", "userId"],
          where: {
            transaction_statusId: 3,
          },
        },
        {
          model: model.room,
          attributes: ["room_categoryId"],
          include: [
            {
              model: model.room_category,
              attributes: ["name", "user_id"],
              where: {
                user_id: req.decrypt.id,
              },
            },
            {
              model: model.property,
              attributes: ["property"],
            },
          ],
        },
      ],
    });
    console.log("ini isi dari getdata: ", getdata[0].dataValues);
    res.status(200).send(getdata);
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  //2. GET MY UNDER MAINTENANCE ROOMS
  roomMaintenances: async (req, res, next) => {
    try {
      let getdata = await model.maintenance.findAll({
        attributes: ["startDate", "endDate"],
        include: [
          {
            model: model.room,
            attributes: ["room_categoryId"],
            include: [
              {
                model: model.room_category,
                attributes: ["name", "user_id"],
                where: {
                  user_id: req.decrypt.id,
                },
              },
              {
                model: model.property,
                attributes: ["property"],
              },
            ],
          },
        ],
      });
      console.log("ini isi dari getdata: ", getdata[0].dataValues);
      res.status(200).send(getdata);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  //3. GET MY AVAILABLE ROOMS (dah ga dipake lg)
  availableRooms: async (req, res, next) => {
    try {
      let getdata = await model.room.findAll({
        include: [
          {
            model: model.room_category,
            where: {
              user_id: req.decrypt.id,
              isDeleted: 0,
            },
          },
          {
            model: model.property,
            attributes: ["property"],
          },
        ],
        where: sequelize.literal(`
          room.id NOT IN (
            SELECT roomId FROM orders WHERE start_date <= '${req.body.date}' AND end_date >= '${req.body.date}'
          ) AND
          room.id NOT IN (
            SELECT roomId FROM maintenances WHERE startDate <= '${req.body.date}' AND endDate >= '${req.body.date}'
          ) AND
          room.isDeleted = 0 
        `),
      });
      console.log("ini isi dari getdata: ", getdata);
      res.status(200).send(getdata);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  //4. GET ALL MY PROPERTY
  myProperty: async (req, res, next) => {
    try {
      let getdata = await model.property.findAll({
        where: {
          userId: req.decrypt.id,
          isDeleted: 0,
        },
        include: [
          {
            model: model.room,
            include: [
              {
                model: model.review,
                attributes: [
                  [sequelize.fn("avg", sequelize.col("rating")), "average_rating"],
                ],
              },
            ],
            where: {
              [sequelize.Op.or]: [
                sequelize.literal(
                  `(SELECT COUNT(*) FROM reviews WHERE reviews.roomId = rooms.id) > 0`
                ),
                sequelize.literal(
                    `(SELECT COUNT(*) FROM reviews WHERE reviews.roomId = rooms.id) = 0`
                  ),
              ]
            },
          },
          {
            model: model.picture_property
          },
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
        group: ["property.id"],
      });
      console.log("ini isi dari getdata: ", getdata);
      res.status(200).send(getdata);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
