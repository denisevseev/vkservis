  const webdriver = require("selenium-webdriver");
  const chrome = require("selenium-webdriver/chrome");
  const wssend = require("./wsSendData");
  const { error } = require("selenium-webdriver");
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
          .setChromeOptions(new chrome.Options().headless())
          .forBrowser("chrome")
          .build();
        await this.driver
          .get(
            "https://oauth.vk.com/authorize?client_id=51399251&display=page&scope=wall,photos,groups,friends,video,market,email,offline&response_type=token&v=5.131"
          )
          .then((success, error) => {
            if (error) {
              console.log(error);
              throw error;
            }
          });

        await this.driver.findElement({ name: "email" }).sendKeys(this.login);
        this.tumbler = true;
      }

      try {
        await this.driver.findElement({ name: "pass" }).sendKeys(this.pass);
        this.captchaValue = data.captchaValue;
      } catch (e) {
        console.log(e);
      }
      if (this.captchaValue) {
        await this.driver
          .findElement({ xpath: '//*[@id="login_submit"]/div/div/input[9]' })
          .sendKeys(this.captchaValue); //вводим капчу
      }
      await this.driver.findElement({ id: "install_allow" }).click();
      try {
        await this.driver
          .findElement({
            xpath: '//*[@id="oauth_wrap_content"]/div[3]/div/div[1]/button[1]',
          })
          .click();
      } catch (e) {}
      try {
        this.captcha = await this.driver
          .findElement({ xpath: '//*[@id="login_submit"]/div/div/img' })
          .getAttribute("src");
      } catch (e) {
        console.log("captcha not found");
      }

      this.driver.takeScreenshot("c:\\selenium_local_map\\out1.png");
      this.driver.takeScreenshot().then(function (image, err) {
        require("fs").writeFile("out.png", image, "base64", function (err) {
          console.log(err);
        });
      });

      if (this.captcha) {
        console.log(this.captcha);
        await this.driver.quit();
        return this.captcha;
      }
      let url = await this.driver.getCurrentUrl();
      const getUrl = async () => {
        if (url) {
          return url;
        } else {
          while (!url) {
            console.log("sdf");
            let url = await this.driver.getCurrentUrl();
            if (url) {
              return url;
              break;
            }
          }
        }
      };
      let result = await getUrl();
      await this.driver.quit();
      return result;
    }
  }
  module.exports = autorize_class;
