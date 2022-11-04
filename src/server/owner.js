const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const ws = require("express-ws")(app);
const Group_post = require("./posts");
const splitToken = require("./token");
const autorize_class = require("./autorize");
const wssend = require("./wsSendData");
const getUserInfo = require("./getUserInfo");
const { Filter_group } = require("./requests");
const { groups_search } = require("./GroupSearch");
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

class searchGroup {
  constructor() {
    this.token = null;
    this.arr = [];
    this.message = null;
    this.i = 0;
    this.arrForsend = [];
    this.d = null;
    this.wsOnMessage = false;
    this.login = null;
    this.pass = null;
    this.start = false;
    this.mailing = 0;
    this.startAuto = false;
    this.arr2 = [];
    this.inputSubsOt = null;
    this.inputSubsDo = null;
    this.result = false;
    this.post_data = null;
    this.error_msg = null;
    this.autorizeconst = null;
    this.tumbler = false;
    this.offset = 0;
    this.count = 2;
    this.arrName = [];
    this.dataSend = null;
  }

  VariblesNull() {
    this.message = null;
    this.login = null;
    this.pass = null;
    // this.token =  null
    this.arr = [];
    this.arrForsend = [];
    this.i = 0;
    this.startAuto = false;
    this.mailing = "70";
  }

  async AutorizeOwnMethod(data, ws) {
    console.log(data, "71");
    this.startAuto = true;
    // if (!this.tumbler) {
    //     this.login = data.login
    this.autorizeconst = new autorize_class(data.login, data.pass);
    // this.tumbler = true
    // }

    const gettoken = await this.autorizeconst.autorizeMethod(data);
    if (gettoken.indexOf("captcha") > -1) {
      await wssend(ws, gettoken);
    } else {
      this.token = await splitToken(gettoken);

      const userInfo = new getUserInfo(this.token[0]);
      await userInfo.getUser();
      const user = await userInfo.returnUserinfo();
      console.log(this.token);
      await wssend(ws, this.token, JSON.stringify(user));
      await ws.close();
      return;
    }
  }

  returnToken() {
    return this.token;
  }

  owner_i() {
    this.mailing = "70";
    wssend(ws, null, null);
    this.VariblesNull();
    console.log(this.i, this.mailing);
  }

  async StopSend(mes) {
    let data = JSON.parse(mes);
    if (data == "70" || !data || data === null) {
      this.VariblesNull();
    }
  }

  CheckIsSend(ws) {
    let interval = setInterval(() => {
      if (ws.readyState != 1) {
        clearInterval(interval);
      }
      if (this.arrForsend) {
        this.arrForsend.length > 0 ? wssend(ws, this.arrForsend) : "";
      }
    }, 2000);
  }

  async searchGr() {
    let result = await groups_search(
      this.dataSend, //строка поиска групп
      this.token,
      this.arr,
      this.offset
    ); //поиск групп
    this.arr.concat(result.result);
    if (!this.tumbler) {
      this.tumbler = true; //чтобы дважды не присваивать значение count
      if (result.count > 990) {
        this.count = 100;
      }
    }
  }

  async is_error(ws) {
    try {
      if (this.result.error.error_msg) {
        this.error_msg = this.result.error.error_msg;
        await wssend(ws, this.error_msg);
        return this.error_msg;
      }
    } catch (e) {
      console.log("error в ответе не найден");
    }
  }

  async resultArr() {
    let set = [...new Set(this.arr)];
    this.arr = set;
    this.arr.map((elName) => {
      this.arrName.push(elName.name);
    }); //создаем массив имен
    let setname = [...new Set(this.arrName)]; //уникализируем массив имен
    this.arrName = setname;
  }

  resetGlobVar() {
    this.tumbler = false;
    this.offset = 0;
    this.count = 2;
    this.arrName = [];
    this.dataSend = null;
  }

  async whileMethod(data, ws) {
    while (this.offset < this.count) {
      if (this.offset === 0) {
        this.dataSend = data.data;
      } else {
        let mess = this.arrName[this.offset]; //строка поиска групп
        let dataSend = data.data;
        if (mess) {
          if (
            mess.indexOf(dataSend) > -1 ||
            mess.indexOf(dataSend.toUpperCase()) > -1
          ) {
            // indexOf проверка вхождения слова заданного пользователем
            this.dataSend = mess;
          }
        } else {
          this.offset++;
          // this.whileMethod(data);
        }
      }
      await this.searchGr();
      await this.resultArr();
      this.offset++;
      await wssend(ws, "", "", this.offset);
    }
  }

  writeFile(data) {
    let arr = [];
    this.arr.map((el) => {
      let arrEl = el.name;
      let dataArr = data.data;
      if (
        arrEl.indexOf(dataArr) > -1 ||
        arrEl.indexOf(dataArr.toUpperCase()) > -1
      ) {
        //точноное соответствие с названием группы
        arr.push(el.id);
      }
    });
    let set = [...new Set(arr)]; //здесь повторно уникализируем массив айдишников
    // set.map((el) => {
    //     fs.appendFileSync("group.txt", `\n${JSON.stringify(el)}`);
    // });
    this.arr = set;
  }

  async instanceArr() {
    if (this.arr instanceof Array) {
      this.resetGlobVar(); //обнуляем переменные
      this.result = await Filter_group(this.token, this.arr);
      let return_err = await this.is_error(ws);
      if (return_err) {
        return return_err;
      }
      this.arr = [];
    }
  }

  async ifResultRes() {
    if (this.result.response) {
      await this.result.response.map((el) => {
        el.members_count >= this.subsOt &&
        el.members_count <= this.subsDo &&
        this.subsDo != undefined &&
        this.subsOt != undefined &&
        el.can_post === 1
          ? this.arr.push(el.id)
          : null;
      });
    } else {
      console.log("error");
      return "error";
    }
  }

  isArr70() {
    let arr = this.arr.length > 70 ? 70 : this.arr.length;
    return arr;
  }

  i_res_arr() {
    this.arrForsend = this.group_post.arrForsend;
    this.result = this.group_post.result;
  }

  async if_err_send_err() {
    //если ошибка то отправляем ее
    await wssend(ws, this.arrForsend, this.error_msg);
    if (this.error_msg) {
      this.VariblesNull(); //и обнуляем данные
    }
  }

  async if_arr() {
    console.log(this.arrForsend.length, "arr forsend leng");
    if (this.arrForsend.length > 0) {
      await this.if_err_send_err();
    }
  }

  async while_i() {
    this.post_data.i++;
    this.i = this.post_data.i;
    this.group_post = await Group_post(this.post_data);
    await this.i_res_arr();
    await this.if_arr();
  }

  async searchGroupMethod(data, ws) {
    if (data) {
      this.message = data.messForSend;
      this.login = data.login;
      this.pass = data.pass;
      this.token = data.token;
      this.mailing = 0;
      this.Do = data.Do;
      this.Ot = data.Ot;
      this.subsOt = data.subsOt;
      this.subsDo = data.subsDo;
    }

    if (this.token && data) {
      this.start = true;

      await this.whileMethod(data, ws);
      await this.writeFile(data); //запись в файл

      await this.instanceArr();
      let ifResult = await this.ifResultRes();
      if (ifResult == "error") {
        return;
      }

      this.post_data = {
        i: this.i,
        message: this.message,
        arr: this.arr,
        arrForsend: this.arrForsend,
        token: this.token,
        Ot: this.Ot,
        Do: this.Do,
        subsDo: this.subsDo,
        subsOt: this.subsOt,
      };

      this.group_post = await Group_post(this.post_data);

      await this.i_res_arr(); //получаю данные с гроуп пост
      await this.is_error(ws); //если ошибка
      await this.if_err_send_err();
      await this.if_arr(); //проверяем длинну массиива и проверяем на ошибки

      while (this.i < this.isArr70()) {
        console.log(this.i, this.arr.length, "!!!!!!!!!");
        if (this.mailing == "70" || this.error_msg) {
          await wssend(ws, this.arrForsend, this.error_msg);
          this.VariblesNull();
          break;
        } else {
          await this.while_i();
        }
      }
    }
  }
}

module.exports = searchGroup;
