'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    uuid: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    image_payment: DataTypes.STRING,
    isConfirmed: DataTypes.BOOLEAN,
    transaction_statusId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    expiredAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaction',
  });
  transaction.associate = (models) => {
    transaction.belongsTo(models.room, { foreignKey: 'roomId' });
    transaction.hasMany(models.order, { foreignKey: 'transactionId' });
  }
  return transaction;
};