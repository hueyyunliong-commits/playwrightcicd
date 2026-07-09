import { test, expect } from '@playwright/test';

const testParams = {
	navigation: {
		baseUrl: 'https://blazedemo.com/',
		waitUntil: 'domcontentloaded' as const,
		reserveUrlPattern: '**/reserve.php',
		purchaseUrlPattern: '**/purchase.php',
		confirmationUrlPattern: '**/confirmation.php',
		reserveUrlRegex: /reserve\.php/,
		purchaseUrlRegex: /purchase\.php/,
		confirmationUrlRegex: /confirmation\.php/,
	},
	selectors: {
		fromPort: 'select[name="fromPort"]',
		toPort: 'select[name="toPort"]',
		flightRows: 'table.table tbody tr',
		purchaseHeading: 'h2',
		purchaseForm: 'form',
		purchaseTable: 'table.table',
		inputName: '#inputName',
		address: '#address',
		city: '#city',
		state: '#state',
		zipCode: '#zipCode',
		cardType: '#cardType',
		creditCardNumber: '#creditCardNumber',
		creditCardMonth: '#creditCardMonth',
		creditCardYear: '#creditCardYear',
		nameOnCard: '#nameOnCard',
	},
	defaults: {
		fromPort: 'Paris',
		toPort: 'Buenos Aires',
		dropdownItemCount: 7,
	},
	search: {
		fromPort: 'Boston',
		toPort: 'London',
	},
	formData: {
		name: 'John Doe',
		address: '123 Main Street',
		city: 'Boston',
		state: 'Massachusetts',
		zipCode: '02116',
		cardType: 'American Express',
		creditCardNumber: '4111111111111111',
		month: '12',
		year: '2030',
		nameOnCard: 'John Doe',
	},
	expected: {
		title: 'BlazeDemo',
		findFlightsButton: 'Find Flights',
		chooseFlightButton: 'Choose This Flight',
		purchaseFlightButton: 'Purchase Flight',
		resultsHeading: 'Flights from Boston to London:',
		purchaseHeadingContains: 'has been reserved.',
		confirmationHeading: 'Thank you for your purchase today!',
		paymentStatus: 'PendingCapture',
	},
} as const;

test.describe('BlazeDemo flight search', () => {
	test('search flights from Boston to London', async ({ page }) => {
		await page.goto(testParams.navigation.baseUrl, { waitUntil: testParams.navigation.waitUntil });
		await expect(page).toHaveTitle(testParams.expected.title);

		const fromCityDropdown = page.locator(testParams.selectors.fromPort);
		const toCityDropdown = page.locator(testParams.selectors.toPort);

		await expect(fromCityDropdown).toBeVisible();
		await expect(toCityDropdown).toBeVisible();

		await expect(fromCityDropdown).toHaveValue(testParams.defaults.fromPort);
		await expect(toCityDropdown).toHaveValue(testParams.defaults.toPort);

		const fromCityOptions = fromCityDropdown.locator('option');
		const toCityOptions = toCityDropdown.locator('option');
		await expect(fromCityOptions).toHaveCount(testParams.defaults.dropdownItemCount);
		await expect(toCityOptions).toHaveCount(testParams.defaults.dropdownItemCount);

		await fromCityDropdown.selectOption({ label: testParams.search.fromPort });
		await toCityDropdown.selectOption({ label: testParams.search.toPort });

		await Promise.all([
			page.waitForURL(testParams.navigation.reserveUrlPattern),
			page.getByRole('button', { name: testParams.expected.findFlightsButton }).click(),
		]);

		await expect(page).toHaveURL(testParams.navigation.reserveUrlRegex);
		await expect(page.getByRole('heading', { name: testParams.expected.resultsHeading })).toBeVisible();

		const flightRows = page.locator(testParams.selectors.flightRows);
		await expect(flightRows.first()).toBeVisible();

		const totalFlights = await flightRows.count();
		expect(totalFlights).toBeGreaterThan(0);

		await Promise.all([
			page.waitForURL(testParams.navigation.purchaseUrlPattern),
			flightRows.first().getByRole('button', { name: testParams.expected.chooseFlightButton }).click(),
		]);

		await expect(page).toHaveURL(testParams.navigation.purchaseUrlRegex);
		await expect(page.locator(testParams.selectors.purchaseHeading)).toContainText(testParams.expected.purchaseHeadingContains);

		const purchaseForm = page.locator(testParams.selectors.purchaseForm);
		await purchaseForm.locator(testParams.selectors.inputName).fill(testParams.formData.name);
		await purchaseForm.locator(testParams.selectors.address).fill(testParams.formData.address);
		await purchaseForm.locator(testParams.selectors.city).fill(testParams.formData.city);
		await purchaseForm.locator(testParams.selectors.state).fill(testParams.formData.state);
		await purchaseForm.locator(testParams.selectors.zipCode).fill(testParams.formData.zipCode);
		await purchaseForm.locator(testParams.selectors.cardType).selectOption({ label: testParams.formData.cardType });
		await purchaseForm.locator(testParams.selectors.creditCardNumber).fill(testParams.formData.creditCardNumber);
		await purchaseForm.locator(testParams.selectors.creditCardMonth).fill(testParams.formData.month);
		await purchaseForm.locator(testParams.selectors.creditCardYear).fill(testParams.formData.year);
		await purchaseForm.locator(testParams.selectors.nameOnCard).fill(testParams.formData.nameOnCard);


		await Promise.all([
			page.waitForURL(testParams.navigation.confirmationUrlPattern),
			page.getByRole('button', { name: testParams.expected.purchaseFlightButton }).click(),
		]);

		await expect(page).toHaveURL(testParams.navigation.confirmationUrlRegex);
		await expect(page.getByRole('heading', { name: testParams.expected.confirmationHeading })).toBeVisible();
		await expect(page.locator(testParams.selectors.purchaseTable)).toBeVisible();
		await expect(page.getByRole('cell', { name: testParams.expected.paymentStatus })).toBeVisible();
	});
});
