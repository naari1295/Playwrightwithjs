// const BasePage = require("../utils/BasePage");

// class LoginPage extends BasePage {

//     constructor(page) {

//         super(page);

//         // Login Popup
//         this.loginPopupTitle = page.getByText("MY ACCOUNT");

//         this.loginForm = page.locator("#popup_customer_login");

//         // Login Controls
//         this.emailTextbox = page.locator("#PopupCustomerEmail");

//         this.passwordTextbox = page.locator("#PopupCustomerPassword");

//         this.loginButton = page.locator('input[value="LOGIN"]');

//         this.signUpLink = page.locator('a[href="/account/register"]');

//         this.forgotPassword = page.locator('a[href="/account/recover"]');

//         // Register Controls
//         this.firstName = page.locator("#PopupFirstName");

//         this.lastName = page.locator("#PopupLastName");

//         this.registerEmail = page.locator("#PopupEmail");

//         this.createPassword = page.locator("#PopupCreatePassword");

//         this.signUpButton = page.locator('input[value="Sign up now!"]');

//     }

//     async verifyLoginPopup() {

//         await this.waitForVisible(this.loginPopupTitle);

//     }

//     async enterEmail(email) {

//         await this.fill(this.emailTextbox, email);

//     }

//     async enterPassword(password) {

//         await this.fill(this.passwordTextbox, password);

//     }

//     async clickLogin() {

//         await this.click(this.loginButton);

//     }

//     async login(email, password) {

//         await this.enterEmail(email);

//         await this.enterPassword(password);

//         await this.clickLogin();

//     }

//     async clickSignUp() {

//         await this.click(this.signUpLink);

//     }

//     async clickForgotPassword() {

//         await this.click(this.forgotPassword);

//     }

//     async register(firstName, lastName, email, password) {

//         await this.fill(this.firstName, firstName);

//         await this.fill(this.lastName, lastName);

//         await this.fill(this.registerEmail, email);

//         await this.fill(this.createPassword, password);

//         await this.click(this.signUpButton);

//     }

// }

// module.exports = LoginPage;


const { expect } = require("@playwright/test");
const BasePage = require("../utils/BasePage");

class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.loginPopupTitle = page.getByRole("heading", {
            name: "MY ACCOUNT"
        });

        this.email = page.getByPlaceholder("Your Email Address");

        this.password = page.getByPlaceholder("••••••");

        this.loginButton = page.getByRole("button", {
            name: "LOGIN"
        });

        this.signUpLink = page.getByRole("link", {
            name: "Sign up now!"
        });

        this.forgotPassword = page.getByRole("link", {
            name: "Forgot Your Password?"
        });

    }

    async verifyLoginPopup() {

        await expect(this.loginPopupTitle).toBeVisible();

    }

    async clickSignUp() {

        await this.signUpLink.click();

    }

}

module.exports = LoginPage;