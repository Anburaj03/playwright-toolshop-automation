export class HomePage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productNames = page.locator('[data-test="product-name"]');
  }

  async open() {
    await this.page.goto('https://practicesoftwaretesting.com');
  }

  async search(term) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }

  async openFirstProduct() {
    await this.productNames.filter({ hasNotText: 'Pliers' }).first().click();
  }
}