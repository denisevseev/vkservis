const easyvk = require('easyvk');
const wssend = require("./wsSendData");
class autorize_class {
  constructor(login, pass) {
    this.login = login;
    this.pass = pass;
  }
  async autorizeMethod(data) {
    let vk = await easyvk({
      username: this.login,
      password: this.pass,
      utils: {
        bots: true
      }
    });

    let me = await vk.call('users.get', {});
    return me.queryData.access_token
    console.log(me)

  }
}
module.exports = autorize_class;
