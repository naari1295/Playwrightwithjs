const { test, expect } = require("@playwright/test");

const HomePage = require("../pages/HomePage");
const LoginPage = require("../pages/LoginPage");

test.describe("Login Module @smoke", () => {

    let homePage;
    let loginPage;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.openHomePage();

    });

   test("Verify Login Popup Opens", async () => {

    await homePage.clickAccount();

    await loginPage.verifyLoginPopup();

});
   test("Verify Sign Up Link", async ({ page }) => {

    await homePage.clickAccount();

    await loginPage.clickSignUp();

    await expect(page).toHaveURL("https://zigzag.lk/");

});


    });
