// Source - https://stackoverflow.com/a
// Posted by Maria Ines Parnisari, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-02, License - CC BY-SA 4.0

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.BLOB,
                allowNull: true,
            })
        ])
    },
}
