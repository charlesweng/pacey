// take a pdf, jpg, or png and parse into text

const Tesseract = require('tesseract.js');
const IMG_PATH = "./bossci.jpg";
const { spawn } = require('child_process');

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

// Async function to execute the Python call
async function run() {
    const input = "Hello from Node.js!";
    try {
        const output = await callPythonScript(input);
        console.log(`Received output: ${output}`);
    } catch (error) {
        console.error(`Error calling Python script: ${error}`);
    }
}


async function parse_document(doc_path) {
  if (doc_path.endsWith(".pdf")) {
    await run();
  }
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
        console.log(text);
        return text;
    } catch (err) {
        console.error('Error:', err);
        return "";
    }
}

// Call the async function
(async () => {
    const text = await parse_img(IMG_PATH);
    console.log('Recognized text:', text);
})();
