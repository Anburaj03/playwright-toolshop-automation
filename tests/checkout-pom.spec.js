import { test, expect } from '@playwright/test';
import { HomePage } from './Homepage.js';
import { ProductPage } from './Productspage.js';
import { CartPage } from './Cartpage.js';
import { CheckoutPage } from './checkoutpage.js';

test('wrong login', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await home.open();
  await home.openFirstProduct();
  await product.addToCart();
  await expect(product.cartBadge).toHaveText('1');
  await cart.open();
  await cart.proceed();

  await checkout.login('wrong@example.com', 'WrongPass123');
  await expect(checkout.loginError).toBeVisible();
});

test('guest to payment', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await home.open();
  await home.openFirstProduct();
  await product.addToCart();
  await expect(product.cartBadge).toHaveText('1');
  await cart.open();
  await cart.proceed();

  await checkout.guestDetails(`guest${Date.now()}@example.com`, 'Anbu', 'Raj');
  await checkout.billingDetails('India', '600001', '42', 'Chennai', 'Tamil Nadu');
  await expect(checkout.paymentMethod).toBeVisible();
});