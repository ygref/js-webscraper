const axios = require("axios");
const cheerio = require("cheerio");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function scrapeWebsite(cardSet, cardName) {
  const targetURL = `https://www.mtggoldfish.com/price/${encodeURIComponent(cardSet)}/${encodeURIComponent(cardName)}`;

  try {
    const response = await axios.get(targetURL);
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
    // console.log("Extracted Price:", extractedPrice);
    console.log("Card Kingdom:", purchasePrice[0]);
    console.log("eBay - But It Now:", purchasePrice[1]);
    console.log("TCGplayer Mid:", purchasePrice[2]);
  } catch (error) {
    console.error("Error:", error);
  }
}

function searchForCard() {
  rl.question("Enter the card name: (Case sensitive)", (cardName) => {
    rl.question("Enter the set: (Case sensitive)", (cardSet) => {
      scrapeWebsite(cardSet, cardName);
      rl.question("Do you want to look for another card? (Yes / No): ", (answer) => {
        if (answer.toLowerCase() === "yes") {
          searchForCard();
        } else {
          rl.close();
        }
      });
    });
  });
}

searchForCard();
