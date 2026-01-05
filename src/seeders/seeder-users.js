'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: '1@gmail.com',
        password: '1',
        firstName: 'Duc',
        lastName: 'Tran',
        address: 'HaTinh',
        gender: '1',
        roleId: 'R1',
        phoneNumber: '1',
        positionId: 'S1',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

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
  //roun
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
