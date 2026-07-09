export default class ResutPagePom{
    page:any;

    constructor(page:any){
        this.page = page;
    }

    getFlightButton(btnIndex:number){
        return this.page.locator(`//tbody/tr[${btnIndex}]/td/input`);
    }

}