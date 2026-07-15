// const BasePage = require("../utils/BasePage");

// class HomePage extends BasePage {

//    constructor(page) {

//     super(page);

//     this.accountIcon = page.locator('[data-js-popup-button="account"]').first();

//     this.searchBox = page.locator('#Search');

//     this.searchMenu = page.getByRole('link', {
//         name: 'SEARCH'
//     });

//     this.cartIcon = page.locator('a[href="/cart"]').first();

// }
//     // Open Website
//     async openHomePage() {

//         await this.navigate("/");

//         // Close Spin Wheel Popup if displayed
//         await this.closeSpinWheelPopup();

//     }

//     // Search Product
//    async searchProduct(productName) {

//     // Open search drawer
//     await this.page.getByRole('link', { name: 'SEARCH' }).click();

//     // Wait for search textbox to become visible
//     await this.searchBox.waitFor({
//         state: 'visible',
//         timeout: 15000
//     });

//     // Enter product
//     await this.searchBox.fill(productName);

//     // Press Enter
//     await this.searchBox.press('Enter');

//     // Wait for first product to appear
//     await this.page.locator('.product-collection__title h4 a')
//         .first()
//         .waitFor({
//             state: 'visible',
//             timeout: 15000
//         });

// }
//     // Open Cart
//     async openCart() {

//         await this.cartIcon.waitFor({
//             state: "visible"
//         });

//         await this.cartIcon.click();

//     }

// }

// module.exports = HomePage;


const BasePage = require("../utils/BasePage");

class HomePage extends BasePage {

    constructor(page) {

        super(page);

       this.accountIcon = page.locator('a[href="/account"]').first();
        this.searchBox = page.locator("#Search");

        this.searchMenu = page.getByRole("link", {
            name: "SEARCH"
        });

        this.cartIcon = page.locator('a[href="/cart"]').first();

    }

    async openHomePage() {

        await this.navigate("/");

        await this.closeSpinWheelPopup();

    }

   async clickAccount() {

    await this.accountIcon.waitFor({
        state: "visible"
    });

    await this.accountIcon.click();

}
    async searchProduct(productName) {

        await this.searchMenu.click();

        await this.searchBox.waitFor({
            state: "visible"
        });

        await this.searchBox.fill(productName);

        await this.searchBox.press("Enter");

        await this.page.locator(".product-collection__title h4 a")
            .first()
            .waitFor({
                state: "visible"
            });

    }

    async openCart() {

        await this.cartIcon.click();

    }

}

module.exports = HomePage;