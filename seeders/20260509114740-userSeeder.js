'use strict';
const passwordHash = require('password-hash')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await  queryInterface.bulkInsert("Users" , [
      {
        name: "test",
        email: "test@gmail.com",
        password: passwordHash.generate("testing123"),
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
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
