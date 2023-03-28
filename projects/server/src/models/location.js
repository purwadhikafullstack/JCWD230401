'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  location.init({
    uuid: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
    propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'location',
  });

  location.associate = (models) => {
    location.belongsTo(models.property, { foreignKey: 'propertyId' });
}
  return location;
};