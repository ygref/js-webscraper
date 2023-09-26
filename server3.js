const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const extractedText = [];
    $("div.price-card-name-set-name").each((index, element) => {
      const text = $(element).text().trim();
      extractedText.push(text);
    });
    const extractedPrice = [];
    $("div.price-box.paper").each((index, element) => {
      const price = $(element).text().trim();
      extractedPrice.push(price);
    });

    const purchasePrice = [];
    $("span.btn-shop-price").each((index, element) => {
      const pprice = $(element).text().trim();
      purchasePrice.push(pprice);
    });

    console.log("Extracted Text:", extractedText);
    console.log("Extraced Price:", extractedPrice);
    console.log("Purchase Price:", purchasePrice);
  } catch (error) {
    console.error("Error:", error);
  }
}

const targetURL = "https://www.mtggoldfish.com/price/Gatecrash/Prime+Speaker+Zegana#online";

scrapeWebsite(targetURL);
