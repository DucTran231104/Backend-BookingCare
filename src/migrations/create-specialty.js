'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Specialty', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            nameEn: {
                type: Sequelize.STRING
            },
            descriptionEn: {
                type: Sequelize.TEXT
            },
            descriptionVi: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('Specialty');
    }
};