"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class property_location extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    property_location.init(
        {
            uuid: DataTypes.STRING,
            address: DataTypes.STRING,
            zip: DataTypes.STRING,
            country: DataTypes.STRING,
            regencyId: DataTypes.INTEGER,
            provinceId: DataTypes.INTEGER,
            propertyId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "property_location",
        }
    );
    property_location.associate = (models) => {
        property_location.belongsTo(models.property, {
            foreignKey: "propertyId"
        })
    };

    return property_location;
};
