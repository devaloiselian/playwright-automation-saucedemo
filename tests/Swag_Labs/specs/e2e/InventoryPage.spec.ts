// Injection for our Page Objects and Components.
import { test, expect } from '../../fixtures/BaseTest';
import { validCredentials } from '../../data/LoginData';

test.describe('Inventory Page Flow and UI Validation', () => {

  // Playwright handles the instantiation and isolation per test behind the scenes
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin(validCredentials.username, validCredentials.password);
    await expect(inventoryPage.titleHeader).toHaveText('Products');
  });

  // --- UI & Layout Validation ---
  test('The inventory page displays all structural product elements correctly', async ({ inventoryPage }) => {
    await test.step('Verify product grid and cards', async () => {
      // Validating the exact number of items expected in the grid
      await expect(inventoryPage.inventoryItems).toHaveCount(6);
      // Iterating through the grid to validate the internal structure of each card
      for (let i = 0; i < 6; i++) {
        const card = inventoryPage.getProductCardLocators(i);

        await expect(card.price).toBeVisible();
        await expect(card.price).toContainText('$');
        await expect(card.name).not.toBeEmpty();
        await expect(card.description).not.toBeEmpty();
      }
    });
  });

  test('Adding and removing a product updates the cart state dynamically', async ({ inventoryPage, header }) => {
    const productIndex = 0;
    const addToCartBtn = inventoryPage.getAddToCartButton(productIndex);
    const removeBtn = inventoryPage.getRemoveButton(productIndex);

    await test.step('Initial State Validation', async () => {
      await expect(addToCartBtn).toBeVisible();
      await expect(removeBtn).toBeHidden();
      await expect(header.cartBadge).toBeHidden();
    });

    await test.step('Add product and verify state change', async () => {
      await inventoryPage.addProductToCart(productIndex);

      await expect(addToCartBtn).toBeHidden();
      await expect(removeBtn).toBeVisible();
      await expect(header.cartBadge).toBeVisible();
      await expect(header.cartBadge).toHaveText('1');
    });

    await test.step('Remove product and verify state reverts', async () => {
      await inventoryPage.removeProductFromCart(productIndex);

      await expect(addToCartBtn).toBeVisible();
      await expect(removeBtn).toBeHidden();
      await expect(header.cartBadge).toBeHidden();
    });
  });

  // Functional Validation: Sorting & Filtering
  test('Product sort container correctly orders items by Name and Price', async ({ inventoryPage }) => {

    await test.step('Sort by Name (Z to A)', async () => {
      await inventoryPage.selectSortFilter('za');
      const currentNames = await inventoryPage.getAllProductNames();
      const expectedNames = [...currentNames].sort().reverse();
      expect(currentNames).toEqual(expectedNames);
    });

    await test.step('Sort by Name (A to Z)', async () => {
      await inventoryPage.selectSortFilter('az');
      const currentNames = await inventoryPage.getAllProductNames();
      const expectedNames = [...currentNames].sort();
      expect(currentNames).toEqual(expectedNames);
    });

    await test.step('Sort by Price (Low to High)', async () => {
      await inventoryPage.selectSortFilter('lohi');
      const currentPrices = await inventoryPage.getAllProductPrices();
      const expectedPrices = [...currentPrices].sort((a, b) => a - b);
      expect(currentPrices).toEqual(expectedPrices);
    });

    await test.step('Sort by Price (High to Low)', async () => {
      await inventoryPage.selectSortFilter('hilo');
      const currentPrices = await inventoryPage.getAllProductPrices();
      const expectedPrices = [...currentPrices].sort((a, b) => b - a);
      expect(currentPrices).toEqual(expectedPrices);
    });
  });

  // --- ROUTING & EDGE CASES ---
  test.describe('Routing & Session State', () => {

    test('Session persists when navigating back to login and forward to inventory', async ({ page, inventoryPage, loginPage }) => {
      // Action 1: User clicks the browser's "Back" button
      await page.goBack();

      // Assertion 1: User sees the login page, but the session cookie remains active
      await expect(loginPage.loginButton).toBeVisible();

      // Action 2: User clicks the browser's "Forward" button
      await page.goForward();

      // Assertion 2: User is granted access back to inventory without re-authenticating
      await expect(inventoryPage.titleHeader).toBeVisible();
      await expect(inventoryPage.titleHeader).toHaveText('Products');
    });

    test('Navigating to a random invalid URL is handled securely', async ({ page }) => {
      // Action: Force navigation to a non-existent route within the application domain
      const response = await page.goto('/invalid-random-url.html');

      // Assertion: Verify the server correctly catches the invalid route and returns a 404 Not Found status
      expect(response?.status()).toBe(404);
    });
  });

});