//--Amazon search vaidation---

import { test, expect } from '@playwright/test';

test("TestCase3", async ({ page }) => {
await page.goto("https://www.amazon.com");
await page.locator("#searchDropdownBox").selectOption({label:"Electronics"})
await page.locator("#twotabsearchtextbox").fill("hp laptop");
await page.locator("#nav-search-submit-button").click();
await page.waitForTimeout(3000);
await page.screenshot({path:"amazonresult.png"});
})