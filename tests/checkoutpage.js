import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Sign in step
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.loginError = page.getByText('Invalid email or password');

    // Guest
    this.guestTab = page.getByRole('tab', { name: 'Continue as Guest' });
    this.guestEmail = page.locator('[data-test="guest-email"]');
    this.guestFirstName = page.locator('[data-test="guest-first-name"]');
    this.guestLastName = page.locator('[data-test="guest-last-name"]');
    this.guestSubmit = page.locator('[data-test="guest-submit"]');
    this.guestProceed = page.locator('[data-test="proceed-2-guest"]');

    // Billing
    this.country = page.locator('[data-test="country"]');
    this.postalCode = page.locator('[data-test="postal_code"]');
    this.houseNumber = page.locator('[data-test="house_number"]');
    this.street = page.locator('[data-test="street"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.billingProceed = page.locator('[data-test="proceed-3"]');

    // Payment
    this.paymentMethod = page.locator('[data-test="payment-method"]');
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async guestDetails(email, firstName, lastName) {
    await this.guestTab.click();
    await this.guestEmail.fill(email);
    await this.guestFirstName.fill(firstName);
    await this.guestLastName.fill(lastName);
    await this.guestSubmit.click();
    await this.guestProceed.click();
  }

  async billingDetails(country, postalCode, houseNumber, city, state) {
    await this.country.selectOption({ label: country });
    await this.postalCode.fill(postalCode);
    await this.houseNumber.fill(houseNumber);
    await expect(this.street).not.toHaveValue('');
    await this.city.fill(city);
    await this.state.fill(state);
    await this.billingProceed.click();
  }
}