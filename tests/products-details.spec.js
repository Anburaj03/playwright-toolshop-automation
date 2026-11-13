import { test, expect } from '@playwright/test';

test.describe('Product page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.locator('[data-test="product-name"]').first().click();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });

  test('details', async ({ page }) => {
    await expect(page.locator('[data-test="product-name"]').first()).toHaveText('Combination Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
    await expect(page.locator('[data-test="product-description"]')).toContainText(/combination pliers/i);
    await expect(page.locator('[data-test="product-specs"]')).toContainText('Chrome Vanadium Steel');
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
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'after-add-to-cart.png', fullPage: true });
    const dataTests = await page.locator('[data-test]').evaluateAll(els =>
      [...new Set(els.map(e => e.getAttribute('data-test')))]
    );
    const text = await page.locator('body').innerText();
    console.log('After add to cart, data-test:', dataTests.join(', '));
    console.log('After add to cart, text:', text.slice(0, 600));
  });
});