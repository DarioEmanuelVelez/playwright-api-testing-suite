import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    /* URL base para todos los endpoints del proyecto */
    baseURL: 'https://restful-booker.herokuapp.com',

    /* Captura trazas solo si un test falla */
    trace: 'on-first-retry',
  },

  /* Un solo proyecto dedicado exclusivamente a llamadas HTTP */
  projects: [
    {
      name: 'api-tests',
    },
  ],
});