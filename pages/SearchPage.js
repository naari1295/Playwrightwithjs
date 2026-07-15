const BasePage = require("../utils/BasePage");

class SearchPage extends BasePage {

    constructor(page) {
        super(page);

        this.firstProduct = page.locator(".product-collection__title a").first();

        this.firstProductName = page
            .locator(".product-collection__title a")
            .first();

        this.firstProductPrice = page
            .locator(".price")
            .first();
    }

    async getFirstProductName() {

        return await this.firstProductName.textContent();

    }

    async getFirstProductPrice() {

        return await this.firstProductPrice.textContent();

    }

    async openFirstProduct() {

        await this.firstProduct.click();

    }

}
module.exports = SearchPage;