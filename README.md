# Playwright Toolshop Automation

End-to-end test automation project for the practice e-commerce site https://practicesoftwaretesting.com, built with Playwright and JavaScript.

## Tech used
- Playwright Test (`@playwright/test`), JavaScript, Node.js
- Page Object Model (POM)
- Data-driven testing (JSON test data)
- HTML report, screenshots, VS Code, Git, GitHub
- Manual test cases and bug report in Excel

## Modules covered
Home, Contact, Login, Register, Categories, Products (sort, filter, pagination), Search, Product details, Cart, Checkout (guest and billing), Payment.

## Project structure
```
tests/        Test files (*.spec.js) and page objects
TestData/     search.json (test data), Toolshop_Manual_Testing.xlsx (manual test cases, bug report)
playwright.config.js
```

## How to run
```
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

Run one file:
```
npx playwright test cart-pom.spec.js
```

## Manual testing
`TestData/Toolshop_Manual_Testing.xlsx` has a summary, test cases for each module and a bug report.

## In progress
- Cucumber (BDD) example
- GitHub Actions run