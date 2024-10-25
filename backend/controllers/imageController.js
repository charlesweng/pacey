// controllers/imageController.js

const fs = require('fs');
const path = require('path');

// Function to save the base64 image with format validation
exports.saveImage = (req, res) => {
    const { base64Image } = req.body;

    // Check if base64 data exists
    if (!base64Image) {
        return res.status(400).json({ error: "Image data is missing." });
    }

    // Extract the image format from the base64 string
    const match = base64Image.match(/^data:image\/(png|jpg|jpeg);base64,/);
    if (!match) {
        return res.status(400).json({ error: "Invalid image format. Only PNG, JPG, and JPEG are allowed." });
    }

    // Remove the data URL prefix
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // Generate a filename based on the timestamp and the extracted extension
    const timestamp = Date.now();
    const extension = match[1];
    const filename = `${timestamp}.${extension}`;
    const imagePath = path.join(__dirname, '../uploads', filename);

    // Decode and save the image
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(imagePath, buffer, (err) => {
        if (err) {
            console.error("Failed to save the image:", err);
            return res.status(500).json({ error: "Failed to save the image." });
        }
        res.status(201).json({ message: "Image saved successfully.", path: imagePath });
    });
};
