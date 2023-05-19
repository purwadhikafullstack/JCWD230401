'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  review.init({
    uuid: DataTypes.STRING,
    review: DataTypes.STRING,
    rating: DataTypes.DECIMAL(3, 2),
    roomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'review',
  });

  review.associate = (models) => {
    review.belongsTo(models.room, { foreignKey: 'roomId' });
    review.belongsTo(models.user, { foreignKey: 'userId' });
    review.belongsTo(models.transaction, { foreignKey: 'transactionId' });
  }
  return review;
};