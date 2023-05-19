const sequelize = require("sequelize");
const model = require("../models");

module.exports = {
  //1. GET BOOKED ROOMS
  getroomorders: async (req, res, next) => {
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
          ],
        },
      ],
    });
    // console.log("ini isi dari getdata: ", getdata[0].dataValues);
    res.status(200).send(getdata);
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  //2. GET UNDER MAINTENANCE ROOMS
  getroommaintenance: async (req, res, next) => {
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
            ],
          },
        ],
      });
      // console.log("ini isi dari getdata: ", getdata[0].dataValues);
      res.status(200).send(getdata);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
