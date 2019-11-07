'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vm_servers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      server_type: {
        type: Sequelize.INTEGER
      },
      cpu: {
        type: Sequelize.INTEGER
      },
      mem: {
        type: Sequelize.INTEGER
      },
      counts: {
        type: Sequelize.INTEGER
      },
      connect: {
        type: Sequelize.INTEGER
      },
      doing: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vm_servers');
  }
};