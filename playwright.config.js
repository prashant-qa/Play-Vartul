
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Tests एका file मध्ये parallel चालणार नाहीत
  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  // Failed tests पुन्हा run होतील
  retries: process.env.CI ? 2 : 1,

  // Controlled parallel execution
  workers: process.env.CI ? 1 : 2,

  // Terminal + HTML report
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  // Default test timeout: 2 minutes
  timeout: 120000,

  // Expect assertion timeout
  expect: {
    timeout: 10000,
  },

  use: {
    trace: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 60000,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
