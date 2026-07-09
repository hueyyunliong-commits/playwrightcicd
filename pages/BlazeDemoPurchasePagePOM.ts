export type PurchaseFormData = {
	name: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	cardType: string;
	creditCardNumber: string;
	month: string;
	year: string;
	nameOnCard: string;
};

export default class PurchasePagePOM {
	page: any;

	constructor(page: any) {
		this.page = page;
	}

	getHeading() {
		return this.page.locator('h2');
	}

	getNameInput() {
		return this.page.locator('#inputName');
	}

	getAddressInput() {
		return this.page.locator('#address');
	}

	getCityInput() {
		return this.page.locator('#city');
	}

	getStateInput() {
		return this.page.locator('#state');
	}

	getZipCodeInput() {
		return this.page.locator('#zipCode');
	}

	getCardTypeDropdown() {
		return this.page.locator('#cardType');
	}

	getCreditCardNumberInput() {
		return this.page.locator('#creditCardNumber');
	}

	getCreditCardMonthInput() {
		return this.page.locator('#creditCardMonth');
	}

	getCreditCardYearInput() {
		return this.page.locator('#creditCardYear');
	}

	getNameOnCardInput() {
		return this.page.locator('#nameOnCard');
	}

	getRememberMeCheckbox() {
		return this.page.locator('#rememberMe');
	}

	getPurchaseFlightButton() {
		return this.page.getByRole('button', { name: 'Purchase Flight' });
	}

	async fillPurchaseForm(data: PurchaseFormData) {
		await this.getNameInput().fill(data.name);
		await this.getAddressInput().fill(data.address);
		await this.getCityInput().fill(data.city);
		await this.getStateInput().fill(data.state);
		await this.getZipCodeInput().fill(data.zipCode);
		await this.getCardTypeDropdown().selectOption({ label: data.cardType });
		await this.getCreditCardNumberInput().fill(data.creditCardNumber);
		await this.getCreditCardMonthInput().fill(data.month);
		await this.getCreditCardYearInput().fill(data.year);
		await this.getNameOnCardInput().fill(data.nameOnCard);
	}

	async purchaseTicket() {
		await this.getPurchaseFlightButton().click();
	}
}
