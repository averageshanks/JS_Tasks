import fs from 'fs';
import path from 'path';   

function extractAndNormalizePhoneNumbers(text) {
    const results = [];
    const regex = /(?:\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\(?\d{3}\)?[-.\s]?\d{4}/g;

    const matches = text.match(regex);
    if (!matches) return results;

    for (let number of matches) {
        const digits = number.replace(/\D/g, '');
        if (digits.length === 11 && digits.startsWith('1')) {
            number = digits.slice(1);
        } else if (digits.length === 10) {
            number = digits;
        } else {
            continue;
        }

        const normalized = `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
        results.push(normalized);
    }

    return results;
}


const filePath = './data/phones.txt'



fs.readFile(path.resolve(filePath), 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        process.exit(1);
    }

    const normalizedNumbers = extractAndNormalizePhoneNumbers(data);
    console.log(normalizedNumbers);
});
