export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('[data-test="nav-cart"]');
    this.title = page.locator('[data-test="product-title"]');
    this.price = page.locator('[data-test="product-price"]');
    this.linePrice = page.locator('[data-test="line-price"]');
    this.total = page.locator('[data-test="cart-total"]');
    this.quantityBox = page.locator('[data-test="product-quantity"]');
    this.proceedButton = page.locator('[data-test="proceed-1"]');
  }

  async open() {
    await this.cartIcon.click();
  }

  async setQuantity(quantity) {
    await this.quantityBox.fill(quantity);
    await this.quantityBox.press('Tab');
  }

  async proceed() {
    await this.proceedButton.click();
  }
}