import { test, expect } from '@playwright/test';

test('home page', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0'); // correct name in the page
  // await expect(page).toHaveTitle('Wrong Title'); // for a wrong name in the page
});

test('sign in', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
  console.log(page.url());
});

test('Categories', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await expect(page.getByRole('button', { name: 'Categories' })).toBeVisible();
});

test('contact us', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/contact');
});

test('contact visible', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/contact');
  await expect(page.getByPlaceholder('Your first name')).toBeVisible();
  await expect(page.getByPlaceholder('Your last name')).toBeVisible();
  await expect(page.getByPlaceholder('Your email')).toBeVisible();
  await expect(page.getByLabel('Subject')).toBeVisible();
  await expect(page.getByLabel('Message')).toBeVisible();
  await expect(page.getByLabel('Attachment')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
});

test('contact empty form send', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/contact');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.screenshot({ path: 'contact-empty-send.png', fullPage: true });
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/contact');
});

test('contact required check', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/contact');
  await page.getByRole('button', { name: 'Send' }).click();

  const subject = page.getByLabel('Subject');
  const message = page.getByLabel('Message');
  const attachment = page.getByLabel('Attachment');

  console.log('Subject required:', await subject.evaluate(el => el.required));
  console.log('Message required:', await message.evaluate(el => el.required));
  console.log('Attachment required:', await attachment.evaluate(el => el.required));
  console.log('Attachment message:', await attachment.evaluate(el => el.validationMessage));
});

test('fill first name', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/contact');
  await page.locator('[data-test="first-name"]').fill('Anbu');
  await expect(page.locator('[data-test="first-name"]')).toHaveValue('Anbu');
});

test('contact fill form', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/contact');

  await page.locator('[data-test="first-name"]').fill('Anbu');
  await page.getByPlaceholder('Your last name').fill('raj');
  await page.getByPlaceholder('Your email').fill('test@example.com');
  await page.getByLabel('Subject').selectOption({ index: 1 });
  await page.getByLabel('Message').fill('This is a test message for practice.');

  await expect(page.locator('[data-test="first-name"]')).toHaveValue('Anbu');
  await expect(page.getByPlaceholder('Your last name')).toHaveValue('raj');
  await expect(page.getByPlaceholder('Your email')).toHaveValue('test@example.com');
  await expect(page.getByLabel('Message')).toHaveValue('This is a test message for practice.');

  console.log('Subject selected:', await page.getByLabel('Subject').inputValue());
});