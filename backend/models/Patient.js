// models/Patient.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a configured Sequelize instance

const Patient = sequelize.define('Patient', {
    patient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pacemaker_dependent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    incision_location: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    pacemaker_manufacturer: {
        type: DataTypes.STRING(50),
    },
    magnet_response: {
        type: DataTypes.STRING(20),
    },
    impedance: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_path: {
        type: DataTypes.STRING(13383), // VARCHAR(13383)
    },
}, {
    tableName: 'Patient',
    timestamps: false,
});

module.exports = Patient;
