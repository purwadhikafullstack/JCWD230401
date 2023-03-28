'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  room.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    booked: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};