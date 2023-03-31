"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class room_category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    room_category.init(
        {
            name: DataTypes.STRING,
            isDeleted: DataTypes.TINYINT,
        },
        {
            sequelize,
            modelName: "room_category",
        }
    );
    return room_category;
};
