import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) { }
    usernameInput = this.page.locator('[data-test="username"]')
    passwordInput = this.page.locator('[data-test="password"]')
    loginButton = this.page.locator('[data-test="login-button"]')

    async goto(){
        await this.page.goto(process.env.BASE_URL!)
    }
    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

}