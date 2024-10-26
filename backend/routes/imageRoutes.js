const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();

router.post('/upload', imageController.saveImage);
router.get('/allimages', imageController.getAllImages);

//will need to remap keys first
//query params for get
//will need to create a route

//can use curl or postman to verify results

//imageroutes
// ============
// add a path
router.get('/patients/:patient_id', imageController.getPatientById);


// imagecontroller
// ===========
// create a function called getPatientById
// callremap to get the following json
// {
// implant_date -> convert timeinseconds into datetime string
// impedance
// battery
// pacemaker_manufacturer
// image_path -> image_path to a base64 string -> could be displayed on the ui
// }

module.exports = router;
