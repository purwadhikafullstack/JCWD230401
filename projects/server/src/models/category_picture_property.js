'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_picture_property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category_picture_property.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category_picture_property',
  });

  category_picture_property.associate = (models) => {
    category_picture_property.hasMany(models.picture_property, { foreignKey: 'category_picture_propertyId' });
  }
  return category_picture_property;
};