"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class property extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    property.init(
        {
            uuid: DataTypes.STRING,
            property: DataTypes.STRING,
            description: DataTypes.STRING,
            isDeleted: DataTypes.BOOLEAN,
            categoryId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "property",
        }
    );
    property.associate = (models) => {
        property.belongsTo(models.category, { foreignKey: "categoryId" });
    };
    return property;
};
