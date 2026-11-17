import { test, expect } from '@playwright/test';

test('Sign in link opens login page', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
});

test('login form fields are visible', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await expect(page.getByPlaceholder('Your email')).toBeVisible();
  await expect(page.getByPlaceholder('Your password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('register and forgot password links are visible', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await expect(page.getByText('Register your account')).toBeVisible();
  await expect(page.getByText('Forgot your Password?')).toBeVisible();
});

test('empty login errors', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
});

test('valid login opens account page', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
  await page.getByPlaceholder('Your password').fill('welcome01');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
});

test('only email filled shows password required', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByPlaceholder('Your email').fill('wrong@example.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Password is required')).toBeVisible();
  await expect(page.getByText('Email is required')).not.toBeVisible();
});

test('only password filled shows email required', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByPlaceholder('Your password').fill('WrongPass123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).not.toBeVisible();
});

test('wrong credentials stays on login page', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByPlaceholder('Your email').fill('wrong@example.com');
  await page.getByPlaceholder('Your password').fill('WrongPass123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
});