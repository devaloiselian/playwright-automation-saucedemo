import { test, expect } from '../../fixtures/BaseTest';
import { validCredentials, loginErrorScenarios, expectedUsersList } from '../../data/LoginData';

test.describe('Login Page - UI and Functional Validation', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test.describe('UI Components Visibility', () => {

    test('Header logo is visible and contains correct text', async ({ loginPage }) => {
      await expect(loginPage.logo).toBeVisible();
      await expect(loginPage.logo).toHaveText('Swag Labs');
    });

    test('Form elements are visible and enabled', async ({ loginPage }) => {
      const formElements = [
        { name: 'Username input', locator: loginPage.usernameInput },
        { name: 'Password input', locator: loginPage.passwordInput },
        { name: 'Login button', locator: loginPage.loginButton }
      ];
      for (const element of formElements) {
        await test.step(`Checking ${element.name}`, async () => {
          await expect(element.locator).toBeVisible();
          await expect(element.locator).toBeEnabled();
        });
      }
    });

    test('Helper texts display correct users and passwords', async ({ loginPage }) => {
      await expect(loginPage.credentialsBanner).toBeVisible();
      for (const name of expectedUsersList) {
        await expect(loginPage.credentialsBanner).toContainText(name);
      }
      await expect(loginPage.passwordBanner).toBeVisible();
      await expect(loginPage.passwordBanner).toContainText(validCredentials.password);
    });
  });

  // DATA-DRIVEN ERROR SCENARIOS
  test.describe('Functional Validation - Errors', () => {

    for (const scenario of loginErrorScenarios) {
      test(`Shows error and close button works when ${scenario.description}`, async ({ loginPage }) => {
        await loginPage.performLogin(scenario.user, scenario.password);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(scenario.expectedError);
        await loginPage.closeErrorButton.click();
        await expect(loginPage.errorMessage).toBeHidden();
      });
    }
  });

  // HAPPY PATH
  test.describe('Functional Validation - Success', () => {

    test('Successful login navigates to Inventory Page', async ({ loginPage, inventoryPage }) => {
      await loginPage.performLogin(validCredentials.username, validCredentials.password);
      await expect(inventoryPage.titleHeader).toBeVisible();
      await expect(inventoryPage.titleHeader).toHaveText('Products');
      await expect(loginPage.loginButton).toBeHidden();
    });
  });

  // SECURITY & EDGE SCENARIOS
  test.describe('Security & Edge Cases', () => {

    test('Cannot bypass login by directly navigating to the inventory URL', async ({ page, loginPage }) => {
      // ACTION: Attempt to access a protected route directly without authentication
      await page.goto('/inventory.html');
      // ASSERTION: Verify the application blocks access and shows the authorization error
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
    });

    test('URL manipulation is handled securely', async ({ page, loginPage }) => {
      // ACTION: Attempt to access a non-existent or manipulated protected route
      const response = await page.goto('/inventory.html0');
      // ASSERTION: Verify the application correctly handles the invalid route 
      expect(response?.status()).toBe(404);
    });

    test('Session is securely destroyed after logout preventing "Back" button access', async ({ page, loginPage, inventoryPage }) => {
      // SETUP: Perform a valid login
      await loginPage.performLogin(validCredentials.username, validCredentials.password);
      await expect(inventoryPage.titleHeader).toBeVisible();
      // ACTION: Perform logout (Using raw locators here as it's a cross-page boundary test)
      await page.locator('#react-burger-menu-btn').click();
      await page.locator('#logout_sidebar_link').click();
      // Verify we successfully returned to the login page
      await expect(loginPage.loginButton).toBeVisible();
      // ACTION: Attempt to go back to the protected inventory page via browser history
      await page.goBack();
      // ASSERTION: Verify the user is blocked and session is strictly enforced
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText("Epic sadface: You can only access");
    });
  });
});