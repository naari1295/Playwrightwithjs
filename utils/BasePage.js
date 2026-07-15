class BasePage {

    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded'
        });
    }

    async click(locator) {
        await locator.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await locator.click();
    }

    async fill(locator, value) {
        await locator.fill(value);
    }

    async press(locator, key) {
        await locator.press(key);
    }

    async getText(locator) {
        return await locator.textContent();
    }

    async isVisible(locator) {
        return await locator.isVisible();
    }

    async waitForVisible(locator) {
        await locator.waitFor({
            state: 'visible'
        });
    }

    async wait(milliseconds) {
        await this.page.waitForTimeout(milliseconds);
    }

    async takeScreenshot(name) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

    async getTitle() {
        return await this.page.title();
    }

    async getURL() {
        return this.page.url();
    }

    async closeSpinWheelPopup() {

        try {

            const closeButton = this.page.locator('.easw-closeButtonDiv button');

            await closeButton.waitFor({
                state: 'visible',
                timeout: 8000
            });

            await closeButton.click();

            console.log("Spin Wheel Popup Closed");

        }

        catch {

            console.log("Spin Wheel Popup Not Displayed");

        }

    }

}

module.exports = BasePage;