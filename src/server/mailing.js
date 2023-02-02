const { posts_request } = require("./requests");
const delay = require("./delay");
const wssend = require("./wsSendData")
class Mailing {
  constructor() {
    this.token = null;
    this.groupArrMailing = [];
    this.i = 0;
    this.messForSend = null;
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

  isError = async (ws)=>{
    if(this.group_post.error){
      await wssend(ws, this.group_post.error_msg)
    }else{
      wssend(ws, this.postDataMethod().owner_id)
    }
  }

  mailingToGroups = async (data, ws) => {
    if (data && !this.token) {
      this.groupArrMailing = data.groupArrMailing; //массив групп для рассылки по ним
      this.token = data.token;
      this.messForSend = data.messForSend;
      console.log(data, "8MAILING");
      while (this.i < 70) {
        this.group_post = await posts_request(this.postDataMethod());
        console.log(this.group_post, this.i);
        await this.isError(ws) //проверка на то есть ли ошибки в ответе
        await delay(); //задержка
        this.i++;
      }
    }else {
      this.i=70 //тем самым останавливаем рассылку
    }

  };

  // //рассылка по группам
  // this.post_data = {
  //   i: this.i,
  //   message: this.message,
  //   arr: this.arr,
  //   arrForsend: this.arrForsend,
  //   token: this.token,
  //   Ot: this.Ot,
  //   Do: this.Do,
  //   subsDo: this.subsDo,
  //   subsOt: this.subsOt,
  // };
  // //рассылка по группам
  // this.group_post = await Group_post(this.post_data);
  // //рассылка по группам
  // await this.i_res_arr(); //получаю данные с гроуп пост
  // await this.is_error(ws); //если ошибка
  // await this.if_err_send_err();
  // await this.if_arr(); //проверяем длинну массиива и проверяем на ошибки
  //
  // while (this.i < this.isArr70()) {
  //   console.log(this.i, this.arr.length, "!!!!!!!!!");
  //   if (this.mailing == "70" || this.error_msg) {
  //     await wssend(ws, this.arrForsend, this.error_msg);
  //     this.VariblesNull();
  //     break;
  //   } else {
  //     await this.while_i();
  //   }
  // }
}

module.exports = Mailing;
