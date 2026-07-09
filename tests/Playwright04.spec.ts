//--Mouse move simulation---

import { test, expect } from '@playwright/test';

test("TestCase4", async ({ page }) => {
await page.goto("https://playwright.dev");
await page.locator('a[role="button"]').hover();
await page.waitForTimeout(2000); 
await expect(page.locator(".navbar__title")).toHaveText("Playwright");

await page.locator("//li/a[text()='Java']").click();
await page.waitForLoadState('domcontentloaded');
await page.waitForTimeout(2000); 
await expect(page.locator(".navbar__title")).toHaveText("Playwright for Java");
})