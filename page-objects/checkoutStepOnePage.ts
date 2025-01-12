import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class CheckoutStepOnePage extends HelperBase{

  constructor(page: Page) {
    super(page)
  }

  async onCheckoutStepOnePage(firstName: string, lastName: string, zipPostalCode: any){
    await this.page.locator('#first-name').fill(firstName)
    await this.page.locator('#last-name').fill(lastName)
    await this.page.locator('#postal-code').fill(zipPostalCode)
    await this.page.locator('input[type="submit"][id="continue"]').click()
    await this.waitForNumberOfSeconds(2)
  }
}