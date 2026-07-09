//--pop up---

import { test, expect } from '@playwright/test';

test("TestCase6", async ({ page }) => {
await page.goto("https://playwright.dev");
await page.waitForTimeout(2000);

await page.locator('a[aria-label="GitHub repository"]').click();
let popup = await page.waitForEvent('popup');
await popup.waitForLoadState();
await popup.waitForTimeout(2000);
await expect(popup.locator("h1.heading-element")).toBeVisible();
await popup.close();

await page.waitForTimeout(2000);
})