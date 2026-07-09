export default class HomePagePOM{
    page:any;

    constructor(page:any){
        this.page = page;
    }

    getfromCityDropdown(){
        return this.page.locator('select[name="fromPort"]');
    }

    gettoCityDropdown(){
        return this.page.locator('select[name="toPort"]');
    }

    getfindFlightsButton(){
        return this.page.getByRole('button', { name: 'Find Flights' });
    }
}