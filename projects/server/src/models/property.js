"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  property.init({
    uuid: DataTypes.STRING,
    property: DataTypes.STRING,
    description: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property',
  });

  property.associate = (models) => {
    property.hasMany(models.picture_property, { foreignKey: 'propertyId' });
    property.hasMany(models.room, { foreignKey: 'propertyId' }); 
    property.belongsTo(models.category, { foreignKey: 'categoryId' }); 
    property.hasOne(models.property_location, { foreignKey: 'propertyId' }); 
    property.belongsTo(models.user, { foreignKey: 'userId' }); 
}
  return property;
};
