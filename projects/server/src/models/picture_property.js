'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class picture_property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  picture_property.init({
    picture: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    propertyId: DataTypes.INTEGER,
    category_picture_propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'picture_property',
  });

  picture_property.associate = (models) => {
    picture_property.belongsTo(models.property, { foreignKey: 'propertyId' });
    picture_property.belongsTo(models.category_picture_property, { foreignKey: 'category_picture_propertyId' });
}
  return picture_property;
};