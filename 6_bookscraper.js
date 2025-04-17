import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://books.toscrape.com/';
const OUTPUT_CSV = join(__dirname, './data/books_data.csv');

const HEADERS = [
  "Book Name", "Price", "Rating", "Breadcrumbs", "Product Description",
  "UPC", "Product Type", "Price (excl. tax)", "Price (incl. tax)",
  "Tax", "Availability", "Number of reviews"
];

function getRating(className = '') {
  const ratings = ["One", "Two", "Three", "Four", "Five"];
  return ratings.find(r => className.includes(r)) || "Not rated";
}

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

async function scrapeBookDetails(bookURL) {
  const $ = await fetchHTML(bookURL);
  const title = $('h1').text().trim();
  const price = $('.price_color').first().text().trim();
  const rating = getRating($('p.star-rating').attr('class'));

  const breadcrumbs = $('.breadcrumb li a')
    .slice(1)
    .map((_, el) => $(el).text().trim())
    .get()
    .join(' > ');

  const descHeader = $('#product_description');
  const description = descHeader.length ? descHeader.next('p').text().trim() : '';

  const productInfo = {};
  $('table.table tr').each((_, row) => {
    const key = $(row).find('th').text().trim();
    const val = $(row).find('td').text().trim();
    productInfo[key] = val;
  });

  return [
    title,
    price,
    rating,
    breadcrumbs,
    description,
    productInfo["UPC"] || "",
    productInfo["Product Type"] || "",
    productInfo["Price (excl. tax)"] || "",
    productInfo["Price (incl. tax)"] || "",
    productInfo["Tax"] || "",
    productInfo["Availability"] || "",
    productInfo["Number of reviews"] || ""
  ];
}

async function scrapePage(pageNumber) {
    const pageURL = pageNumber === 1 ? BASE_URL : `${BASE_URL}catalogue/page-${pageNumber}.html`;
    const $ = await fetchHTML(pageURL);
  
    const bookLinks = $('h3 a')
      .map((_, a) => new URL($(a).attr('href'), pageURL).href)
      .get();
  
    const books = [];
    for (const link of bookLinks) {
      console.log(`🔎 Scraping: ${link}`);
      try {
        const details = await scrapeBookDetails(link);
        books.push(details);
      } catch (err) {
        console.error(`Failed to scrape ${link}: ${err.message}`);
      }
    }
  
    return books;
  }
  

async function main() {
  const allBooks = [];
  for (let i = 1; i <= 3; i++) {
    const pageBooks = await scrapePage(i);
    allBooks.push(...pageBooks);
  }

  const csvData = [HEADERS.join(',')]
    .concat(allBooks.map(row =>
      row.map(val => `"${val.replace(/"/g, '""')}"`).join(',')
    ))
    .join('\n');

  await fs.writeFile(OUTPUT_CSV, csvData, 'utf-8');
  console.log(`Done. Saved to '${OUTPUT_CSV}'`);
}

main().catch(console.error);
