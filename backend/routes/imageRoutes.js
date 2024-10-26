const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();

router.post('/upload', imageController.saveImage);
router.get('/allimages', imageController.getAllImages);

module.exports = router;
