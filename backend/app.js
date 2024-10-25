// app.js

const express = require('express');
const app = express();
const imageRoutes = require('./routes/imageRoutes');
const path = require('path');
const fs = require('fs');

// Middleware to parse JSON requests
app.use(express.json({ limit: '10mb' })); // Increase limit if needed

// Create the uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Use the image routes
app.use('/api/images', imageRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
