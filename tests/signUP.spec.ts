import{signUp} from "../project/signupClass.ts";
import {test as base, expect} from '@playwright/test';
import { readCSVFile } from "../helper/csvParse.ts";
import { request } from "http";
import exp from "constants";
import { sign } from "crypto";

// test.describe("Example of DDT test with CSV data import", () => {
//     const data = readCSVFile("data.csv");
//     for(const {testID, FirstName, LastName, Email, Password} of data){
//         test(testID, async ({page, request}) => {
//             const signup = new signUp(page);
//             await signup.toNavigate();
//             await signup.clickonSignUp();
//             await signup.fillInputs(FirstName, LastName, Email, Password);
//             const contactList = await request.get('https://thinking-tester-contact-list.herokuapp.com/js/contactList.js');
//             expect(contactList).toBeOK();
//         });
//     }
// });
const test = base.extend<{signup: signUp}>({signup: async({page,request}, use) =>{
        const signup = new signUp(page);
        const addUserAPI = await request.get('https://thinking-tester-contact-list.herokuapp.com/js/addUser.js');
        await signup.toNavigate();
        await signup.clickonSignUp();
        expect(addUserAPI).toBeOK();
        await use(signup);
        
}
});

test('correct sign up', async ({signup, request}) => {
    const contactsAPI = await request.get('https://thinking-tester-contact-list.herokuapp.com/users');
    const logoutAPI = await request.get('https://thinking-tester-contact-list.herokuapp.com/logout');
    await signup.fillInputs('Vasya', 'Bathkovych', 'vasya3@gmail.com', 'vasya123');
    expect(contactsAPI).toBeOK();
    await signup.logout();
    expect(logoutAPI).toBeOK();
})

test('sign up bad password, less symbol', async ({signup, request, page}) => {
    const contactsAPI = await request.post('https://thinking-tester-contact-list.herokuapp.com/users');
    const errorMessage = await page.locator('[id="error"]');
    await signup.fillInputs('Vasya', 'Bathkovych', 'vasya3142@gmail.com', 'v');
    await expect(errorMessage).toBeVisible({timeout: 100000});
    expect(contactsAPI).not.toBeOK();
})


test('sign up bad email, no adress', async ({signup, request, page}) => {
    const contactsAPI = await request.post('https://thinking-tester-contact-list.herokuapp.com/users');
    const errorMessage = await page.locator('[id="error"]');
    await signup.fillInputs('Vasya', 'Bathkovych', 'vasya', 'vasya123');
    await expect(errorMessage).toBeVisible({timeout: 100000});
    expect(contactsAPI).not.toBeOK();
})








