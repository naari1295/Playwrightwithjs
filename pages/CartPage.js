const { expect } = require("@playwright/test");
const BasePage = require("../utils/BasePage");

class CartPage extends BasePage {

    constructor(page) {

        super(page);

        this.page = page;

        // Cart Popup
        this.cartDrawer = page.locator(".popup-cart");

        // Product Details
        this.productName = this.cartDrawer.locator(".product-cart__title a");

        this.productPrice = this.cartDrawer.locator(
            ".product-cart__price-value .geolizr-currency"
        );

        this.productQuantity = this.cartDrawer.locator(
            ".product-cart__quantity"
        );

        // Remove Product
        this.removeButton = this.cartDrawer.locator(
            ".js-product-button-remove-from-cart"
        );

        // Checkout Button
        this.checkoutButton = this.cartDrawer.locator(
            'a[href="/checkout"]'
        );

        // View Shopping Bag
        this.viewShoppingBagButton = this.cartDrawer.locator(
            'a[href="/cart"]'
        );

    }

    async verifyCartPage() {

        await expect(this.cartDrawer).toBeVisible({
            timeout: 15000
        });

        await expect(this.productName).toBeVisible();

        await expect(this.checkoutButton).toBeVisible();

    }

    async getProductName() {

        return (await this.productName.textContent()).trim();

    }

   async getProductPrice() {

    const price = await this.productPrice.nth(0).textContent();

    return price.trim();

}

    async getQuantity() {

        return (await this.productQuantity.textContent()).trim();

    }

    async clickCheckout() {

        await this.checkoutButton.click();

    }

    async clickViewShoppingBag() {

        await this.viewShoppingBagButton.click();

    }

    async removeProduct() {

        await this.removeButton.click();

    }

}

module.exports = CartPage;