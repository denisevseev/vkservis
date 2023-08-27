const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const wssend = require("./wsSendData");
const { error } = require("selenium-webdriver");
const { readdirSync, readFileSync } = require("fs");
class autorize_class {
  constructor(login, pass) {
    this.login = login;
    this.pass = pass;
    this.tumbler = false;
    this.captcha = null;
    this.captchaValue = null;
    this.driver = null;
  }
  async autorizeMethod(data) {
    if (!this.tumbler) {
      const webdriver = require("selenium-webdriver");
      const chrome = require("selenium-webdriver/chrome");
      const chromedriver = require("chromedriver");
      this.driver = new webdriver.Builder()
        //.setChromeOptions(new chrome.Options().headless())
        .forBrowser("chrome")
        .build();
      await this.driver
        .get(
          "https://oauth.vk.com/authorize?client_id=51404448&display=page&scope=wall,comments,posts,photos,groups,friends,video,market,email,offline&response_type=token&v=5.131"
        )
        .then((success, error) => {
          if (error) {
            console.log(error);
            throw error;
          }
        });
      await this.driver.sleep(1000);

      await this.driver
        .findElement({
          xpath:
            "/html/body/div[1]/div/div/div/div/div[1]/div/div/div/div/form/div[1]/section/div/div/div/input",
        })
        ?.sendKeys(this.login);
      this.tumbler = true;
      await this.driver
        .findElement({
          xpath:
            '//*[@id="root"]/div/div/div/div/div[1]/div/div/div/div/form/div[2]/div[1]/button[1]/span[1]/span',
        })
        .click();
      await this.driver.sleep(1000);
      await this.driver
        .findElement({
          xpath:
            '//*[@id="root"]/div/div/div/div/div[1]/div/div/div/div/form/div[1]/div[3]/div[1]/div/input',
        })
        .sendKeys(this.pass);
      await this.driver
        .findElement({
          xpath:
            '//*[@id="root"]/div/div/div/div/div[1]/div/div/div/div/form/div[2]/button/span[1]/span',
        })
        .click();
    }

    // try {
    //   this.captchaValue = data.captchaValue;
    // } catch (e) {
    //   console.log(e);
    // }
    // if (this.captchaValue) {
    //   await this.driver
    //     .findElement({ xpath: '//*[@id="login_submit"]/div/div/input[9]' })
    //     .sendKeys(this.captchaValue); //вводим капчу
    // }
    // try {
    //   await this.driver.findElement({ id: "install_allow" }).click();
    //   await this.driver
    //     .findElement({
    //       xpath: '//*[@id="oauth_wrap_content"]/div[3]/div/div[1]/button[1]',
    //     })
    //     .click();
    // } catch (e) {}
    // try {
    //   this.captcha = await this.driver
    //     .findElement({ xpath: '//*[@id="login_submit"]/div/div/img' })
    //     .getAttribute("src");
    // } catch (e) {
    //   console.log("captcha not found");
    // }
    //
    // if (this.captcha) {
    //   console.log(this.captcha);
    //   await this.driver.quit();
    //   return this.captcha;
    // }
    let url = await this.driver.getCurrentUrl(); //урл адресной строки
    const fs = require("fs");
    let file = await readFileSync("token.txt", "utf8");
    await this.driver.quit();
    return file;
    // const getUrl = async () => {
    //   if (url) {
    //     return url;
    //   } else {
    //     while (!url) {
    //       console.log("sdf");
    //       let url = await this.driver.getCurrentUrl();
    //       if (url) {
    //         return url;
    //         break;
    //       }
    //     }
    //   }
    // };
    // let result = await getUrl();
    // return result
  }
}
module.exports = autorize_class;
