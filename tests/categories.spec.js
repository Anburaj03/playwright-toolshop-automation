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
  });

  test('Hand Tools opens its category page', async ({ page }) => {
    await page.getByRole('link', { name: 'Hand Tools' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/category/hand-tools');
  });

  test('Power Tools opens its category page', async ({ page }) => {
    await page.getByRole('link', { name: 'Power Tools' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/category/power-tools');
  });

  test('Special Tools opens its category page', async ({ page }) => {
    await page.getByRole('link', { name: 'Special Tools' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/category/special-tools');
  });

  test('Other opens its category page', async ({ page }) => {
    await page.getByRole('link', { name: 'Other' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/category/other');
  });

  test('Rental opens the rentals page', async ({ page }) => {
    await page.getByRole('link', { name: 'Rental' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/rentals');
  });
});