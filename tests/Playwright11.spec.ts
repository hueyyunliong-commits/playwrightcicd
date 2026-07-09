// Import the Playwright test runner and assertion helpers.
import { test, expect } from '@playwright/test';

// Group related tests for Amazon search validation.
test.describe('Amazon search validation', () => {
	// Define a test that validates search behavior on Amazon.
	test('should search for a product and validate results page details', async ({ page }) => {
		// Store the search keyword that will be used in this test.
		const searchKeyword = 'wireless mouse';

		// Navigate to Amazon's home page and wait for the page to finish loading.
		await page.goto('https://www.amazon.com/', { waitUntil: 'domcontentloaded' });

		// Locate the main Amazon search input box.
		const searchInput = page.locator('#twotabsearchtextbox');

		// Ensure the search input is visible before interacting with it.
		await expect(searchInput).toBeVisible();

		// Fill the search input with the target keyword.
		await searchInput.fill(searchKeyword);

		// Click the search button and wait for the results page to load.
		await Promise.all([
			// Wait for the URL to include the Amazon search query parameter.
			page.waitForURL('**/s?k=**'),
			// Trigger the search action by clicking the submit button.
			page.locator('#nav-search-submit-button').click(),
		]);

		// Verify that the URL contains the expected encoded search keyword.
		await expect(page).toHaveURL(new RegExp(`k=${searchKeyword.replace(/\s+/g, '\\+')}`));

		// Confirm the search input still shows the same keyword after navigation.
		await expect(searchInput).toHaveValue(searchKeyword);

		// Locate all standard search result containers on the results page.
		const resultItems = page.locator('[data-component-type="s-search-result"]');

		// Validate that at least one result item is rendered for the search.
		await expect(resultItems.first()).toBeVisible();

		// Capture the total number of result items found on the current page.
		const totalResults = await resultItems.count();

		// Assert that the number of results is greater than zero.
		expect(totalResults).toBeGreaterThan(0);

		// Locate all product title elements inside search result cards.
		const resultTitles = page.locator('[data-component-type="s-search-result"] h2 span');

		// Read all visible title texts from the search results.
		const titlesText = await resultTitles.allTextContents();

		// Normalize and keep only non-empty title strings.
		const cleanedTitles = titlesText.map((text) => text.trim()).filter((text) => text.length > 0);

		// Ensure at least one cleaned title exists after filtering empty text.
		expect(cleanedTitles.length).toBeGreaterThan(0);

		// Check whether any title includes one of the search words for relevance validation.
		const hasRelevantTitle = cleanedTitles.some((title) => {
			// Convert title text to lowercase for case-insensitive matching.
			const normalizedTitle = title.toLowerCase();
			// Return true if title contains either keyword token.
			return normalizedTitle.includes('wireless') || normalizedTitle.includes('mouse');
		});

		// Assert that at least one result title appears relevant to the search.
		expect(hasRelevantTitle).toBeTruthy();
	});
});
