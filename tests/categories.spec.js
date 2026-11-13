import { test, expect } from '@playwright/test';

test.describe('Categories menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.getByRole('button', { name: 'Categories' }).click();
  });

  test('all 5 category options are visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Hand Tools' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Power Tools' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Special Tools' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Other' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Rental' })).toBeVisible();
    await page.waitForTimeout(2000);
  });

  test('Hand Tools opens its category page', async ({ page }) => {
    await page.getByRole('link', { name: 'Hand Tools' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/category/hand-tools');
    await page.waitForTimeout(2000);
  });

  test('Power Tools opens its category page', async ({ page }) => {
    await page.getByRole('link', { name: 'Power Tools' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/category/power-tools');
    await page.waitForTimeout(2000);
  });

  test('Special Tools opens its category page', async ({ page }) => {
    await page.getByRole('link', { name: 'Special Tools' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/category/special-tools');
    await page.waitForTimeout(2000);
  });

  test('Other opens its category page', async ({ page }) => {
    await page.getByRole('link', { name: 'Other' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/category/other');
    await page.waitForTimeout(2000);
  });

  test('Rental opens the rentals page', async ({ page }) => {
    await page.getByRole('link', { name: 'Rental' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/rentals');
    await page.waitForTimeout(2000);
  });
});