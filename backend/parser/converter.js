const mapToCommonTerms = require('./keymap');
const parse_document = require('./parser');

// Helper function for processing images
async function textToJSON(filepath) {
    // skip: perform sequelize call to get table data from mariadb:3306 try 0.0.0.0 or 127.0.0.1 as the host
    const img_path = "./boston.png";
    const text = await parse_document(filepath);
    const parsedJson = mapToCommonTerms(text);
  
    const data = {
      'pacemaker_dependent': parsedJson["implant"],
      'incision_location': '',
      'pacemaker_manufacturer': parsedJson["device"],
      'magnet_response': (parsedJson["battery"][0].length >= 1) ? "ON" : "OFF",
      'impedance': parsedJson["impedance"].join(',')
    }
  
    return data;
}

const IMG_PATH = "./boston.png";

(async () => {
    const text = await textToJSON(IMG_PATH);
    console.log('Recognized text:', JSON.stringify(text));
})();

module.exports = textToJSON;
