const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
class autorize_class{
    constructor(login, pass) {
        this.login  = login
        this.pass = pass
    }
    async autorizeMethod(){
            const webdriver = require('selenium-webdriver');
            const chrome = require('selenium-webdriver/chrome');
            const chromedriver = require('chromedriver');
            var driver = new webdriver.Builder()
                .setChromeOptions(new chrome.Options().headless())
                .forBrowser('chrome')
                .build();
            const actions = driver.actions({bridge: true});
            await driver.get('https://oauth.vk.com/authorize?client_id=51405187&display=page&scope=wall,photos,friends,video,market,email,offline&response_type=token&v=5.131');
            await driver.findElement({name: 'email'}).sendKeys(this.login)
            await driver.sleep(3000)
            await driver.findElement({name: 'pass'}).sendKeys(this.pass)
            await driver.findElement({id: 'install_allow'}).click()
            await driver.sleep(3000)
            let url = await  driver.getCurrentUrl()
            await driver.close()
            return url

    }

}
module.exports = autorize_class


