import { test, expect } from '@playwright/test';
import { HomePage } from './Homepage.js';
import { ProductPage } from './Productspage.js';
import { CartPage } from './Cartpage.js';
import { CheckoutPage } from './checkoutpage.js';

async function goToPayment(page) {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await home.open();
  await page.waitForTimeout(1000);
  await home.openFirstProduct();
  await page.waitForTimeout(1500);
  await product.addToCart();
  await cart.open();
  await expect(cart.quantityBox).toHaveValue('1');
  await page.waitForTimeout(1500);
  await cart.proceed();
  await page.waitForTimeout(1500);
  await checkout.guestDetails(`guest${Date.now()}@example.com`, 'Anbu', 'Raj');
  await page.waitForTimeout(2000);
  await checkout.billingDetails('India', '600001', '42', 'Chennai', 'Tamil Nadu');
  await expect(checkout.paymentMethod).toBeVisible();
  await page.waitForTimeout(2000);
  return checkout;
}

test('payment methods', async ({ page }) => {
  const checkout = await goToPayment(page);

  // 1. Ella options-um irukka
  await expect(checkout.paymentMethod).toContainText('Bank Transfer');
  await expect(checkout.paymentMethod).toContainText('Cash on Delivery');
  await expect(checkout.paymentMethod).toContainText('Credit Card');
  await expect(checkout.paymentMethod).toContainText('Buy Now Pay Later');
  await expect(checkout.paymentMethod).toContainText('Gift Card');

  // 2. Credit Card
  await checkout.paymentMethod.selectOption({ label: 'Credit Card' });
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-test="credit_card_number"]')).toBeVisible();
  await expect(page.locator('[data-test="expiration_date"]')).toBeVisible();
  await expect(page.locator('[data-test="cvv"]')).toBeVisible();
  await expect(page.locator('[data-test="card_holder_name"]')).toBeVisible();

  // 3. Buy Now Pay Later
  await checkout.paymentMethod.selectOption({ label: 'Buy Now Pay Later' });
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-test="monthly_installments"]')).toBeVisible();
  await expect(page.locator('[data-test="monthly_installments"]')).toContainText('12 Monthly Installments');
  await expect(page.locator('[data-test="finish"]')).toBeDisabled();

  // 4. Gift Card
  await checkout.paymentMethod.selectOption({ label: 'Gift Card' });
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-test="gift_card_number"]')).toBeVisible();
  await expect(page.locator('[data-test="validation_code"]')).toBeVisible();
  await expect(page.locator('[data-test="finish"]')).toBeDisabled();

  // 5. Bank Transfer
  await checkout.paymentMethod.selectOption({ label: 'Bank Transfer' });
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-test="bank_name"]')).toBeVisible();
  await expect(page.locator('[data-test="account_name"]')).toBeVisible();
  await expect(page.locator('[data-test="account_number"]')).toBeVisible();
  await expect(page.locator('[data-test="finish"]')).toBeDisabled();

  await page.locator('[data-test="bank_name"]').fill('Test Bank');
  await page.locator('[data-test="account_name"]').fill('Anbu Raj');
  await page.locator('[data-test="account_number"]').fill('1234567890');
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-test="finish"]')).toBeEnabled();
});

test('cash delivery', async ({ page }) => {
  const checkout = await goToPayment(page);
  await checkout.paymentMethod.selectOption({ label: 'Cash on Delivery' });
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-test="finish"]')).toBeEnabled();

  await page.locator('[data-test="finish"]').click();
  await page.waitForTimeout(2000);
  await expect(page.getByText('Payment was successful')).toBeVisible();
  await page.screenshot({ path: 'order-result.png', fullPage: true });
});