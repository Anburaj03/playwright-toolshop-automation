import { test, expect } from '@playwright/test';

test.describe('Product page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.locator('[data-test="product-name"]').filter({ hasNotText: 'Pliers' }).first().click();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });

  test('details', async ({ page }) => {
    await expect(page.locator('[data-test="product-name"]').first()).not.toBeEmpty();
    await expect(page.locator('[data-test="unit-price"]')).toContainText(/\d+\.\d\d/);
    await expect(page.locator('[data-test="product-description"]')).toBeVisible();
    await expect(page.locator('[data-test="product-specs"]')).toBeVisible();
  });

  test('quantity', async ({ page }) => {
    const quantity = page.locator('[data-test="quantity"]');
    const start = Number(await quantity.inputValue());

    await page.locator('[data-test="increase-quantity"]').click();
    await expect(quantity).toHaveValue(String(start + 1));

    await page.locator('[data-test="decrease-quantity"]').click();
    await expect(quantity).toHaveValue(String(start));

    for (let i = 0; i < 3; i++) {
      await page.locator('[data-test="decrease-quantity"]').click();
    }
    const value = await quantity.inputValue();
    console.log('Quantity after 3 more minus clicks:', value);
  });

  test('add cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  });
});