const { posts_request } = require("./requests");
const delay = require("./delay");
const wssend = require("./wsSendData");
class Mailing {
  constructor() {
    this.token = null;
    this.groupArrMailing = [];
    this.i = 0;
    this.messForSend = null;
    this.from = "";
    this.before = "";
  }
  // async while_i() {
  //     this.i++;
  //     this.group_post = await Group_post(this.post_data);
  //     await this.i_res_arr();
  //     await this.if_arr();
  // }

  postDataMethod = () => {
    let postData = {
      message: this.messForSend, //сообщение для рассылки
      owner_id: this.groupArrMailing[this.i], //айди группы
      token: this.token,
    };
    return postData;
  };

  isError = async (ws) => {
    if (this.group_post.error) {
      await wssend(ws, this.group_post.error_msg);
    } else {
      wssend(ws, this.postDataMethod().owner_id);
    }
  };

  mailingToGroups = async (data, ws) => {
    if (data && !this.token) {
      this.groupArrMailing = data.groupArrMailing; //массив групп для рассылки по ним
      this.token = data.token;
      this.messForSend = data.messForSend;
      this.from = data.from;
      this.before = data.before;
      console.log(data, "8MAILING");
      while (this.i < 70) {
        this.group_post = await posts_request(this.postDataMethod());
        console.log(this.group_post, this.i);
        await this.isError(ws); //проверка на то есть ли ошибки в ответе
        await delay(data.from, data.before); //задержка
        this.i++;
      }
    } else {
      this.i = 70; //тем самым останавливаем рассылку
    }
  };
}

module.exports = Mailing;
