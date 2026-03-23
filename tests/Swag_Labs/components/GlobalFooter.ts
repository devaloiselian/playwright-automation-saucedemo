import { Locator, Page } from '@playwright/test';

export class FooterComponent {
  readonly page: Page;
  readonly twitterIcon: Locator;
  readonly facebookIcon: Locator;
  readonly linkedinIcon: Locator;
  readonly copyrightText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.twitterIcon = page.locator('[data-test="social-twitter"]');
    this.facebookIcon = page.locator('[data-test="social-facebook"]');
    this.linkedinIcon = page.locator('[data-test="social-linkedin"]');
    this.copyrightText = page.locator('[data-test="footer-copy"]');
  }
}