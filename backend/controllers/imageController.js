// controllers/imageController.js

const fs = require('fs');
const path = require('path');
const Patient = require('../models/Patient');
const textToJSON = require('../parser/converter');

exports.getAllImages = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        return res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        return res.status(500).json({ error: `Error fetching patients: ${error}` });
    }
};

// Function to save the base64 image and update database with image path
exports.saveImage = async (req, res) => {
    const { base64Image } = req.body;
    const pacemaker_dependent = 1;
    const incision_location = "";
    const pacemaker_manufacturer = "";
    const magnet_response = "";
    const impedance = 1;
    if (!base64Image) {
        return res.status(400).json({ error: "Image data is missing." });
    }

    // Extract the image format and validate it
    const match = base64Image.match(/^data:image\/(png|jpg|jpeg);base64,/);
    if (!match) {
        return res.status(400).json({ error: "Invalid image format. Only PNG, JPG, and JPEG are allowed." });
    }

    // Remove the data URL prefix
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // Generate filename based on timestamp
    const timestamp = Date.now();
    const extension = match[1];
    const filename = `${timestamp}.${extension}`;
    const imagePath = path.join(__dirname, '../images', filename);

    let data = textToJSON(imagePath);

    fs.writeFile(imagePath, base64Data, "base64", async (err) => {
        if (err) {
            console.error("Failed to save the image:", err);
            return res.status(500).json({ error: "Failed to save the image." });
        }

        try {
            //Store patient data and image path in the database
            const patient = await Patient.create({
                ...data,
                image_path: imagePath,
            });

            return res.status(201).json({ message: "Image saved and patient record created successfully."});
        } catch (error) {
            console.error("Failed to save patient record:", error);
            return res.status(500).json({ error: "Failed to save patient record." });
        }
    });
};
