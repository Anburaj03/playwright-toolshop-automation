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

// ---------- Search steps ----------

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

// ---------- Login steps ----------

Given('I am on the login page', async function () {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
});

When('I login with email {string} and password {string}', async function (email, password) {
  await page.getByPlaceholder('Your email').fill(email);
  await page.getByPlaceholder('Your password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
});

When('I click the login button', async function () {
  await page.getByRole('button', { name: 'Login' }).click();
});

Then('I should be on the account page', async function () {
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
});

// ---------- Shared step (search and login both use it) ----------

Then('I should see the message {string}', async function (message) {
  await expect(page.getByText(message)).toBeVisible();
});