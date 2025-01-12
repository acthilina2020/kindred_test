import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class LoginAndLogoutPage extends HelperBase{

  constructor(page: Page) {
    super(page)
  }

  async onLoginPage(username: string, password: string){
    await this.page.locator('#user-name').fill(username)
    await this.page.locator('#password').fill(password)
    await this.page.locator('#login-button').click()
    await this.waitForNumberOfSeconds(2)
  }

  async fromLogoutDropDown(){
    await this.page.locator('#react-burger-menu-btn').click( {force: true} )
    await this.page.locator('#logout_sidebar_link').filter({ hasText: "Logout"}).click()
    await this.waitForNumberOfSeconds(2)
  }
}