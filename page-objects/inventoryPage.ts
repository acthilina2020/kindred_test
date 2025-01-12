import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class InventoryPage extends HelperBase{

  constructor(page: Page) {
    super(page)
  }

  async fromInventoryPage(){
    const ItemNameOnInventoryPage = await this.page.getByText('Sauce Labs Backpack').textContent()
    await this.page.getByText('Sauce Labs Backpack').click()
    await this.waitForNumberOfSeconds(2)
    const ItemNameOnProductPage = await this.page.locator('div[class="inventory_details_name large_size"][data-test="inventory-item-name"]').textContent()
    expect (ItemNameOnInventoryPage).toStrictEqual(ItemNameOnProductPage)
  }

  async fromAddToCartButton(){
    const addToCartButton = await this.page.getByText('Add to cart').click()
    await this.waitForNumberOfSeconds(2)
  }

  async fromCartIcon(){
    await this.page.locator('a[class="shopping_cart_link"][data-test="shopping-cart-link"]').click({force: true})
    await this.waitForNumberOfSeconds(2)
  }
}