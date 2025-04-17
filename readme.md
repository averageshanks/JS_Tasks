# 📚 Grespr JS Task

This repository contains a series of JavaScript-based programming tasks designed to demonstrate core skills in problem-solving, data processing, and web scraping.

---

## 🚀 Task List

### 1. 🔢 **Find the Third Largest Number**
- Given an array of integers, this script finds the third largest distinct number.
- Handles edge cases where fewer than 3 distinct numbers exist.

---

### 2. 🪟 **Minimum Window Substring**
- Solves the classic problem of finding the smallest substring in a given string `s` that contains all characters of another string `t`.
- Uses a sliding window approach with optimized time complexity.

---

### 3. 📞 **Extract and Normalize Phone Numbers**
- Extracts phone numbers from a text blob using regex.
- Normalizes them into a standard format ((XXX) XXX-XXXX).

---

### 4. 💻 **Product Data Fetcher (Laptop CSV Export)**
- Fetches laptop-related product data from the [DummyJSON API](https://dummyjson.com/products/search?q=Laptop).
- Extracts fields such as Title, Price, Brand, and Product SKU.
- Outputs the data into a clean CSV file (`laptop.csv`).

---

### 5. 🧾 **HTML Table Scraper to CSV**
- Fetches an HTML page containing a table (e.g., company contact information).
- Parses and extracts columns like `Company`, `Contact`, and `Country`.
- Saves the data in a CSV file for easy use and analysis.

---

### 6. 📚 **Book Web Scraper**
- Scrapes book data from [Books to Scrape](https://books.toscrape.com/).
- Uses `cheerio` for DOM parsing and `axios` for HTTP requests.

---

## 🛠️ Technologies Used

- Node.js
- HTTPS / Axios (for data fetching)
- Cheerio (for HTML parsing)
- fs / path modules (for file handling)
- Regex (for phone number parsing)

---


## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Cheerio](https://www.npmjs.com/package/cheerio)

## 📦 Installation

```bash
git clone (https://github.com/averageshanks/JS_Tasks.git)
npm install
node <each_project_name>
