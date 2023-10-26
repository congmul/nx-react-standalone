import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('heading', { name: 'Welcome', exact: true }).click();
  await page.getByRole('heading', { name: 'Welcome to Ui!' }).click();
  await page.getByRole('heading', { name: 'Welcome to Dashboard!' }).click();
});