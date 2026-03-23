import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { HeaderComponent } from '../components/GlobalHeader';
import { FooterComponent } from '../components/GlobalFooter';

type SwagLabsFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  header: HeaderComponent;
  footer: FooterComponent;
};

export const test = base.extend<SwagLabsFixtures>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => await use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => await use(new CartPage(page)),
  checkoutInfoPage: async ({ page }, use) => await use(new CheckoutInfoPage(page)),
  checkoutOverviewPage: async ({ page }, use) => await use(new CheckoutOverviewPage(page)),
  header: async ({ page }, use) => await use(new HeaderComponent(page)),
  footer: async ({ page }, use) => await use(new FooterComponent(page)),
});

export { expect } from '@playwright/test';