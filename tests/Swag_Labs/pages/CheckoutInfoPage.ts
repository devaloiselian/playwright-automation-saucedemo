import { Locator, Page } from '@playwright/test';

export interface CheckoutData {
  firstName?: string;
  lastName?: string;
  postalCode?: string;
}

/**
 * Page Object representing the Checkout Information step.
 * Encapsulates the shipping form and its interactions.
 */
export class CheckoutInfoPage {
  readonly page: Page;

  // Page Context Elements
  readonly titleHeader: Locator;
  readonly checkoutInfoContainer: Locator;

  // Checkout fields Elements
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCodeField: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  // Error checks
  readonly errorMessage: Locator;
  readonly closeErrorButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize Context elements
    this.titleHeader = page.locator('[data-test="title"]');
    this.checkoutInfoContainer = page.locator('#checkout_info_container');

    // Initialize Form inputs
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.postalCodeField = page.locator('[data-test="postalCode"]');

    // Initialize Buttons
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    // Initialize Error handling
    this.errorMessage = page.locator('[data-test="error"]');
    this.closeErrorButton = this.errorMessage.locator('button'); 
  }

  // --- Action Methods ---
  async fillCheckoutInfo(data: CheckoutData) {
    if (data.firstName !== undefined) await this.firstNameField.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastNameField.fill(data.lastName);
    if (data.postalCode !== undefined) await this.postalCodeField.fill(data.postalCode);
  }

  /*
   * Extracts the current values present in the input fields.
   * Crucial for State Persistence validation (Back/Forward navigation).
   */
  async getCheckoutFormData(): Promise<CheckoutData> {
    return {
      firstName: await this.firstNameField.inputValue(),
      lastName: await this.lastNameField.inputValue(),
      postalCode: await this.postalCodeField.inputValue()
    };
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}