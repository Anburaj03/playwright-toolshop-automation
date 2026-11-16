const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

setDefaultTimeout(30000);

let browser;
let page;

Before(async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
});

After(async function () {
  await browser.close();
});

Given('I am on the home page', async function () {
  await page.goto('https://practicesoftwaretesting.com/');
});

When('I search for {string}', async function (term) {
  await page.locator('[data-test="search-query"]').fill(term);
  await page.locator('[data-test="search-submit"]').click();
});

Then('I should see the product {string}', async function (name) {
  await expect(page.locator('[data-test="product-name"]').filter({ hasText: name }).first()).toBeVisible();
});

Then('I should see the message {string}', async function (message) {
  await expect(page.getByText(message)).toBeVisible();
});