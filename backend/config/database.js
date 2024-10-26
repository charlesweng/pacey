// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("flask_app", 'root', '', {
    host: 'db', // or your database host
    dialect: 'mysql', // specifies using MariaDB
    port: 3306, // default port for MariaDB
});

// // Test the connection
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection to MariaDB has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();

module.exports = sequelize;
