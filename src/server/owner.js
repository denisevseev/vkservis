const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const ws = require("express-ws")(app);
const splitToken = require("./token");
const autorize_class = require("./autorize");
const wsSend = require("./wsSendData");
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
    const userInfo = new getUserInfo(data.token);
    await userInfo.getUser();
    const user = await userInfo.returnUserinfo();
    await wsSend(ws, data.token, JSON.stringify(user));
    await ws.close();
    return;
  }
  getOwnAuthTokenServ = async (data, ws) => {
    console.log("we starting autorization");
    let result = await new autorize_class(
      data.login,
      data.pass
    ).autorizeMethod();
    this.token = await splitToken(result);
    let resultForSend = this.token[0];
    console.log("token", resultForSend);
    await wsSend(ws, resultForSend);
    console.log("its done");
  };

  returnToken() {
    return this.token;
  }

  owner_i() {
    this.mailing = "78";
    wsSend(ws, null, null);
    this.VariblesNull();
    console.log(this.i, this.mailing);
  }

  async StopSend(mes) {
    let data = JSON.parse(mes);
    if (data == "78" || !data || data === null) {
      this.VariblesNull();
    }
  }

  CheckIsSend(ws) {
    let interval = setInterval(() => {
      if (ws.readyState != 1) {
        clearInterval(interval);
      }
      if (this.arrForsend) {
        this.arrForsend.length > 0 ? wsSend(ws, this.arrForsend) : "";
      }
    }, 2000);
  }

  async searchGr(ws) {
    await wsSend(ws, "", "", "идет поиск групп");
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
      city: this.city=='any'?null:this.city,
      country: this.country,
      token: this.token,
      //счетчик не клиентские данные
      arr_str_for_search: this.arr_str_for_search,
    };
    return arr;
  };

  resetGlobVar() {
    //обнуление данных
    this.arr_str_for_search = 0;
    this.count = 2;
    this.arrName = [];
  }

  async whileMethod(data, ws) {
    let lengthInputValue = this.inputValue.length;
    await wsSend(ws, "", "", "идет поиск сообществ");
    while (this.arr_str_for_search < lengthInputValue - 1) {
      if (lengthInputValue > 1) {
        this.arr_str_for_search++; //увеличиваем счетчик если поисковых запросов больше одного
        console.log(this.arr_str_for_search, "счетчик запросов");
        await this.searchGr(ws);
      } else {
        break;
      }
    }
  }

  isArr70() {
    let arr = this.arr.length > 78 ? 78 : this.arr.length;
    return arr;
  }

  nothingFound = (ws) => {
    wsSend(ws, "nothing", "", "");
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
        (this.countMemFrom = Number(data.countMemFrom)), // количество участников от
        (this.countMemTo = data.countMemTo), // кол-во участников до
        (this.city = data.city), //город
        (this.country = data.country), //страна
        (this.mailing = 0),
        (this.token = data.token);
    }

    if (this.token && data) {
      this.start = true;
      //поиск групп
      await this.searchGr(ws);

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
          await wsSend(
            ws,
            "",
            "",
            "запускаем цикл фильтрации каждой группы на возможность оставлять комменты"
          );
          let result = await can_Comments(ws, this.arr, this.token);
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
        await wsSend(ws, "", "", "фильтруем открытые стены");
        let result = await openWalls(this.arr, this.token);
        this.arr = result;
        if (!this.arr) {
          await this.nothingFound(ws);
          return;
        }
      }

      //фильтр количества подписчиков
      if (this.countMemTo || this.countMemFrom) {
        this.arr = await this.contMembers(ws);
        if (!this.arr||this.arr.length<1) {
          await this.nothingFound(ws, '', this.arr);
          return;
        }
      }
      await wsSend(ws, "", "", "фильтруем тип сообществ");
      this.arr = await filter_type(data, this.arr); //фильтр типа группы (public, event, group)
      await wsSend(ws, this.arr, "", null); //отправка финального массива поиска групп
    }
  }

  nothing = async (ws) => {
    await wsSend(ws, null, null);
  };

  contMembers = async (ws) => {
    await wsSend(ws, "", "", "фильтр количества подписчиков");
    let arrCount = [];
    // let result = await openWalls(this.arr, this.token, "count");
    // this.arr = result;
    try {
      this.arr.map((key) => {
        console.log(key.is_member);
        if (
          (key.members_count >= this.countMemFrom ||
            key.members_count <= this.countMemTo) &&
          (!this.countMemTo || !this.countMemFrom)
        ) {
          arrCount.push(key);
        } else {
          if (
            key.members_count >= this.countMemFrom &&
            key.members_count <= this.countMemTo
          ) {
            arrCount.push(key);
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
    return arrCount;
  };
}

module.exports = searchGroup;
