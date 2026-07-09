export default class ConfirmationPagePOM {
	page: any;

	constructor(page: any) {
		this.page = page;
	}

	getConfirmationMessageHeading(){
		return this.page.getByRole('heading', { name: 'Thank you for your purchase today!' });
	}

	getIdValue(){
		return this.page.locator('td', { hasText: 'Id' }).locator('xpath=following-sibling::td');
	}

	getStatusValue(){
		return this.page.locator('td', { hasText: 'Status' }).locator('xpath=following-sibling::td');
	}

	getAmountValue(){
		return this.page.locator('td', { hasText: 'Amount' }).locator('xpath=following-sibling::td');
	}

	getCardNumberValue(){
		return this.page.locator('td', { hasText: 'Card Number' }).locator('xpath=following-sibling::td');
	}

	getExpirationValue(){
		return this.page.locator('td', { hasText: 'Expiration' }).locator('xpath=following-sibling::td');
	}

	getAuthorizationCodeValue(){
		return this.page.locator('td', { hasText: 'Auth Code' }).locator('xpath=following-sibling::td');
	}

	getDateValue(){
		return this.page.locator('td', { hasText: 'Date' }).locator('xpath=following-sibling::td');
	}
}