const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");


module.exports = {
    getAverageAndReviewProperty: async (req, res, next) => {
        try {
            let get = await model.review.findAll({
                include: [
                    {
                        model: model.room, attributes: ['description'], required: true,
                        include: [
                            { model: model.room_category, attributes: ['name'] },
                            { model: model.property, attributes: ['property'], where: { userId: 9 } }, //uuid
                        ]
                    },
                    {
                        model: model.user, attributes: ['uuid'],
                        include: [
                            { model: model.user_detail, attributes: ['name', 'image_profile'] }
                        ]
                    }
                ]
            });
            let getAvg = await model.review.findAll({
                attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']],
                include: [
                    {
                        model: model.room, attributes: ['uuid'], required: true,
                        include: [{
                            model: model.property, attributes: ['property'], where: {
                                id: 2 // pake uuid harusnya
                            }
                        }]
                    }
                ]
            })
            res.status(200).send({
                review: get,
                average: getAvg
            })
        } catch (error) {
            console.log(error);
            next(error)
        }

    },
    addReview: async (req, res, next) => {
        const ormTransaction = await model.sequelize.transaction();
        try {

            let getBuatisiroomID // klo dari FE gak ngasih roomId



            let add = await model.review.create({
                uuid: uuidv4,
                review: req.body.review,
                rating: req.body.rating,
                roomId: "belomm",
                userId: "belomm" // decrypt.id
            },
                { transaction: ormTransaction }
            )


            await ormTransaction.commit();
            res.status(200).send({
                success: true
            })
        } catch (error) {
            await ormTransaction.rollback();
            console.log(error);
            next(error)
        }

    }
}
