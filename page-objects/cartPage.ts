import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class CartPage extends HelperBase{

  constructor(page: Page) {
    super(page)
  }

  async onCartPage(){
    await this.page.getByText('Checkout').click()
    await this.waitForNumberOfSeconds(2)
  }
}