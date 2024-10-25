let mapToSpacesToSearch = {
    // "shock impedance": 5,
    // "shockimpedance": 5,
    // "implant date": 0,
    // "implantdate": 0,
    // "pace impedance": 5,
    "impedance": 5,
    "implant": 0
};

function mapToCommonTerms(text) {
    let result = {
        'implant': false,
        'impedance': []
    };

    for (let key in mapToSpacesToSearch) {
        let regex = new RegExp(`(${key})(.{0,${mapToSpacesToSearch[key]}})`, "gi"); // Grabs 30 characters before and after the key
        let matches;
        while ((matches = regex.exec(text)) !== null) {
            if (key === 'implant') {
                result[key] = true;
            }
            if (key === 'impedance') {
                result[key].push(matches[0].split('impedance')[1]);
            }
        }
    }
    
    return result;
}

// Example usage
// let text = "The shock impedance and implant date are crucial metrics. The implant date is always verified. In some cases, shock impedance might vary.";
// let foundTerms = mapToCommonTerms(text);
// console.log(foundTerms);
