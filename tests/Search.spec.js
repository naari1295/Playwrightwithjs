const { test, expect } = require('@playwright/test');

const HomePage = require('../pages/HomePage');
const SearchPage = require('../pages/SearchPage');

test.describe('Search Module', () => {

    let homePage;
    let searchPage;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        searchPage = new SearchPage(page);

        await homePage.openHomePage();

    });

    test('Verify Search Product', async () => {

        await homePage.searchProduct("Shirt");

        await expect(searchPage.firstProduct).toBeVisible();

    });

    test('Verify Product Name', async () => {

        await homePage.searchProduct("Shirt");

        const productName = await searchPage.getFirstProductName();

        await expect(searchPage.firstProductName).toContainText(/shirt/i);

    });

    test('Verify Product Price', async () => {

        await homePage.searchProduct("Shirt");

        const price = await searchPage.getFirstProductPrice();

        expect(price).toContain("Rs");

    });

    test('Open First Product', async () => {

        await homePage.searchProduct("Shirt");

        await searchPage.openFirstProduct();

        await expect(homePage.page).toHaveURL(/products/);

    });

});