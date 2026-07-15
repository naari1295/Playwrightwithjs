const { expect } = require("@playwright/test");
const BasePage = require("../utils/BasePage");

class CheckoutPage extends BasePage {

    constructor(page) {

        super(page);

        this.email = page.getByRole("textbox", { name: "Email" });

        this.country = page.getByRole("combobox", {
            name: "Country/Region"
        });

        this.firstName = page.getByRole("textbox", {
            name: "First name"
        });

        this.lastName = page.getByRole("textbox", {
            name: "Last name"
        });

        this.address = page.getByRole("textbox", {
            name: "Address"
        });

        this.city = page.getByRole("textbox", {
            name: "City"
        });

        this.phone = page.getByRole("textbox", {
            name: "Phone"
        });

        this.payNowBtn = page.getByRole("button", {
            name: /Pay now/i
        });

    }

    async verifyCheckoutPage() {

        await expect(this.email).toBeVisible({
            timeout: 15000
        });

    }

    async fillShippingDetails(data) {

        await this.email.fill(data.email);

        await this.country.selectOption(data.country);

        await this.firstName.fill(data.firstName);

        await this.lastName.fill(data.lastName);

        await this.address.fill(data.address);

        await this.city.fill(data.city);

        await this.phone.fill(data.phone);

    }

    async clickPayNow() {

        await this.payNowBtn.click();

    }

}

module.exports = CheckoutPage;