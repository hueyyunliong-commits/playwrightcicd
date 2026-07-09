//--My First Playwright Spec File --

import { test, expect } from '@playwright/test';

test("TestCase1", async ({ page }) => {
// 1. Opens the browser and navigates to Google's homepage
await page.goto("https://www.google.com/");
// 2. Asserts (verifies) that the browser tab title is exactly "Google"
await expect(page).toHaveTitle("Google");

// 3. Pauses the test execution completely for 3 seconds (3000 milliseconds)
await page.waitForTimeout(3000);

})