# Toolshop Test Automation

Automation testing project for [Practice Software Testing - Toolshop](https://practicesoftwaretesting.com), built with **Playwright (JavaScript)**.

## Tech Stack
- JavaScript
- Playwright Test
- Cucumber (BDD)
- Page Object Model (POM)
- Data-Driven Testing (JSON)
- Git, GitHub, GitHub Actions
- HTML reports

## What is covered
- Home, Categories, Products, Product details
- Search (positive, negative, special characters)
- Register and Login
- Contact form
- Cart, Checkout (guest flow), Billing address
- Payment methods
- Manual test cases and bug report (Excel)

## Project Structure
```
tests/            Playwright test files and page objects
features/         Cucumber feature files and step definitions
TestData/         JSON test data and manual testing Excel
.github/workflows GitHub Actions workflow
playwright.config.js
cucumber.cjs
```

## How to run

Install:
```
npm install
```

Run all Playwright tests:
```
npx playwright test
```

Run one file:
```
npx playwright test cart.spec.js --reporter=list
```

Run with browser visible:
```
npx playwright test cart.spec.js --headed
```

Run Cucumber (BDD) tests:
```
npx cucumber-js
```

Open the HTML report:
```
npx playwright show-report
```

## Continuous Integration
GitHub Actions runs all Playwright tests on every push to `main`.

## Notes
- Tests run against a live public demo site, so test data (like product stock) can change.
- Tests skip out-of-stock products so that Add to Cart always works.