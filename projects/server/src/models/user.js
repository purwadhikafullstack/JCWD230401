'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    uuid: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    attempts: DataTypes.INTEGER,
    isSuspended: DataTypes.BOOLEAN,
    otp: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
<<<<<<< HEAD:projects/server/src/models/user.js
  user.associate = (models) => {
    user.hasOne(models.user_detail, { foreignKey: 'userId' });
   }
  return user;
=======
  users.associate = (models) => {
    users.hasMany(models.property, { foreignKey: 'userId' });
  }
  return users;
>>>>>>> 640bdd3c81ebf4b0b081379df5791df8dcc3e58d:projects/server/src/models/users.js
};