import { test, expect } from '@playwright/test';
import fs from 'fs';

const searchData = JSON.parse(fs.readFileSync('TestData/search.json', 'utf-8'));

for (const item of searchData) {
  test(`search ${item.term}`, async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.locator('[data-test="search-query"]').fill(item.term);
    await page.locator('[data-test="search-submit"]').click();
    await expect(page.getByText(item.hidden)).not.toBeVisible();
    await expect(page.getByText(item.visible)).toBeVisible();
  });
}