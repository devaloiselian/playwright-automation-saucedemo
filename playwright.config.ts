import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * Required for secure credential management via .env
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* ARCHITECTURE FIX: Pointing to the correct directory where our tests reside */
  testDir: './tests/Swag_Labs/specs', 
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined, // Aumentado para mayor velocidad en CI
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. */
  use: {
    /* ARCHITECTURE UPDATE: Global Base URL defined. 
       Now all page.goto('/') calls will automatically resolve to this domain. */
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    /* CI/CD Debugging Artifacts: Essential for troubleshooting remote executions */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers (Cross-Browser Testing) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
   /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});
