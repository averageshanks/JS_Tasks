import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Function to fetch data from API
function fetchProductData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (err) {
                    reject('Error parsing JSON');
                }
            });
        }).on('error', (err) => {
            reject('Network error: ' + err.message);
        });
    });
}

// Function to write CSV
function writeCSV(products, filePath) {
    const headers = ['Title', 'Price', 'Brand', 'Product SKU'];
    const rows = products.map(product => {
        const title = product.title || 'N/A';
        const price = product.price || 'N/A';
        const brand = product.brand || 'N/A';
        const sku = product.id || 'N/A'; // Assuming SKU = ID
        return `"${title}","${price}","${brand}","${sku}"`;
    });

    const csv = [headers.join(','), ...rows].join('\n');

    fs.writeFileSync(filePath, csv, 'utf8');
    console.log(`Data written to ${filePath}`);
}

// Main logic
(async () => {
    const url = 'https://dummyjson.com/products/search?q=Laptop';
    const outputFilePath = path.join(__dirname, './data/laptop.csv');

    try {
        const data = await fetchProductData(url);
        if (!data.products || !Array.isArray(data.products)) {
            throw new Error("Invalid product data");
        }

        writeCSV(data.products, outputFilePath);
    } catch (err) {
        console.error(err);
    }
})();
