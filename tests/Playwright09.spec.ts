//--javascript alers---

import { test, expect } from '@playwright/test';

test("TestCase9", async ({ page }) => {
await page.goto("https://blazedemo.com");
await page.waitForTimeout(2000);

await page.selectOption('select[name="fromPort"]', 'Paris');
await page.selectOption('select[name="toPort"]', 'London');
await page.click('input[type="submit"]');

await page.waitForTimeout(2000);
const flightRows = page.locator('table tbody tr');

await expect(flightRows).toHaveCount(5);
await page.waitForTimeout(2000); 

});

