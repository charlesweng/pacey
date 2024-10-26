const anydateparser = require('any-date-parser');

let mapToSpacesToSearch = {
    "shock impedance": 5,
    "battery": 4,
    "impedance": 5,
    "implant": 20,
    "device": 26
};

function cleanString(str) {
    return str.trim().replace(/[^\w\s]/gi, '').trim();
}

function mapToCommonTerms(text) {
    let result = {
        'implant': [],
        'impedance': [],
        'battery': [],
        'shock impedance': [],
        'device': []
    };

    for (let key in mapToSpacesToSearch) {
        let regex = new RegExp(`(${key})(.{0,${mapToSpacesToSearch[key]}})`, "gi"); // Grabs 30 characters before and after the key
        let matches;
        while ((matches = regex.exec(text)) !== null) {
            let matched_text = matches[0].split(key)[1];
            if (!matched_text) {
                continue;
            }
            if (key === 'implant') {
                matched_text = anydateparser.attempt(matched_text.split("date:")[1]);
                const datetime = new Date(matched_text.year, matched_text.month - 1, matched_text.day);
                const timestamp = datetime.getTime();
                matched_text = timestamp;
                if (!matched_text) {
                    continue;
                }
            }
            if (key === 'device' && matches[0].split(key)[1].includes('transmission')) {
                continue;
            }
            if (key === 'impedance' || key === 'device' || key === 'shock impedance') {
                matched_text = cleanString(matched_text);
            }
            result[key].push(matched_text);
        }
    }
    result['impedance'] = result['impedance'].filter(item => !result['shock impedance'].includes(item));
    return result;
}



// Example usage
// let text = "The shock impedance and implant date are crucial metrics. The implant date is always verified. In some cases, shock impedance might vary.";
// let foundTerms = mapToCommonTerms(text);
// console.log(foundTerms);
module.exports = mapToCommonTerms;