import { Locator, Page } from '@playwright/test';

/*
 * Page Object Model for the Login Page.
 * Encapsulates all locators and user interactions specific to the authentication view.
 */
export class LoginPage {
  readonly page: Page;
  
  // Core UI Elements
  readonly logo: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  
  // Error handling elements
  readonly errorMessage: Locator;
  readonly closeErrorButton: Locator;

  // Helper banners (Informational)
  readonly credentialsBanner: Locator;
  readonly passwordBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.login_logo');
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    
    this.errorMessage = page.locator('[data-test="error"]');
    this.closeErrorButton = page.locator('[data-test="error-button"]');

    this.credentialsBanner = page.locator('#login_credentials');
    this.passwordBanner = page.locator('.login_password');
  }

  // Navigates to the default base URL defined in playwright.config.ts
  async navigate() {
    await this.page.goto('/');
  }

  /**
   * Executes the complete authentication sequence.
   * @param user - The username credential
   * @param password - The password credential
   */
  async performLogin(user: string, password: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}