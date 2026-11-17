import { test, expect } from '@playwright/test';

test('sign in form', async ({ page }) => {
  // Home page open, product select, cart-ku add
  await page.goto('https://practicesoftwaretesting.com');
  await page.locator('[data-test="product-name"]').filter({ hasNotText: 'Pliers' }).first().click();
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');

  // Cart page-ku poi Proceed click
  await page.locator('[data-test="nav-cart"]').click();
  await page.locator('[data-test="proceed-1"]').click();

  // Sign in step check
  await expect(page.getByRole('tab', { name: 'Continue as Guest' })).toBeVisible();
  await expect(page.locator('[data-test="email"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-submit"]')).toBeVisible();
});

test('wrong login', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.locator('[data-test="product-name"]').filter({ hasNotText: 'Pliers' }).first().click();
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  await page.locator('[data-test="nav-cart"]').click();
  await page.locator('[data-test="proceed-1"]').click();

  // Thappaana email, password
  await page.locator('[data-test="email"]').fill('wrong@example.com');
  await page.locator('[data-test="password"]').fill('WrongPass123');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});

test('guest tab', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.locator('[data-test="product-name"]').filter({ hasNotText: 'Pliers' }).first().click();
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  await page.locator('[data-test="nav-cart"]').click();
  await page.locator('[data-test="proceed-1"]').click();

  // Guest tab click, fields check
  await page.getByRole('tab', { name: 'Continue as Guest' }).click();
  await expect(page.locator('[data-test="guest-email"]')).toBeVisible();
  await expect(page.locator('[data-test="guest-first-name"]')).toBeVisible();
  await expect(page.locator('[data-test="guest-last-name"]')).toBeVisible();
  await expect(page.locator('[data-test="guest-submit"]')).toBeVisible();
});

test('guest flow', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.locator('[data-test="product-name"]').filter({ hasNotText: 'Pliers' }).first().click();
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  await page.locator('[data-test="nav-cart"]').click();
  await page.locator('[data-test="proceed-1"]').click();

  // Guest details fill pannu
  await page.getByRole('tab', { name: 'Continue as Guest' }).click();
  await page.locator('[data-test="guest-email"]').fill(`guest${Date.now()}@example.com`);
  await page.locator('[data-test="guest-first-name"]').fill('Anbu');
  await page.locator('[data-test="guest-last-name"]').fill('Raj');
  await page.locator('[data-test="guest-submit"]').click();
  await page.locator('[data-test="proceed-2-guest"]').click();

  // Billing step vandhucha
  await expect(page.locator('[data-test="proceed-3"]')).toBeVisible();
  await page.screenshot({ path: 'billing-step.png', fullPage: true });
  const text = await page.locator('body').innerText();
  console.log('Billing step text:', text.slice(0, 800));
});