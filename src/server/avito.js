const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
class Avito {
  constructor() {
    this.arr = [];
    this.driver = null;
    this.classElem = "iva-item-titleStep-pdebR";
    this.linkElem =
      "https://www.avito.ru/moskva/komnaty/sdam/na_dlitelnyy_srok-ASgBAgICAkSQA74QqAn2YA?cd=1&f=ASgBAQECA0SQA74QqAn2YPbiDqzx2wIBQPjiDiS08dsCsPHbAgNF_AcVeyJmcm9tIjoxMiwidG8iOm51bGx9hi4UeyJmcm9tIjo1LCJ0byI6bnVsbH3GmgwZeyJmcm9tIjoxMzAwMCwidG8iOjI1MDAwfQ&footWalkingMetro=5&localPriority=0";
  }
  async list() {
    this.driver = new webdriver.Builder()
      .setChromeOptions(new chrome.Options().headless())
      .forBrowser("chrome")
      .build();
    await this.driver.get(this.linkElem);
    await this.whileLinks();
  }

  async whileLinks() {
    let i = 0;
    while (i < 32) {
      let h = await this.driver.findElement({ className: this.classElem });
      let ff = h.getAttribute("baseURI").then((k) => console.log(k));
      i++;
    }
  }
}
const avito = new Avito();
avito.list();
