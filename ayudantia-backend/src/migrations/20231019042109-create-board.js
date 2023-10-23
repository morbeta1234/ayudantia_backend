'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      position_player_1: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      position_player_2: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      game_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Games', key: 'id' },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Boards');
  }
};