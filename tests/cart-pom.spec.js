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
  await product.addToCart();
  await expect(product.cartBadge).toHaveText('1');
  await cart.open();

  await expect(cart.title).toContainText('Combination Pliers');
  await expect(cart.price).toContainText('14.15');
  await expect(cart.total).toContainText('14.15');
});

test('cart quantity', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await home.open();
  await home.openFirstProduct();
  await product.addToCart();
  await expect(product.cartBadge).toHaveText('1');
  await cart.open();

  await cart.setQuantity('3');
  await expect(cart.linePrice).toContainText('42.45');
  await expect(cart.total).toContainText('42.45');
});