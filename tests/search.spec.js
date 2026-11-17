import { test, expect } from '@playwright/test';

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await expect(page.locator('[data-test="product-name"]').first()).toBeVisible();
  });

  test('search box', async ({ page }) => {
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.locator('[data-test="search-submit"]')).toBeVisible();
  });

  test('search hammer', async ({ page }) => {
    await page.locator('[data-test="search-query"]').fill('Hammer');
    await page.locator('[data-test="search-submit"]').click();
    await expect(page.getByText('Combination Pliers')).not.toBeVisible();
    await expect(page.getByText('Thor Hammer')).toBeVisible();
  });

  test('no result', async ({ page }) => {
    await page.locator('[data-test="search-query"]').fill('zzzzxxxx');
    await page.locator('[data-test="search-submit"]').click();
    await expect(page.locator('[data-test="product-name"]')).toHaveCount(0);
    await expect(page.getByText('There are no products found.')).toBeVisible();
  });

  test('empty search', async ({ page }) => {
    await page.locator('[data-test="search-submit"]').click();
    await expect(page.locator('[data-test="product-name"]')).toHaveCount(9);
  });

  test('search reset', async ({ page }) => {
    await page.locator('[data-test="search-query"]').fill('Hammer');
    await page.locator('[data-test="search-submit"]').click();
    await expect(page.getByText('Combination Pliers')).not.toBeVisible();
    await page.locator('[data-test="search-reset"]').click();
    await expect(page.locator('[data-test="search-query"]')).toHaveValue('');
    await expect(page.getByText('Combination Pliers')).toBeVisible();
  });

  test('special chars', async ({ page }) => {
    await page.locator('[data-test="search-query"]').fill('@#$%');
    await page.locator('[data-test="search-submit"]').click();
    await expect(page.locator('[data-test="product-name"]')).toHaveCount(0);
    await expect(page.locator('[data-test="search-query"]')).toBeVisible();
  });
});