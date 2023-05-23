"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class special_price extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    special_price.init(
        {
            uuid: DataTypes.STRING,
            startDate: DataTypes.DATEONLY,
            endDate: DataTypes.DATEONLY,
            priceOnDate: DataTypes.INTEGER,
            isActive: DataTypes.BOOLEAN,
            roomId: DataTypes.INTEGER,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "special_price",
        }
    );
    special_price.associate = (models) => {
        special_price.belongsTo(models.room, { foreignKey: "roomId" });
    };
    return special_price;
};
