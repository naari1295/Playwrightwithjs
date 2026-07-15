const { test, expect } = require("@playwright/test");

const HomePage = require("../pages/HomePage");
const SearchPage = require("../pages/SearchPage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/CartPage");

test.describe("Cart Module", () => {

    let homePage;
    let searchPage;
    let productPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        searchPage = new SearchPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        // Open Website
        await homePage.openHomePage();

        // Search Product
        await homePage.searchProduct("shirt");

        // Open First Product
        await searchPage.openFirstProduct();

        // Verify Product Page
        await productPage.verifyProductPage();

        // Add Product
        await productPage.addProductToCart();

        // Verify Cart Drawer
        await cartPage.verifyCartPage();

    });

    test("Verify Product Name", async () => {

        const product = await cartPage.getProductName();

        console.log(product);

        expect(product.length).toBeGreaterThan(0);

    });

    test("Verify Product Price", async () => {

        const price = await cartPage.getProductPrice();

        console.log(price);

        expect(price).toContain("Rs");

    });

    test("Verify Product Quantity", async () => {

        const quantity = await cartPage.getQuantity();

        console.log(quantity);

        expect(quantity).toContain("1");

    });

    test("Verify Checkout Button", async () => {

        await expect(cartPage.checkoutButton).toBeVisible();

    });

    test("Verify Remove Product", async () => {

        await cartPage.removeProduct();


    });

});