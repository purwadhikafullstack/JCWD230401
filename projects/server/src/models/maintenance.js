"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class maintenance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    maintenance.init(
        {
            uuid: DataTypes.STRING,
            startDate: DataTypes.DATEONLY,
            endDate: DataTypes.DATEONLY,
            remarks: DataTypes.STRING,
            isActive: DataTypes.BOOLEAN,
            roomId: DataTypes.INTEGER,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "maintenance",
        }
    );
    maintenance.associate = (models) => {
        maintenance.belongsTo(models.room, { foreignKey: "roomId" });
    };
    return maintenance;
};
