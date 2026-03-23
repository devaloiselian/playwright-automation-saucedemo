import { test, expect } from '../../fixtures/BaseTest';

test.describe('Global Component - Header & Navigation', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin('standard_user', 'secret_sauce');
  });

  test('Hamburger menu opens and displays correctly', async ({ header }) => {
    await header.openMenu();
    
    // Verify the menu has 4 options
    await expect(header.menuItemList).toHaveCount(4);
    
    // Verify text key
    const expectedOptions = ['All Items', 'About', 'Logout', 'Reset App State'];
    await expect(header.menuItemList).toHaveText(expectedOptions);
  });
});