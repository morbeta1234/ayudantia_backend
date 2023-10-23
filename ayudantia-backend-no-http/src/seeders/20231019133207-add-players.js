'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Players', [
      { 
        game_id: 1,
        username: "Papa Frita",
        mail: "papa@frita.eu",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        game_id: 1,
        username: "Papa Rústica",
        mail: "papa@rústica.pe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        game_id: 2,
        username: "Coca Cola",
        mail: "cocaa@cola.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        game_id: 2,
        username: "Pepsi",
        mail: "pepsi@cola.ca",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
