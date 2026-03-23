import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly burgerMenuBtn: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuItemList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuItemList = page.locator('.bm-item-list a');
  }

  async openMenu() {
    await this.burgerMenuBtn.click();
  }
}