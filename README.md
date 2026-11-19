# Toolshop Test Automation

![Playwright Tests](https://github.com/Anburaj03/playwright-toolshop-automation/actions/workflows/playwright.yml/badge.svg)

Automation testing project for [Practice Software Testing - Toolshop](https://practicesoftwaretesting.com), built with **Playwright (JavaScript)**.

## Tech Stack
- JavaScript
- Playwright Test
- Cucumber (BDD)
- Page Object Model (POM)
- Data-Driven Testing (JSON)
- Git, GitHub, GitHub Actions
- HTML reports

## Features
- **Page Object Model**: cart, checkout and payment flows use page classes (`Homepage.js`, `Productspage.js`, `Cartpage.js`, `checkoutpage.js`).
- **Data-driven tests**: search tests read their data from `TestData/search.json`.
- **Cucumber (BDD)**: feature files for search and login with step definitions.
- **Positive, negative and boundary tests**: for example empty login, wrong login, minimum quantity.
- **Manual testing**: test cases and bug report in an Excel file.
- **CI**: GitHub Actions runs all Playwright tests on every push to `main`.

## What is covered
- Home, Categories, Products, Product details
- Search (positive, negative, special characters)
- Register and Login
- Contact form
- Cart, Checkout (guest flow), Billing address
- Payment methods

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

## Challenges and fixes
- **Out-of-stock products**: some products were out of stock, so the Add to Cart button was disabled and tests failed. Tests now pick the first in-stock product and read the name and price from the page instead of hardcoding them.
- **Case-sensitive file names**: an import worked on Windows but failed on GitHub Actions (Linux) because the file name case was different. Fixed the import.
- **Slow site on CI**: increased timeouts in `playwright.config.js` and removed hard waits (`waitForTimeout`) in favour of Playwright auto-waiting assertions.

## Notes
- Tests run against a live public demo site, so test data (like product stock) can change.

## Author
J. Anburaj | [GitHub](https://github.com/Anburaj03) | [LinkedIn](https://linkedin.com/in/anburaj-j-a6565232a)