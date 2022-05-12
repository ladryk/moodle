const chrome = require("chrome-cookies-secure");
const puppeteer = require("puppeteer");

const cookieUrl = "https://hapek.edu.pl/";

(async () => {
  await chrome.getCookies(cookieUrl, async (err, data) => {
    const browser = await puppeteer.launch({
      defaultViewport: { width: 1920, height: 1080 },
    });
    const page = await browser.newPage();

    const cookies = [
      {
        name: "MoodleSession",
        value: data["MoodleSession"],
        domain: "hapek.edu.pl",
      },
    ];

    console.log(cookies);

    await page.setCookie(...cookies);
    await page.goto("https://hapek.edu.pl/");

    await page.screenshot({ path: "preview.png" });

    await page.close();
    await browser.close();
  });
})();
