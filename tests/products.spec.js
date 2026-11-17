import { test, expect } from '@playwright/test';

test.describe('Hand Tools products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/category/hand-tools');
    await expect(page.locator('[data-test="product-name"]').first()).toBeVisible();
  });

  test('page title', async ({ page }) => {
    await expect(page.locator('[data-test="page-title"]')).toContainText('Hand Tools');
  });

  test('product count', async ({ page }) => {
    await expect(page.locator('[data-test="product-name"]')).toHaveCount(9);
  });

  test('price format', async ({ page }) => {
    await expect(page.locator('[data-test="product-price"]').first()).toContainText('$');
  });

  test('sort name', async ({ page }) => {
    await page.locator('[data-test="sort"]').selectOption({ label: 'Name (A - Z)' });
    await expect(async () => {
      const names = (await page.locator('[data-test="product-name"]').allInnerTexts()).map(n => n.trim());
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).toEqual(sorted);
    }).toPass();
  });

  test('price low', async ({ page }) => {
    await page.locator('[data-test="sort"]').selectOption({ label: 'Price (Low - High)' });
    await expect(async () => {
      const texts = await page.locator('[data-test="product-price"]').allInnerTexts();
      const prices = texts.map(t => parseFloat(t.replace('$', '')));
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
    }).toPass();
  });

  test('price high', async ({ page }) => {
    await page.locator('[data-test="sort"]').selectOption({ label: 'Price (High - Low)' });
    await expect(async () => {
      const texts = await page.locator('[data-test="product-price"]').allInnerTexts();
      const prices = texts.map(t => parseFloat(t.replace('$', '')));
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sorted);
    }).toPass();
  });

  test('brand filter', async ({ page }) => {
    await page.getByLabel('ForgeFlex Tools').check();
    await expect(page.getByLabel('ForgeFlex Tools')).toBeChecked();
    await expect(page.locator('[data-test="product-name"]').first()).toBeVisible();
  });

  test('eco filter', async ({ page }) => {
    await page.locator('[data-test="eco-friendly-filter"]').check();
    await expect(page.locator('[data-test="eco-friendly-filter"]')).toBeChecked();
  });

  test('next page', async ({ page }) => {
    const first = page.locator('[data-test="product-name"]').first();
    const firstName = await first.innerText();
    await page.locator('[data-test="pagination-next"]').click();
    await expect(first).not.toHaveText(firstName);
  });
});