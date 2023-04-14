'use strict';
const {
  Model
} = require('sequelize');
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
  room_category.init({
    name: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room_category',
  });

  room_category.associate = (models) => {
    room_category.hasMany(models.room, { foreignKey: 'room_categoryId' });
  }
  return room_category;
};