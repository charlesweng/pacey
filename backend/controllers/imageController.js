// controllers/imageController.js

const fs = require('fs');
const path = require('path');
const Patient = require('../models/Patient');
const textToJSON = require('../parser/converter');

function remapPatientKeys(jsonObj) {
    const data = {
        'implant_date': jsonObj['pacemaker_dependent'],
        'pacemaker_manufacturer': jsonObj['pacemaker_manufacturer'],
        'impedance': jsonObj['impedance'],
        'id': jsonObj['patient_id'],
        'battery': jsonObj['magnet_response'],
        'image_path': jsonObj['image_path']
    }
    return data;
}

exports.getAllImages = async (req, res) => {
    try {
        const patients = await Patient.findAll({
            order: [['patient_id', 'DESC']] // Order by patient_id in descending order
        });
        const patientJSON = patients.map(patient => remapPatientKeys(patient.toJSON()));
        // console.log(patientJSON);
        return res.status(200).json(patientJSON);
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

    let data = await textToJSON(imagePath);

    fs.writeFile(imagePath, base64Data, "base64", async (err) => {
        if (err) {
            console.error("Failed to save the image:", err);
            return res.status(500).json({ error: "Failed to save the image." });
        }

        try {
            //Store patient data and image path in the database
            console.log(JSON.stringify(data));
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

//convert to datetime (for ui)
function convertSecondsToDatetime(seconds) {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    return date.toISOString(); // Convert to ISO 8601 string
}

//want to display this in ui so gunna convert normal string imagepath
function imageToBase64(imagePath) {
    try {
        const image = fs.readFileSync(imagePath);
        return Buffer.from(image).toString('base64');
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

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
exports.getPatientById = async (req, res) => {
    const { patient_id } = req.params;
    try {
            const patient = await Patient.findByPk(patient_id);
        
        if(patient)
        {
            //found patient
            patientDataRemapped = remapPatientKeys(res.status(200).patient.toJSON());

            const Newdata = {
                //convert implant data into datetime string
                'implant_date': convertSecondsToDatetime(patientDataRemapped['implant_date']), //convert here
                'pacemaker_manufacturer': patientDataRemapped['pacemaker_manufacturer'],
                'impedance': patientDataRemapped['impedance'],
                'battery': patientDataRemapped['battery'],
                //image path to base64 string
                'image_path': imageToBase64(patientDataRemapped['image_path']) //convert here
            }
            return res.status(200).json(Newdata);

        } else{ throw new Error('No patient retrieved!'); }

        // const patientJSON = patients.map(patient => remapPatientKeys(patient.toJSON()));
        // console.log(patientJSON);
       // return res.status(200).json(patientJSON);
    } catch (error) {
        console.error('Error fetching patient:', error);
        return res.status(500).json({ error: `Error fetching patients: ${error}` });
    }

}
