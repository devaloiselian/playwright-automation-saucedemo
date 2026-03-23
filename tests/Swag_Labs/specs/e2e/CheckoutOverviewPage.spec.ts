import { test, expect } from '../../fixtures/BaseTest';
import { validCheckoutData } from '../../data/CheckoutData';
import { validCredentials } from '../../data/LoginData'; 

test.describe('End-to-End Purchase Flow Validation', () => {

  // Pre-condition: User has authenticated, populated the cart, and completed the shipping information step
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage, checkoutInfoPage, header }) => {
    await loginPage.navigate();
    await loginPage.performLogin(validCredentials.username, validCredentials.password);
    
    // Purchase Process
    await inventoryPage.addProductToCart(0);
    await header.cartLink.click();
    await cartPage.clickCheckout();
    
    // Use the parameterized data
    await checkoutInfoPage.fillCheckoutInfo(validCheckoutData);
    await checkoutInfoPage.clickContinue();
  });

  test.describe('Data Consistency & Mathematical Accuracy', () => {

    test('Overview page displays correct items and pricing math is accurate', async ({ checkoutOverviewPage }) => {
      
      await test.step('Verify page context and data consistency', async () => {
        await expect(checkoutOverviewPage.titleHeader).toHaveText('Checkout: Overview');
        
        // E2E Data Consistency: Verify the item hasn't mutated during the checkout process
        const item = checkoutOverviewPage.getOverviewItemLocators(0);
        await expect(item.name).toHaveText('Sauce Labs Backpack');
        await expect(item.price).toHaveText('$29.99');
        await expect(item.quantity).toHaveText('1');
      });

      await test.step('Verify the pricing logic (Subtotal + Tax = Total)', async () => {
        // Extract the numerical data from the POM
        const prices = await checkoutOverviewPage.getPricingBreakdown();

        // Business Rule 1: Since we only have 1 item, its price should equal the subtotal
        expect(prices.subtotal).toBe(29.99);

        // Business Rule 2: Cross-validation for tax calculation accuracy
        expect(prices.subtotal + prices.tax).toBeCloseTo(prices.total, 2);
      });
    });
  });

  test.describe('Order Completion Flow', () => {

    test('Successfully finishes the purchase and returns home', async ({ checkoutOverviewPage, inventoryPage, header }) => {
      
      // 1. Verificamos la página "Complete"
      await test.step('Finish the purchase and verify success screen', async () => {
        await checkoutOverviewPage.clickFinish();
        await expect(checkoutOverviewPage.titleHeader).toHaveText('Checkout: Complete!');
        await expect(checkoutOverviewPage.completeHeader).toHaveText('Thank you for your order!');
      });

      // 2. Probamos el botón "Back Home" que mencionas
      await test.step('Navigate back to inventory and verify empty cart state', async () => {
        await checkoutOverviewPage.clickBackHome();
        
        // 3. Comprobamos un elemento del home (Inventory) para confirmar la navegación
        await expect(inventoryPage.titleHeader).toHaveText('Products');
        
        // 4. Verificación de estado final: el carrito debe estar vacío
        await expect(header.cartBadge).toBeHidden();
      });
    });
  });

});