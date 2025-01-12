import { Page } from "@playwright/test"
import { LoginAndLogoutPage } from '../page-objects/loginAndLogoutPage'
import { InventoryPage } from '../page-objects/inventoryPage'
import { CartPage } from "../page-objects/cartPage"
import { CheckoutStepOnePage } from "../page-objects/checkoutStepOnePage"
import { CheckoutStepTwoPage } from "../page-objects/checkoutStepTwoPage"

export class PageManager{

  private readonly page: Page
  private readonly loginAndLogoutPage: LoginAndLogoutPage
  private readonly inventoryPage: InventoryPage
  private readonly cartPage: CartPage
  private readonly checkoutStepOnePage: CheckoutStepOnePage
  private readonly checkoutStepTwoPage: CheckoutStepTwoPage

  constructor(page: Page){
    this.page = page
    this.loginAndLogoutPage = new LoginAndLogoutPage(this.page)
    this.inventoryPage = new InventoryPage(this.page)
    this.cartPage = new CartPage(this.page)
    this.checkoutStepOnePage = new CheckoutStepOnePage(this.page)
    this.checkoutStepTwoPage = new CheckoutStepTwoPage(this.page)
  }

  performLogin(){
    return this.loginAndLogoutPage
  }

  performLogout(){
    return this.loginAndLogoutPage
  }

  navigateToProductPageOfFirstItem(){
    return this.inventoryPage
  }

  addItemToCart(){
    return this.inventoryPage
  }

  navigateToCartPage(){
    return this.inventoryPage
  }

  clickCheckout(){
    return this.cartPage
  }

  enterCheckoutInformationAndContinue(){
    return this.checkoutStepOnePage
  }

  clickOnFinishButtonToCompleteTransaction(){
    return this.checkoutStepTwoPage
  }
}