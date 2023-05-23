'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class regency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  regency.init({
    province_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    alt_name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'regency',
  });

  regency.associate = (models) => {
    regency.belongsTo(models.province, { foreignKey: 'province_id' });
    regency.hasMany(models.property_location, { foreignKey: 'regency_id' });
}
  return regency;
};