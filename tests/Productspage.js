export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.cartBadge = page.locator('[data-test="cart-quantity"]');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}