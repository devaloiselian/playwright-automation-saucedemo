import { test, expect } from '../../fixtures/BaseTest';
import { validCredentials } from '../../data/LoginData';

test.describe('Cart Page - Functional & Boundary Validation', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin(validCredentials.username, validCredentials.password);
  });

  // --- CROSS-PAGE E2E FLOW ---
  test('E2E: Item details perfectly match between Inventory and Cart', async ({ inventoryPage, cartPage, header }) => {
    const targetIndex = 0;

    // 1. State Extraction using the new pure POM method
    const targetCard = inventoryPage.getProductCardLocators(targetIndex);
    const expectedName = await targetCard.name.innerText();
    const expectedDesc = await targetCard.description.innerText();
    const expectedPrice = await targetCard.price.innerText();

    // 2. Action: Add item and navigate to Cart
    await test.step('Add item and navigate to Cart', async () => {
      await inventoryPage.addProductToCart(targetIndex);
      await header.cartLink.click();
      await expect(cartPage.titleHeader).toHaveText('Your Cart');
    });

    // 3. Cross-Validation using the new getCartItemLocators
    await test.step('Verify all item details match the selected product', async () => {
      await expect(cartPage.cartItems).toHaveCount(1);
      
      const cartItem = cartPage.getCartItemLocators(0);
      
      // Dynamic validations (Resistant to database changes)
      await expect(cartItem.name).toHaveText(expectedName);
      await expect(cartItem.description).toHaveText(expectedDesc);
      await expect(cartItem.price).toHaveText(expectedPrice);
      
      // Static validations
      await expect(cartItem.quantity).toHaveText('1');
      await expect(cartItem.removeButton).toBeVisible();
    });
  });

  // --- BOUNDARY & STATE ---
  test.describe('Cart Capacity and Data Destruction', () => {

    test('Boundary: User can add all available catalog items to the cart (Max Capacity)', async ({ inventoryPage, header, cartPage }) => {
      await test.step('Add all 6 items from the inventory', async () => {
        for (let i = 0; i < 6; i++) {
          await inventoryPage.addProductToCart(i);
        }
        await expect(header.cartBadge).toHaveText('6');
      });

      await test.step('Navigate to cart and verify rendering of all items', async () => {
        await header.cartLink.click();
        await expect(cartPage.cartItems).toHaveCount(6);
      });
    });

    test('Data Destruction: User can completely clear a full cart', async ({ inventoryPage, header, cartPage }) => {
      for (let i = 0; i < 3; i++) {
        await inventoryPage.addProductToCart(i);
      }
      await header.cartLink.click();
      await expect(cartPage.cartItems).toHaveCount(3);

      await test.step('Remove all items one by one', async () => {
        // We always remove the 0th index because as we remove an item, the list shifts up
        for (let i = 0; i < 3; i++) {
          const firstItem = cartPage.getCartItemLocators(0);
          await firstItem.removeButton.click();
        }
      });

      await test.step('Verify empty state of the cart and header badge', async () => {
        await expect(cartPage.cartItems).toHaveCount(0);
        await expect(header.cartBadge).toBeHidden();
      });
    });
  });

  // --- ROUTING & SECURITY ---
  test.describe('Routing & Access Control', () => {

    test('Security: Cannot access the cart page directly without an active session', async ({ page, loginPage }) => {
      // 1. Setup: Clear cookies to simulate an unauthenticated user or expired session
      await page.context().clearCookies();

      // 2. Action: Force navigation directly to the cart route
      await page.goto('/cart.html');

      // 3. Assertion: Verify the system blocks access and redirects to an error state
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText("Epic sadface: You can only access '/cart.html' when you are logged in.");
    });

    test('Routing: Manipulating the cart URL returns a 404 gracefully', async ({ page }) => {
      // Action: Append malicious or incorrect characters to the valid route
      const response = await page.goto('/cart.html-hacked');
      
      // Assertion: The server handles it safely
      expect(response?.status()).toBe(404);
    });
  });

});