# 🧪 E2E Test Automation Architecture | Playwright & TypeScript

[![Playwright](https://img.shields.io/badge/Playwright-v1.58-2EAD33?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js)](https://nodejs.org/)

A robust, scalable, and maintainable End-to-End (E2E) automation framework built for the [SauceDemo (Swag Labs)](https://www.saucedemo.com/) web application. 

This project is designed for focusing on test stability, maintainability, and proper defect documentation.

---

## 🏗️ Architecture & Core Patterns

This framework implements several industry-standard design patterns:

* **Page Object Model (POM):** Strict separation of UI locators (`/pages`) from test business logic (`/specs`). This ensures that UI changes only require updates in one place.
* **Test Data Management (TDM):** Centralized data files (`/data`) for Data-Driven Testing (DDT). Error scenarios and user credentials are dynamically injected into the tests to avoid hardcoding.
* **Environment Abstraction:** Routing and credentials are managed via `dotenv` and a centralized `playwright.config.ts`, making the framework ready for Cross-Environment execution (Local, QA, Staging).
* **State Persistence Validation:** Tests go beyond the "Happy Path" by validating UI React states through forward/back browser navigations.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/devaloiselian/playwright-automation-saucedemo.git
cd your-repo-name
```

### 2. Install dependencies
```bash
npm install
npx playwright install --with-deps
```

### 3. Environment setup
```bash
cp .env.example .env
```

### 4. Execute the Test Suite
```bash
npm run test:headless  # Run all tests in the background (CI/CD style)
npm run test:ui        # Open the interactive Playwright UI mode
npm run test:report    # View the HTML execution report
```

## 🐞 Known Application Bugs Discovered
A key responsibility of QA is not just to automate, but to audit the product. During the implementation of this framework, the following real bugs were discovered in the SauceDemo application.

The test suite handles them gracefully (using test.fail() or dynamic state assertions) to maintain a green CI pipeline while documenting the defect:

* 🔴 **High Priority - Security/Routing:** Manipulating protected URLs behaves securely returning a 404 status code (Validated in LoginPage.spec.ts), but direct unauthenticated access to certain sub-routes exposes structural layout flaws before crashing.

* 🟡 **Medium Priority - State Management Loss:** The application destroys the local React state (clears the checkout form fields) when a user navigates 'Back' from the Overview page to the Information page using the browser controls. (Handled and asserted in CheckoutInfoPage.spec.ts).

## 📂 Project Structure
```text
├── .github/workflows/       # CI/CD Pipeline configuration (GitHub Actions)
├── tests/Swag_Labs/
│   ├── components/          # Reusable UI components (Header, Footer)
│   ├── data/                # Test Data Management (JSON/TS objects)
│   ├── docs/                # Feature requirements (BDD format)
│   ├── fixtures/            # Custom Playwright fixtures (BaseTest)
│   ├── pages/               # Page Object Model classes
│   └── specs/               # E2E test files
├── .env.example             # Template for environment variables
├── playwright.config.ts     # Global framework configuration
└── package.json             # NPM dependencies and runner scripts

## 🤝 Let's Connect!

Developed with ☕ and automated with 🤖 by @devaloiselian - Software Engineer | Full-Stack & QA Automation
If you found this repository helpful or are interested in my profile, feel free to reach out or give this repo a ⭐!