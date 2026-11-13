import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.locator('[data-test="product-name"]').first().click();
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
    await expect(page.locator('[data-test="product-title"]')).toContainText('Combination Pliers');
    await expect(page.locator('[data-test="product-price"]')).toContainText('14.15');
    await expect(page.locator('[data-test="line-price"]')).toContainText('14.15');
    await expect(page.locator('[data-test="cart-total"]')).toContainText('14.15');
  });

  test('cart quantity', async ({ page }) => {
    await page.locator('[data-test="product-quantity"]').fill('3');
    await page.locator('[data-test="product-quantity"]').press('Tab');
    await expect(page.locator('[data-test="line-price"]')).toContainText('42.45');
    await expect(page.locator('[data-test="cart-total"]')).toContainText('42.45');
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