import {test as base, expect} from '@playwright/test';
import {Login} from '../project/page/fixtureForLogin';
import { readCSVFile } from '../helper/csvParse';
import exp from 'constants';
import { log } from 'console';

const data = readCSVFile('data.csv');

const test = base.extend<{login: Login}>({login: async ({page, request}, use) => {    

    const login = new Login(page);
    await login.navigateTo();
    await use(login);
    await login.logout();
   
}
});   

for(const {Email, Password} of data){
    test(`login and add contact ${Email}`, async ({login, request, page}) => { 
        await login.enterData(Email, Password);   
        
        await login.createContact('Vasya', 'Vasylovych'); 
        const response = await page.waitForResponse(response => response.url().includes('https://thinking-tester-contact-list.herokuapp.com/contacts') && response.status() === 200);

        console.log('RESPONSE ' + (await response.body()));
    //     // const contactsAPI = await request('https://thinking-tester-contact-list.herokuapp.com/contacts');
    //     await page.route('https://thinking-tester-contact-list.herokuapp.com/contacts',async route => {
    //         await expect(route.status()).tobe(555)
    //         console.log(route);            
    //       });
    //     // const contactsAPIBody = JSON.parse(await contactsAPI.text());    
        
        

    //     // // const lastElementOfcontactsAPIBody = contactsAPIBody[contactsAPIBody.length-1]
     
         
    //     // // await console.log(contactsAPIBody); 
    //     // await expect(contactsAPI.status()).toBe(304);
           
        
    //     // expect(addContactAPI).toBeOK();
    //     // await expect(lastElementOfcontactsAPIBody.firstName).toHaveText('Vasya');
    })  

      
}