import { Page, Locator, expect } from "@playwright/test";

export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly flashMessage: Locator;
    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', {name: /login/i});
        this.flashMessage = page.locator('#flash');
    }
    async navigate(){
        await this.page.goto('/login');
    }

    async performLogin(user: string, pass: string){
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }
    async assertLoginSuccess(){
        await expect(this.flashMessage).toContainText('You logged into a secure area!');
    }
}