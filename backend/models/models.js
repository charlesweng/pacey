const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize($MYSQL_DATABASE, 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Define the Image model
const Image = sequelize.define('Image', {
    image_data: {
        type: DataTypes.BLOB('long'), // Use LONGBLOB to store the image data
        allowNull: false,
    },
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Image model synchronized with the database.');
    })
    .catch((err) => {
        console.error('Error synchronizing the model:', err);
    });

module.exports = { sequelize, Image };
