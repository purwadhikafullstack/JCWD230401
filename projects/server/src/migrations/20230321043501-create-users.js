'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birth: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female')
      },
      image_profile: {
        type: Sequelize.STRING
      },
      image_ktp: {
        type: Sequelize.STRING
      },
      attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isVerified: {
        type: Sequelize.BOOLEAN
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      isSuspended: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      tokenUpdate: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};