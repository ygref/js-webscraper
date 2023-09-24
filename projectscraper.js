const puppeteer = require("puppeteer");

(async function scrape() {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto("https://edhrec.com/commanders/prime-speaker-zegana");

  const nameColumnData = await page.evaluate(() => {
    const nameColumn = Array.from(document.querySelectorAll("th")).find(
      (column) => column.textContent.trim() === "Name"
    );
    const nameColumnIndex = Array.from(nameColumn.parentElement.children).indexOf(nameColumn);
    const nameData = [];

    const rows = document.querySelectorAll("tr");

    rows.forEach((row) => {
      const cell = row.children[nameColumnIndex];
      if (cell) {
        nameData.push(cell.textContent.trim());
      }
    });

    return nameData;
  });

  // Print the extracted "Name" column data
  console.log(nameColumnData);

  // Close the browser
  await browser.close();
})();
