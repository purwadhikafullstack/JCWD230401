'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  province.init({
    name: DataTypes.STRING,
    alt_name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'province',
  });
  province.associate = (models) => {
    province.hasOne(models.property_location, { foreignKey: 'provinceId' });
    province.hasMany(models.regency, { foreignKey: 'province_id' });
}
  return province;
};