const model = require("../models");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports = {
    getPropertyNameAndIdByUserId: async (req, res, next) => {
        try {
            let get = await model.property.findAll({
                where: {
                    isDeleted: false,
                    // userId: req.decrypt.id,
                },
                attributes: [
                    ["id", "value"],
                    ["property", "label"],
                ],
            });
            return res.status(200).send(get);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    addRoom: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {
            let { price, description, capacity, propertyId, name} =
                JSON.parse(req.body.data);

            let addRoomCategory = await model.room_category.create(
                {
                    name,
                    user_id: req.decrypt.id,
                },
                {transaction: ormTransaction}
            );
            console.log("Data addRoomCategory:", addRoomCategory);

            let addRoom = await model.room.create(
                {
                    uuid: uuidv4(),
                    price,
                    description,
                    capacity,
                    propertyId,
                    room_categoryId: addRoomCategory.dataValues.id,
                },
                {transaction: ormTransaction}
            );
            console.log("Data addRoom:", addRoom);
            if (req.files.length) {
                let newArr = req.files.map((val, idx) => {
                    delete val.fieldname;
                    delete val.originalname;
                    delete val.encoding;
                    delete val.mimetype;
                    delete val.destination;
                    delete val.path;
                    delete val.size;
                    val.picture = `/ImgRoom/${val.filename}`;
                    delete val.filename;
                    return { ...val, roomId: addRoom.dataValues.id };
                });
                console.log("Req.files:", req.files);
                await model.picture_room.bulkCreate(newArr);
            }

            await ormTransaction.commit();

            return res.status(200).send({
                success: true,
                data: addRoom,
            })
        } catch (error) {
            await ormTransaction.rollback()

            console.log(error);
            next(error);
        }
    },
};
