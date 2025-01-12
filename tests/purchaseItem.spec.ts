import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({ page } ) => {
  await page.goto(process.env.BASE_URL)
  const pm = new PageManager(page)
  await pm.performLogin().onLoginPage(process.env.USERNAMEVALUE, process.env.PASSWORD)
  await expect(page).toHaveURL(/inventory.html/)
  await expect(page.getByText('Products', {exact: true})).toBeVisible()
})

test.describe("verifying a valid user can successfully purchase a product", {
  tag: ['@Regression'],
 }, () => {
  test('TC#001 TC#002 TC#003 verify user can sucessfully add an item to cart and checkout to complete the purchasing process', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateToProductPageOfFirstItem().fromInventoryPage()
    await pm.addItemToCart().fromAddToCartButton()
    await expect(page.getByText('Add to cart')).toHaveCount(0)
    await expect(page.getByText('Remove')).toBeVisible()
    const ItemNameOnProductPage = await page.locator('div[class="inventory_details_name large_size"][data-test="inventory-item-name"]').textContent()

    await pm.navigateToCartPage().fromCartIcon()
    await expect(page).toHaveURL(/cart.html/)
    await expect(page.getByText('Your Cart', {exact: true})).toBeVisible()
    const ItemNameOnCartPage = await page.locator('div[class="inventory_item_name"][data-test="inventory-item-name"]').textContent()
    expect (ItemNameOnCartPage).toStrictEqual(ItemNameOnProductPage)

    await pm.clickCheckout().onCartPage()
    await expect(page).toHaveURL(/checkout-step-one.html/)
    await expect(page.getByText('Checkout: Your Information', {exact: true})).toBeVisible()

    await pm.enterCheckoutInformationAndContinue().onCheckoutStepOnePage(process.env.FIRSTNAME, process.env.LASTNAME, process.env.POSTALCODE)
    await expect(page).toHaveURL(/checkout-step-two.html/)
    await expect(page.getByText('Checkout: Overview', {exact: true})).toBeVisible()
    const ItemNameOnCheckoutStepTwoPage = await page.locator('div[class="inventory_item_name"][data-test="inventory-item-name"]').textContent()
    expect (ItemNameOnCheckoutStepTwoPage).toStrictEqual(ItemNameOnProductPage)

    await pm.clickOnFinishButtonToCompleteTransaction().onCheckoutStepTwoPage()
    await expect(page).toHaveURL(/checkout-complete.html/)
    await expect(page.getByText('Checkout: Complete!', {exact: true})).toBeVisible()
    await expect(page.getByText('Thank you for your order!', {exact: true})).toBeVisible()

    /*verify the cart is empty after completing the purchase*/
    await pm.navigateToCartPage().fromCartIcon()
    await expect(page.getByText('Sauce Labs Backpack')).toHaveCount(0)
    
  })

  test('TC#004 verify user can successfully logout', async({ page }) => {
    const pm = new PageManager(page)
    await pm.performLogout().fromLogoutDropDown()
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await expect(page.locator('#user-name')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.locator('#login-button')).toBeVisible()
  })
})