import { test, expect } from '../../fixtures/BaseTest';

test.describe('Global Component - Footer Validation', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin('standard_user', 'secret_sauce');
  });
  test('Footer displays all social links and valid copyright', async ({ footer }) => {
    await test.step('Verify social media icons visibility', async () => {
      await expect(footer.twitterIcon).toBeVisible();
      await expect(footer.facebookIcon).toBeVisible();
      await expect(footer.linkedinIcon).toBeVisible();
    });

    await test.step('Verify copyright text format', async () => {
      const currentYear = new Date().getFullYear().toString();
      await expect(footer.copyrightText).toContainText(currentYear);
      await expect(footer.copyrightText).toContainText('Sauce Labs. All Rights Reserved.');
    });
  });

});