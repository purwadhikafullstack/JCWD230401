'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction_status.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction_status',
  });
  transaction_status.associate = (models) => {
    transaction_status.hasMany(models.transaction, { foreignKey: 'transaction_statusId' });
  }
  return transaction_status;
};