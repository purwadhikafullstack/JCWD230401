'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('property_locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      gmaps: {
        type: Sequelize.STRING
      },
      regency_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      provinceId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      propertyId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('property_locations');
  }
};