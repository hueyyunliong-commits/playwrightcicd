//recorded using codegen
import { test, expect } from '@playwright/test';

test('test13', async ({ page }) => {
  await page.goto('https://blazedemo.com/');
  await expect(page.getByRole('heading', { name: 'Welcome to the Simple Travel' })).toBeVisible();
  await expect(page.locator('select[name="fromPort"]')).toHaveValue('Paris');
  await page.locator('select[name="fromPort"]').selectOption('Mexico City');
  await page.locator('select[name="toPort"]').selectOption('Dublin');
  await page.getByRole('button', { name: 'Find Flights' }).click();
});


