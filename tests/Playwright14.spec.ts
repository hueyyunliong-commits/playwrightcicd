//recorded using codegen
import { test, expect } from '@playwright/test';
import HomePagePOM from '../pages/BlazeDemoHomePagePOM';
import ResultPagePOM from '../pages/BlazeDemoResultPagePOM'; 
import PurchasePagePOM from '../pages/BlazeDemoPurchasePagePOM';   
import ConfirmationPagePOM from '../pages/BlazeDemoConfirmationPagePom';  

test('TestCase14', async ({ page }) => {
    await page.goto('https://blazedemo.com/');
    const homepage = new HomePagePOM(page);
    await page.pause()

    await expect(homepage.getfindFlightsButton()).toBeVisible();

    await homepage.getfromCityDropdown().selectOption('Boston');
    await homepage.gettoCityDropdown().selectOption('London');
    await homepage.getfindFlightsButton().click();

    const resultpage = new ResultPagePOM(page);
    await resultpage.getFlightButton(1).click();

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the result
    const purchasePage = new PurchasePagePOM(page);
    await expect(purchasePage.getHeading()).toBeVisible();
    await purchasePage.getNameInput().fill('John Doe');
    await purchasePage.getAddressInput().fill('123 Main St');
    await purchasePage.getCityInput().fill('Boston');
    await purchasePage.getStateInput().fill('MA');
    await purchasePage.getZipCodeInput().fill('02101');
    await purchasePage.getCardTypeDropdown().selectOption({ label: 'Visa' });
    await purchasePage.getCreditCardNumberInput().fill('4111111111111111');
    await purchasePage.getCreditCardMonthInput().fill('12');
    await purchasePage.getCreditCardYearInput().fill('2025');
    await purchasePage.getNameOnCardInput().fill('John Doe');
    await purchasePage.getRememberMeCheckbox().check();
    await purchasePage.getPurchaseFlightButton().click();

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the result
    const confirmationPage = new ConfirmationPagePOM(page);
    await expect(confirmationPage.getConfirmationMessageHeading()).toBeVisible();
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the result

});


