//--Validating text box existence & it's visibility

import { test, expect } from '@playwright/test';

test("TestCase2", async ({ page }) => {
await page.goto("https://www.google.com/");
let searchBox = await page.locator("css=#APjFqb")
await searchBox.highlight();
await expect(searchBox).toBeEnabled();
await expect(searchBox).toBeVisible();
await expect(searchBox).toHaveCount(1);
await page.waitForTimeout(3000);
})