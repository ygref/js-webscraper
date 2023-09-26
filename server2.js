const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsite(url) {
  try {
    // Fetch the HTML content of the webpage
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML content into Cheerio
    const $ = cheerio.load(html);

    const extractedText = [];
    $("h2").each((index, element) => {
      // Adjust the selector according to the HTML structure
      const text = $(element).text().trim();
      extractedText.push(text);
    });
    const extractedPrice = [];
    $("span.price").each((index, element) => {
      const price = $(element).text().trim();
      extractedPrice.push(price);
    });

    // Process and display the extracted text
    console.log("Extracted Text:", extractedText);
    console.log("Extraced Price:", extractedPrice);
  } catch (error) {
    console.error("Error:", error);
  }
}

// URL of the webpage you want to scrape
const targetURL = "https://scrapeme.live/shop/";

// Call the scraping function with the target URL
scrapeWebsite(targetURL);
