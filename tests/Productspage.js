import { expect } from '@playwright/test';

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('[data-test="product-name"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.cartBadge = page.locator('[data-test="cart-quantity"]');
  }

  async addToCart() {
    await expect(this.productName.first()).toBeVisible();
    await this.addToCartButton.click();
    await expect(this.cartBadge).toBeVisible({ timeout: 15000 });
  }
}