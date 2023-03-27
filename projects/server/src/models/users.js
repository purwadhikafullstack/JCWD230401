"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    users.init(
        {
            uuid: DataTypes.STRING,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phone: DataTypes.STRING,
            birth: DataTypes.DATEONLY,
            gender: DataTypes.ENUM("Male", "Female"),
            image_profile: DataTypes.STRING,
            image_ktp: DataTypes.STRING,
            attempts: DataTypes.INTEGER,
            isVerified: DataTypes.BOOLEAN,
            isDeleted: DataTypes.BOOLEAN,
            roleId: DataTypes.INTEGER,
            statusId: DataTypes.INTEGER,
            isSuspended: DataTypes.BOOLEAN,
            tokenUpdate: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "users",
        }
    );
    return users;
};
