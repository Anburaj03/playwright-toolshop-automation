import { test, expect } from '@playwright/test';

test('Register link opens registration page', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByText('Register your account').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/register');
});

test('register form fields are visible', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/register');
  await expect(page.getByPlaceholder('First name')).toBeVisible();
  await expect(page.getByPlaceholder('Your last name')).toBeVisible();
  await expect(page.getByPlaceholder('YYYY-MM-DD')).toBeVisible();
  await expect(page.getByPlaceholder('Your Postcode')).toBeVisible();
  await expect(page.getByPlaceholder('Your phone')).toBeVisible();
  await expect(page.getByPlaceholder('Your email')).toBeVisible();
  await expect(page.getByPlaceholder('Your password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});

test('empty register stays on registration page', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/register');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/register');
});

test('register a new customer account', async ({ page }) => {
  const email = `anbu${Date.now()}@example.com`;

  await page.goto('https://practicesoftwaretesting.com/auth/register');

  await page.getByPlaceholder('First name').fill('Anbu');
  await page.getByPlaceholder('Your last name').fill('Raj');
  await page.getByPlaceholder('YYYY-MM-DD').fill('1998-05-20');
  await page.getByLabel('Country').selectOption({ label: 'India' });
  await page.getByPlaceholder('Your Postcode').fill('600001');
  await page.getByPlaceholder('e.g. 42').fill('42');
  await expect(page.getByPlaceholder('Your Street')).toHaveValue(/.+/);
  await page.getByPlaceholder('Your phone').fill('9876543210');
  await page.getByPlaceholder('Your email').fill(email);
  await page.getByPlaceholder('Your password').fill('Zx9!kLm#2026qW');

  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForTimeout(4000);

  await page.screenshot({ path: 'register-result.png', fullPage: true });
  console.log('Registered with:', email, 'URL:', page.url());
  await expect(page.getByText('has appeared in a data leak')).not.toBeVisible();
});

test('leaked password is rejected', async ({ page }) => {
  const email = `anbu${Date.now()}@example.com`;

  await page.goto('https://practicesoftwaretesting.com/auth/register');

  await page.getByPlaceholder('First name').fill('Anbu');
  await page.getByPlaceholder('Your last name').fill('Raj');
  await page.getByPlaceholder('YYYY-MM-DD').fill('1998-05-20');
  await page.getByLabel('Country').selectOption({ label: 'India' });
  await page.getByPlaceholder('Your Postcode').fill('600001');
  await page.getByPlaceholder('e.g. 42').fill('42');
  await expect(page.getByPlaceholder('Your Street')).toHaveValue(/.+/);
  await page.getByPlaceholder('Your phone').fill('9876543210');
  await page.getByPlaceholder('Your email').fill(email);
  await page.getByPlaceholder('Your password').fill('Test@12345');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('has appeared in a data leak')).toBeVisible();
});