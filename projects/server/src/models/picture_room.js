'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class picture_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  picture_room.init({
    picture: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'picture_room',
  });
  return picture_room;
};