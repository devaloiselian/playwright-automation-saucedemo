import { Locator, Page } from '@playwright/test';

/*
 * Page Object representing the Inventory/Products view. 
 * Isolates UI locators and page interactions from test logic.
 */
export class InventoryPage {
  readonly page: Page;

  // Header elements specific to this view
  readonly titleHeader: Locator;

  // Filter elements
  readonly sortDropdown: Locator;
  readonly activeSortOption: Locator;

  // Product list elements
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize Page Title
    this.titleHeader = page.locator('[data-test="title"]');

    // Initialize Filter locators
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.activeSortOption = page.locator('[data-test="active-option"]');

    // Initialize Body elements
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  /**
   * Returns specific sub-locators for a given product card.
   * We return Locators instead of asserting here to maintain pure POM architecture.
   * @param index - The zero-based index of the product card in the grid.
   */
  getProductCardLocators(index: number) {
    const productCard = this.inventoryItems.nth(index);
    return {
      name: productCard.locator('[data-test="inventory-item-name"]'),
      description: productCard.locator('[data-test="inventory-item-desc"]'),
      price: productCard.locator('[data-test="inventory-item-price"]')
    };
  }

  /**
   * Filter Methods
   * Selects an option from the product sorting dropdown.
   * @param value - The strict string value representing the sort criteria.
   */
  async selectSortFilter(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }

  /**
   * Data Extraction Methods (For Sorting Validation)
   * Extracts all product names from the current grid.
   * @returns Array of product name strings.
   */
  async getAllProductNames(): Promise<string[]> {
    return await this.inventoryItems.locator('[data-test="inventory-item-name"]').allInnerTexts();
  }

  /**
   * Extracts and formats all product prices from the current grid.
   * Strips the '$' sign and converts strings to numerical values for strict math assertions.
   * @returns Array of product prices as numbers.
   */
  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItems.locator('[data-test="inventory-item-price"]').allInnerTexts();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  // --- Product Grid Interaction Methods ---
  getAddToCartButton(index: number) {
    return this.inventoryItems.nth(index).locator('[data-test^="add-to-cart"]');
  }
  getRemoveButton(index: number) {
    return this.inventoryItems.nth(index).locator('[data-test^="remove"]');
  }
  async addProductToCart(index: number) {
    await this.getAddToCartButton(index).click();
  }
  async removeProductFromCart(index: number) {
    await this.getRemoveButton(index).click();
  }
}