const { expect } = require("@playwright/test");
const BasePage = require("../utils/BasePage");

class ProductPage extends BasePage {

    constructor(page) {

        super(page);

        this.page = page;

        this.productTitle = page.locator("h1");

        this.productPrice = page.locator(".product-page-info .geolizr-currency").first();

        this.quantity = page.locator('input[name="quantity"]');

        // Visible size options only
        this.sizeOptions = page.locator(
            '.product-options__value:not(.disabled)'
        );

    //     this.sizeOptions = page
    // .locator(".product-page-info")
    // .locator(".product-options__value:not(.disabled)");
        // Visible Add To Cart button
        this.addToCartButton = page
            .locator('button[name="add"]:visible')
            .first();

    }

    async verifyProductPage() {

        await expect(this.productTitle).toBeVisible();

    }

    async getProductTitle() {

        return (await this.productTitle.textContent()).trim();

    }

    async getProductPrice() {

        return (await this.productPrice.textContent()).trim();

    }

    async selectAvailableSize() {

        const count = await this.sizeOptions.count();

        for (let i = 0; i < count; i++) {

            const size = this.sizeOptions.nth(i);

            if (await size.isVisible()) {

                await size.click();

                break;

            }

        }

    }
// async selectAvailableSize() {

//     const count = await this.sizeOptions.count();

//     for (let i = 0; i < count; i++) {

//         const option = this.sizeOptions.nth(i);

//         if (await option.isVisible()) {

//             await option.click();

//             return;

//         }

//     }

//     throw new Error("No visible size available.");

// }
    async changeQuantity(qty) {

        await this.quantity.fill(String(qty));

    }

    async addProductToCart() {

        await this.selectAvailableSize();

        await expect(this.addToCartButton).toBeVisible();

        await expect(this.addToCartButton).toBeEnabled({
            timeout: 10000
        });

        await this.addToCartButton.click();

        // Wait until popup cart appears
        // await expect(
        //     this.page.locator(".popup-cart")
        // ).toBeVisible({
        //     timeout: 15000
        // });

    }

}

module.exports = ProductPage;