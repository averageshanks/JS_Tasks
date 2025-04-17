import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const URL = 'https://bitbucket.org/!api/2.0/snippets/grepsr/nE754R/ed2c70b738942f466ef75e0ca8a72a28556b3b80/files/tables.html';
const OUTPUT_FILE = path.join(__dirname, './data/table_data.csv');

async function fetchHTML(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return await res.text();
}

function parseTable(html) {
    const $ = cheerio.load(html);
    const table = $('table').first();
    const headers = [];
    const rows = [];

    table.find('tr').first().find('th').each((_, th) => {
        headers.push($(th).text().trim());
    });

    const companyIndex = headers.findIndex(h => /company/i.test(h));
    const contactIndex = headers.findIndex(h => /contact/i.test(h));
    const countryIndex = headers.findIndex(h => /country/i.test(h));

    if (companyIndex === -1 || contactIndex === -1 || countryIndex === -1) {
        throw new Error('Required columns not found in the table');
    }

    table.find('tr').slice(1).each((_, tr) => {
        const cells = $(tr).find('td');
        if (cells.length < 3) return;

        const company = $(cells[companyIndex]).text().trim() || 'N/A';
        const contact = $(cells[contactIndex]).text().trim() || 'N/A';
        const country = $(cells[countryIndex]).text().trim() || 'N/A';

        rows.push({ company, contact, country });
    });

    return rows;
}

function writeCSV(data, filePath) {
    const headers = ['Company', 'Contact', 'Country'];
    const csv = [
        headers.join(','),
        ...data.map(row => `"${row.company}","${row.contact}","${row.country}"`)
    ].join('\n');

    fs.writeFileSync(filePath, csv, 'utf8');
    console.log(`Data written to ${filePath}`);
}

// Run
(async () => {
    try {
        const html = await fetchHTML(URL);
        const data = parseTable(html);
        writeCSV(data, OUTPUT_FILE);
    } catch (err) {
        console.error('Error:', err.message);
    }
})();
