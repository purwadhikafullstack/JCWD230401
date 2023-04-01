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
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    room_categoryId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
  });

  room.associate = (models) => {
    room.belongsTo(models.property, { foreignKey: 'propertyId' });
    room.belongsTo(models.room_category, { foreignKey: 'room_categoryId' });
  }
  return room;
};