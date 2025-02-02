import {Page, Locator} from '@playwright/test';

export class Login {
    inputEmail: Locator;
    inputPass: Locator;
    buttonSubmit: Locator;
    buttonPostContact: Locator;
    inputFirstName: Locator;
    inputLastName: Locator;
    buttonSubmitPost: Locator;
    buttonLogout: Locator;
    tableBody: Locator;
    constructor(public readonly page: Page){
        this.page = page;
        this.inputEmail = this.page.getByPlaceholder('Email');
        this.inputPass = this.page.getByPlaceholder('Password');
        this.buttonSubmit = this.page.getByRole('button', { name: 'Submit' });
        this.buttonPostContact = this.page.getByRole('button', { name: 'Add a New Contact' });
        this.inputFirstName = this.page.getByPlaceholder('First Name');
        this.inputLastName = this.page.getByPlaceholder('Last Name');
        this.buttonSubmitPost = this.page.getByRole('button', { name: 'Submit' }); 
        this.buttonLogout = this.page.getByRole('button', { name: 'Logout' });
        this.tableBody = this.page.locator('//td');
    0}

    async navigateTo(){
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    }

    async enterData(email:string, pass:string) {
        await this.inputEmail.fill(email);
        await this.inputPass.fill(pass);
        await this.buttonSubmit.click();
    }
    
    async createContact (firstName: string, lastName: string){
        await this.buttonPostContact.click();
        await this.inputFirstName.fill(firstName);
        await this.inputLastName.fill(lastName);
        await this.buttonSubmitPost.click();
    }
    
    async logout (){
        await this.buttonLogout.click();
    }
}