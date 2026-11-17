import { test, expect } from '@playwright/test';
import { HomePage } from './Homepage.js';
import { ProductPage } from './Productspage.js';
import { CartPage } from './Cartpage.js';

test.describe.configure({ mode: 'serial' });

test('cart item', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await home.open();
  await home.openFirstProduct();

  // Product page-la peyar, price edukkurom
  const name = (await product.productName.first().innerText()).trim();
  const price = (await page.locator('[data-test="unit-price"]').innerText()).replace('$', '').trim();

  await product.addToCart();
  await expect(product.cartBadge).toHaveText('1');
  await cart.open();

  await expect(cart.title).toContainText(name);
  await expect(cart.price).toContainText(price);
  await expect(cart.total).toContainText(price);
});

test('cart quantity', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await home.open();
  await home.openFirstProduct();

  // Price edukkurom, 3 kaal total kanakku
  const price = (await page.locator('[data-test="unit-price"]').innerText()).replace('$', '').trim();
  const total = (Number(price) * 3).toFixed(2);

  await product.addToCart();
  await expect(product.cartBadge).toHaveText('1');
  await cart.open();

  await cart.setQuantity('3');
  await expect(cart.linePrice).toContainText(total);
  await expect(cart.total).toContainText(total);
});