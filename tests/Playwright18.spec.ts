// Using Base Url for the tests   

//----- This Test uses baseUrl configured in playwright.config.ts file. The baseUrl is set to https://playwright.dev/ -----//
import { test, expect } from '@playwright/test';

test("TestCase18", async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2000);
  await expect(page.locator("body")).toContainText("Playwright enables reliable");

  await page.goto('/docs/intro');
  await page.waitForTimeout(2000);
  await expect(page.locator("body")).toContainText("Installation");
  
})