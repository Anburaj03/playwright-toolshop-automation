import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  let name;
  let price;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.locator('[data-test="product-name"]').filter({ hasNotText: 'Pliers' }).first().click();

    // Product page-la peyar, price edukkurom
    name = (await page.locator('[data-test="product-name"]').innerText()).trim();
    price = (await page.locator('[data-test="unit-price"]').innerText()).replace('$', '').trim();

    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
    await page.locator('[data-test="nav-cart"]').click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
  });

  test('cart badge', async ({ page }) => {
    await expect(page.locator('[data-test="nav-cart"]')).toBeVisible();
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  });

  test('cart item', async ({ page }) => {
    await expect(page.locator('[data-test="product-title"]')).toContainText(name);
    await expect(page.locator('[data-test="product-price"]')).toContainText(price);
    await expect(page.locator('[data-test="line-price"]')).toContainText(price);
    await expect(page.locator('[data-test="cart-total"]')).toContainText(price);
  });

  test('cart quantity', async ({ page }) => {
    const total = (Number(price) * 3).toFixed(2);
    await page.locator('[data-test="product-quantity"]').fill('3');
    await page.locator('[data-test="product-quantity"]').press('Tab');
    await expect(page.locator('[data-test="line-price"]')).toContainText(total);
    await expect(page.locator('[data-test="cart-total"]')).toContainText(total);
  });

  test('continue shopping', async ({ page }) => {
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).not.toHaveURL('https://practicesoftwaretesting.com/checkout');
  });

  test('proceed checkout', async ({ page }) => {
    await page.locator('[data-test="proceed-1"]').click();
    await expect(page.locator('[data-test="email"]')).toBeVisible();
    await expect(page.locator('[data-test="login-submit"]')).toBeVisible();
  });
});