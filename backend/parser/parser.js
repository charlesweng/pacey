// take a pdf, jpg, or png and parse into text

const Tesseract = require('tesseract.js');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to call the Python script
function callPythonScript(input) {
  return new Promise((resolve, reject) => {
    // Spawn a new child process to run the Python script
    const pythonProcess = spawn('python', ['pdf_to_png.py', input]);
    let output = '';
    let errorOutput = '';

    // Handle data received from stdout
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString(); // Collect output data
    });

    // Handle data received from stderr
    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString(); // Collect error data
    });

    // Handle process exit
    pythonProcess.on('exit', (code) => {
      if (code !== 0) {
        reject(`Process exited with code ${code}: ${errorOutput}`);
      } else {
        resolve(output.trim()); // Resolve with the output
      }
    });
  });
}

// Parses a jpg or png image and uses async/await
async function parse_img(img_path) {
  try {
    const { data: { text } } = await Tesseract.recognize(
      img_path,
      'eng', // Language
      {
        logger: (m) => console.log(m), // Optional: Log progress
      }
    );
    return text;
  } catch (err) {
    console.error('Error:', err);
    return "";
  }
}

async function parse_document(doc_path) {
  if (doc_path.endsWith(".pdf")) {
    try {
      await callPythonScript(doc_path);
    } catch (error) {
      console.error(`Error calling Python script: ${error}`);
    }

    all_text = "";
    const directoryPath = './converted_files';
    const files = await fs.promises.readdir(directoryPath);

    const promises = files.map(async (file) => {
      const filePath = path.join(directoryPath, file);
      const text = await parse_img(filePath);
      return text; // Return the result of parse_img
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
        
    // Concatenate all text results
    all_text = results.join('');

    console.log("ALL TEXT: ", all_text);

    // delete the files in the converted_files directory after extracting text
    fs.readdir(directoryPath, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directoryPath, file), (err) => {
          if (err) throw err;
        });
      }
    });

    return all_text.toLowerCase();
  } else {
    return (await parse_img(doc_path)).toLowerCase();
  }
}

const IMG_PATH = "./BosSciCRTD.pdf";
// Call the async function
(async () => {
  const text = await parse_document(IMG_PATH);
  console.log('Recognized text:', text);
})();
