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
const { Filter_group, canComments } = require("./requests");
const { groups_search } = require("./GroupSearch");
const {
  filter_type_is_closed,
  filter_exclude,
  filter_type,
  can_Comments,
  openWalls,
} = require("./GroupFilter");
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
    this.unique_arr = [];
    this.message = null;
    this.filteredArr = []; //сюда добавляем отфильтрованные группы
    this.filterCount = 0; //счетчик айдишников для фильтрации
    this.i = 0;
    this.arr15 = []; //массив закрытых групп
    this.arrForsend = [];
    this.d = null;
    this.wsOnMessage = false;
    this.login = null;
    this.pass = null;
    this.start = false;
    this.mailing = 0;
    this.startAuto = false;
    this.result = false;
    this.post_data = null;
    this.error_msg = null;
    this.autorizeconst = null;
    this.arr_str_for_search = 0;
    this.is_closed = "";
    this.type = "";
    this.count = 2;
    this.reqMustTitleCount = 0;
    this.arrName = [];
    // this.dataSend = null;
  }

  VariblesNull() {
    //старое удалить
    this.message = null;
    this.login = null;
    this.pass = null;
    // this.token =  null
    this.arr = [];
    this.arrForsend = [];
    this.i = 0;
    this.startAuto = false;

    // новое
    // this.mailing = "70";
  }

  async AutorizeOwnMethod(data, ws) {
    console.log(data, "71");
    this.startAuto = true;
    this.autorizeconst = new autorize_class(data.login, data.pass);

    const gettoken = await this.autorizeconst.autorizeMethod(data);
    if (gettoken.indexOf("captcha") > -1) {
      await wssend(ws, gettoken); //если капча то отправляем ее кленту
    } else {
      this.token = await splitToken(gettoken); //вычленение токена из строки

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
    await wssend(ws, "", "", "идет поиск групп");
    let result = await groups_search(this.searchParams()); //поиск групп
    this.arr = this.arr.concat(result.arr); //в this.arr собираем массив с каждого поискового запроса со счетчиком
  }

  searchParams = () => {
    let arr = {
      inputValue: this.inputValue,
      inputValue2: this.inputValue2,
      reqMustTitle: this.reqMustTitle,
      openWalls: this.openWalls,
      openComments: this.openComments,
      countMemTo: this.countMemTo,
      countMemFrom: this.countMemFrom,
      city: this.city,
      country: this.country,
      token: this.token,
      //счетчик не клиентские данные
      arr_str_for_search: this.arr_str_for_search,
    };
    return arr;
  };

  async is_error(ws) {
    //если ошибка
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

  // async resultArr() {
  //   let set = [...new Set(this.arr)];
  //   this.arr = set;
  //   this.arr.map((elName) => {
  //     this.arrName.push(elName.name);
  //   }); //создаем массив имен
  //   let setname = [...new Set(this.arrName)]; //уникализируем массив имен
  //   this.arrName = setname; //массив уникальных имен
  // }

  resetGlobVar() {
    //обнуление данных
    this.arr_str_for_search = 0;
    this.count = 2;
    this.arrName = [];
  }

  async whileMethod(data, ws) {
    let lengthInputValue = this.inputValue.length;
    await wssend(ws, "", "", "идет поиск сообществ"); //отсылаем прогресс клиенту
    while (this.arr_str_for_search < lengthInputValue - 1) {
      if (lengthInputValue > 1) {
        this.arr_str_for_search++; //увеличиваем счетчик если поисковых запросов больше одного
        await this.searchGr();
      } else {
        break; //иначе завершаем поиск групп
      }
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

  nothingFound = (ws) => {
    wssend(ws, "nothing", "", "");
  };

  async searchGroupMethod(data, ws) {
    if (data) {
      (this.inputValue = data.inputValue.split("\n")), // массив для поиска
        (this.inputValue2 = data.inputValue2.split("\n")), //исключить сообщества со словами
        // (this.reqMustTitle = data.reqMustTitle), //галка запрос обязан быть
        (this.is_closed = data.is_closed),
        (this.type = data.type),
        (this.openWalls = data.openWalls === false ? 0 : 1), //галочка открытые стены
        (this.openComments = data.openComments), // галочка открытые комментарии
        (this.countMemFrom = data.countMemFrom), // количество участников от
        (this.countMemTo = data.countMemTo), // кол-во участников до
        (this.city = data.city), //город
        (this.country = data.country), //страна
        (this.mailing = 0),
        (this.token = data.token);
    }

    if (this.token && data) {
      this.start = true;
      //поиск групп
      await this.searchGr();

      await this.whileMethod(data, ws);
      console.log(this.arr.length);
      //фильтр на открытые закрытые
      this.arr = await filter_type_is_closed(data, this.arr, ws);
      if (this.arr.length == 0) {
        this.nothingFound(ws);
        return;
      } else {
        if (this.inputValue2 != "") {
          this.arr = await filter_exclude(data, this.arr);
        }
      }

      if (this.arr.length == 0) {
        this.nothingFound(ws);
        return;
      } else {
        if (this.openComments) {
          //тут запускаем цикл фильтрации каждой группы на возможность оставлять комменты
          await wssend(
            ws,
            "",
            "",
            "запускаем цикл фильтрации каждой группы на возможность оставлять комменты"
          );
          let result = await can_Comments(this.arr, this.token);
          this.arr = await result.arr;
          this.arr15 = result.arr15;
        }
      }

      //если нет запроса от клиента на только открытые группы то соед два массива
      if (this.is_closed == "" || this.is_closed == "1") {
        this.arr.concat(this.arr15);
      }

      //если есть галочка открытая стена
      if (this.openWalls) {
        await wssend(ws, "", "", "фильтруем открытые стены");
        let result = await openWalls(this.arr, this.token);
        this.arr = result;
      }

      //фильтр количества подписчиков
      if (this.countMemTo || this.countMemFrom) {
        await wssend(ws, "", "", "фильтр количества подписчиков");
        let arrCount = [];
        this.arr.map((key) => {
          if (
            key.members_count >= this.countMemFrom ||
            key.members_count <= this.countMemTo
          ) {
            arrCount.push(key);
          }
        });
        this.arr = arrCount;
      }
      await wssend(ws, "", "", "фильтруем тип сообществ");
      this.arr = await filter_type(data, this.arr); //фильтр типа группы (public, event, group)
      await wssend(ws, this.arr, "", null); //отправка финального массива поиска групп
      console.log("307");

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
  }
}

module.exports = searchGroup;
