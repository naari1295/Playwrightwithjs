const { test, expect } = require("@playwright/test");

const HomePage = require("../pages/HomePage");
const SearchPage = require("../pages/SearchPage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/CheckoutPage");

// Helper Function
async function openFirstAvailableProduct(page, productPage) {

    let products = page.locator(".product-collection__title a");

    const count = await products.count();

    for (let i = 0; i < count; i++) {

        products = page.locator(".product-collection__title a");

        await products.nth(i).click();

        await productPage.verifyProductPage();

        const soldOut = page.getByRole("button", {
            name: /Sold Out/i
        });

        if (!(await soldOut.isVisible().catch(() => false))) {

            console.log(`Product ${i + 1} is Available`);

            return;
        }

        console.log(`Product ${i + 1} is Sold Out`);

        await page.goBack();

        await expect(
            page.locator(".product-collection__title a").nth(i + 1)
        ).toBeVisible();
    }

    throw new Error("No available product found.");
}

test("Checkout Flow", async ({ page }) => {

    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Home
    await homePage.openHomePage();

    // Search
    await homePage.searchProduct("top");

    // Open first available product
    await openFirstAvailableProduct(page, productPage);

    // Add Product
    await productPage.addProductToCart();

    // Cart
    await cartPage.verifyCartPage();

    await cartPage.clickCheckout();

    // Checkout
    await checkoutPage.verifyCheckoutPage();

    await checkoutPage.fillShippingDetails({

        email: "test@example.com",

        country: "IN",

        firstName: "Narayanamma",

        lastName: "Maguluri",

        address: "Hyderabad",

        city: "Hyderabad",

        phone: "9876543210"

    });

    await expect(checkoutPage.payNowBtn).toBeVisible();

});