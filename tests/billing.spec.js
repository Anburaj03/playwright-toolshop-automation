import { test, expect } from '@playwright/test';

test('billing form', async ({ page }) => {
  // Home page open, product select, cart-ku add
  await page.goto('https://practicesoftwaretesting.com');
  await page.locator('[data-test="product-name"]').first().click();
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');

  // Cart page, Proceed click
  await page.locator('[data-test="nav-cart"]').click();
  await page.locator('[data-test="proceed-1"]').click();

  // Guest details fill pannu
  await page.getByRole('tab', { name: 'Continue as Guest' }).click();
  await page.locator('[data-test="guest-email"]').fill(`guest${Date.now()}@example.com`);
  await page.locator('[data-test="guest-first-name"]').fill('Anbu');
  await page.locator('[data-test="guest-last-name"]').fill('Raj');
  await page.locator('[data-test="guest-submit"]').click();
  await page.locator('[data-test="proceed-2-guest"]').click();
  await expect(page.locator('[data-test="proceed-3"]')).toBeVisible();

  // Billing form check
  await expect(page.locator('[data-test="country"]')).toBeVisible();
  await expect(page.locator('[data-test="postal_code"]')).toBeVisible();
  await expect(page.locator('[data-test="house_number"]')).toBeVisible();
  await expect(page.locator('[data-test="street"]')).toBeVisible();
  await expect(page.locator('[data-test="city"]')).toBeVisible();
  await expect(page.locator('[data-test="state"]')).toBeVisible();

  // Fields kaali-ya irukkum podhu button disabled
  await expect(page.locator('[data-test="proceed-3"]')).toBeDisabled();
});

test('billing flow', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.locator('[data-test="product-name"]').first().click();
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  await page.locator('[data-test="nav-cart"]').click();
  await page.locator('[data-test="proceed-1"]').click();

  await page.getByRole('tab', { name: 'Continue as Guest' }).click();
  await page.locator('[data-test="guest-email"]').fill(`guest${Date.now()}@example.com`);
  await page.locator('[data-test="guest-first-name"]').fill('Anbu');
  await page.locator('[data-test="guest-last-name"]').fill('Raj');
  await page.locator('[data-test="guest-submit"]').click();
  await page.locator('[data-test="proceed-2-guest"]').click();
  await expect(page.locator('[data-test="proceed-3"]')).toBeVisible();

  // Billing address fill pannu
  await page.locator('[data-test="country"]').selectOption({ label: 'India' });
  await page.locator('[data-test="postal_code"]').fill('600001');
  await page.locator('[data-test="house_number"]').fill('42');
  await expect(page.locator('[data-test="street"]')).not.toHaveValue('');
  await page.locator('[data-test="city"]').fill('Chennai');
  await page.locator('[data-test="state"]').fill('Tamil Nadu');

  // Button enable aagi, Payment step-ku pogudha
  await expect(page.locator('[data-test="proceed-3"]')).toBeEnabled();
  await page.locator('[data-test="proceed-3"]').click();
  await expect(page.locator('[data-test="payment-method"]')).toBeVisible();

  await page.screenshot({ path: 'payment-step.png', fullPage: true });
  const text = await page.locator('body').innerText();
  console.log('Payment step text:', text.slice(0, 1000));
});