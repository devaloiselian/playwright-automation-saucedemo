import { Locator, Page } from '@playwright/test';

/*
 * Page Object representing the Shopping Cart view (cart.html).
 * Encapsulates elements and actions for reviewing selected products.
 */
export class CartPage {
  readonly page: Page;
  
  // Page Context Elements
  readonly titleHeader: Locator;
  
  // Cart Contents Elements
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize Page context
    this.titleHeader = page.locator('[data-test="title"]');

    // Initialize Cart Contents elements
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Dynamic Locator Extaction
   * Returns specific sub-locators for a given item in the cart.
   * Groups all element queries into a single object for cleaner Spec assertions.
   * @param index - The zero-based index of the item in the cart list.
   */
  getCartItemLocators(index: number) {
    const cartItem = this.cartItems.nth(index);
    return {
      quantity: cartItem.locator('[data-test="item-quantity"]'),
      name: cartItem.locator('[data-test="inventory-item-name"]'),
      description: cartItem.locator('[data-test="inventory-item-desc"]'),
      price: cartItem.locator('[data-test="inventory-item-price"]'),
      removeButton: cartItem.locator('[data-test^="remove"]')
    };
  }

  // --- Action Methods ---
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}