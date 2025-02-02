import { Locator, Page } from "@playwright/test";

export class signUp {
  page: Page;
  inputFirstName: Locator;
  inputLastName: Locator;
  inputEmail: Locator;
  inputPass: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputFirstName = this.page.locator("#firstName");
    this.inputLastName = this.page.locator("#lastName");
    this.inputEmail = this.page.locator("#email");
    this.inputPass = this.page.locator("#password");
  }
  async toNavigate() {
    await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/");
    return this;
  }

  async clickonSignUp() {
    await this.page.locator("#signup").click();
    return this;
  }

  async fillInputs(
    firstName: string,
    lastName: string,
    email: string,
    pass: string
  ) {
    await this.inputFirstName.fill(firstName);
    await this.inputLastName.fill(lastName);
    await this.inputEmail.fill(email);
    await this.inputPass.fill(pass);
    await this.page.locator("#submit").click();
  }

  async logout() {
    await this.page.locator("#logout").click();
    return this;
  }
}
