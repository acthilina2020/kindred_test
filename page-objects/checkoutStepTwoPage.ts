import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class CheckoutStepTwoPage extends HelperBase{

  constructor(page: Page) {
    super(page)
  }

  async onCheckoutStepTwoPage(){
    await this.page.getByText('Finish').click()
    await this.waitForNumberOfSeconds(2)
  }
}