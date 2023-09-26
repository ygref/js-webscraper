const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const extractedText = [];
    $("h2").each((index, element) => {
      const text = $(element).text().trim();
      extractedText.push(text);
    });
    const extractedPrice = [];
    $("span.price").each((index, element) => {
      const price = $(element).text().trim();
      extractedPrice.push(price);
    });

    console.log("Extracted Text:", extractedText);
    console.log("Extraced Price:", extractedPrice);
  } catch (error) {
    console.error("Error:", error);
  }
}

const targetURL = "https://scrapeme.live/shop/";

scrapeWebsite(targetURL);
