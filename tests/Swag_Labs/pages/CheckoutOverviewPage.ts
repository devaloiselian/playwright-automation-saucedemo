import { Locator, Page } from '@playwright/test';

/*
 * Page Object representing the Checkout Overview and Complete steps.
 * Handles final pricing validation and order submission.
 */
export class CheckoutOverviewPage {
  readonly page: Page;

  // Overview Elements
  readonly titleHeader: Locator;
  readonly cartItems: Locator;

  // Pricing Elements
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  // Action Buttons
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  // Complete Page Elements
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize Header elements
    this.titleHeader = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');

    // Initialize Price elements
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');

    // Initialize Buttons
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    // Initialize Complete Page elements (Success screen)
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /*
   * Locators Extraction
   * Returns specific sub-locators for a given item in the overview list.
   * Used for Data Consistency validation across the E2E flow.
   */
  getOverviewItemLocators(index: number) {
    const item = this.cartItems.nth(index);
    return {
      name: item.locator('[data-test="inventory-item-name"]'),
      description: item.locator('[data-test="inventory-item-desc"]'),
      price: item.locator('[data-test="inventory-item-price"]'),
      quantity: item.locator('[data-test="item-quantity"]')
    };
  }

  /*
   * Data Extraction Methods
   * Extracts and parses the pricing summary into numbers for mathematical validation.
   * Strips non-numeric characters (like '$' or text).
   */
  async getPricingBreakdown() {
    const subtotalText = await this.subtotalLabel.innerText();
    const taxText = await this.taxLabel.innerText();
    const totalText = await this.totalLabel.innerText();

    // Regex extraction to safely get only the float numbers from the string
    return {
      subtotal: parseFloat(subtotalText.replace(/[^0-9.-]+/g, "")),
      tax: parseFloat(taxText.replace(/[^0-9.-]+/g, "")),
      total: parseFloat(totalText.replace(/[^0-9.-]+/g, ""))
    };
  }

  // --- Action Methods ---
  async clickFinish() {
    await this.finishButton.click();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}