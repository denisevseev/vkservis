
(async function example() {
    const webdriver = require('selenium-webdriver');
    const FIREFOX = require('selenium-webdriver/firefox');
    let driver = await new webdriver.Builder().forBrowser('C:\\Program Files\\Google\\Chrome\\Application\\chrome').build();
    try {
        await drivepr.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
})();


