'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    uuid: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    price: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  order.associate = (models) => {
    order.belongsTo(models.room, { foreignKey: 'roomId' });
    order.belongsTo(models.transaction, { foreignKey: 'transactionId' });
  }
  return order;
};