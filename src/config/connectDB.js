const { Sequelize } = require('sequelize');

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite'
// });

// // Option 3: Passing parameters separately (other dialects)
// Sử dụng biến môi trường nếu có, nếu không thì dùng giá trị mặc định
const dbName = process.env.DB_NAME || 'Bookingcare';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || null;
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql', /* one of| 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    logging: false
});

// Định nghĩa models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('../models/user')(sequelize, Sequelize.DataTypes);
// Thêm các models khác nếu cần

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { db, connectDB };
