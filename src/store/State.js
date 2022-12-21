import { makeAutoObservable, observable, toJS } from "mobx";
import { configure } from "mobx";
import { Country, City, Groups, Groups2 } from "../client/options/Options";

class Search {
  Group = null;
  Loader = false;
  inputValue = [];
  sendMessage = "";
  SendDone = [];
  i = 0;
  token = null;
  clientSend = false;
  validation = false;
  login = null;
  pass = null;
  last_name = null;
  first_name = null;
  photo = null;
  start = false;
  avatar = null;
  startSend = null;
  inputValue2 = ""; //исключить сообщества со словами
  Search_CheckIsSend = false;
  Ot = "";
  Do = "";
  subsOt = undefined;
  subsDo = undefined;
  errorFromServer = undefined;
  captcha = null;
  captchaValue = null;
  tumbler = false;
  progress = null;
  //чекбоксы
  exclude = true; // исключить сообщества со словами
  reqMustTitle = false; //запрос обязан быть в названии галочка
  openWalls = false; // открытые стены галочка
  openMessages = false; //открытые сообщения галочка
  openComments = false; //открытые комментарии галочка
  countMembers = false; //колич участников галочка
  fromToMembersBoolean = true; //от до галка колич участников вклчает возможность ввода текстовых полей
  //страны и города
  Country = Country[0].label;
  City = City[0].label;
  is_closed = Groups[0];
  allGroups2 = Groups2[0];

  countMemFrom = null;
  countMemTo = null;

  constructor() {
    configure({
      useProxies: "never",
      enforceActions: "never",
    });
    makeAutoObservable(this, {
      Group: observable,
      validation: observable,
      countMemFrom: observable,
      countMemTo: observable,
      City: observable,
      inputValue2: observable,
      fromToMembersBoolean: observable,
      allGroups2: observable,
      is_closed: observable,
      Country: observable,
      countMembers: observable,
      openWalls: observable,
      openComments: observable,
      openMessages: observable,
      exclude: observable,
      reqMustTitle: observable,
      progress: observable,
      captchaValue: observable,
      captcha: observable,
      errorFromServer: observable,
      subsOt: observable,
      subsDo: observable,
      Ot: observable,
      Do: observable,
      inputValue: observable,
      sendMessage: observable,
      SendDone: observable,
      last_name: observable,
      first_name: observable,
      photo: observable,
      login: observable,
      clientSend: observable,
      pass: observable,
      start: observable,
      avatar: observable,
      token: observable,
      Search_CheckIsSend: observable,
    });
  }

  // selectPlaceholder(val, data) {
  //   let result = data.map((key)=>{
  //     if(key.value==val){
  //       return key.label
  //     }
  //   })
  //
  // }

  handleCheck(data, target) {
    if (data == "countMembers" && target) {
      this.fromToMembersBoolean = false;
    } else if (data == "countMembers") {
      this.fromToMembersBoolean = true;
    }
    if (data == "openComments" && target) {
      this.openComments = true;
    } else if (data == "openComments") {
      this.openComments = false;
    }
    if (data == "openMessages" && target) {
      this.openMessages = true;
    } else if (data == "openMessages") {
      this.openMessages = false;
    }
    if (data == "exclude" && target) {
      this.exclude = false;
    } else if (data == "exclude") {
      this.exclude = true;
    }
    if (data == "reqMustTitle" && target) {
      this.reqMustTitle = true;
    } else if (data == "reqMustTitle") {
      this.reqMustTitle = false;
      console.log(this.reqMustTitle);
    }
    if (data == "openWalls" && target) {
      this.openWalls = true;
    } else if (data == "openWalls") {
      this.openWalls = false;
    }
  }
  changeInput = (val, target) => {
    this.validation = false;
    //ключевое слово для поиска групп
    let result = target;
    if (val == "val1") {
      this.inputValue = result;
      console.log(this.inputValue);
    }
    if (val == "val2") {
      this.inputValue2 = result; //исключить сообщества со словами
    }
  };
  Login() {
    this.avatar = JSON.parse(localStorage.getItem("user"));
    return this.avatar;
  }

  Logout() {
    localStorage.removeItem("user");
    let ws = new WebSocket(`ws://localhost:3001/stopsend`);
    console.log(ws);
    ws.onopen = async () => {
      console.log(ws, "58");
      console.log("61 satte");
      await ws.send(null);
      await window.location.reload();
      ws.close();
    };
  }
  MessageForSend(mess) {
    // сообщение для рассылки
    this.sendMessage = mess;
  }

  loginMethod(data) {
    this.login = data;
    console.log(this.login);
  }
  password(data) {
    this.pass = data;
    console.log(this.pass);
  }
  StartFalse() {
    this.start = false;
    this.startSend = false;
    this.SendDone = [];
  }

  StopSend() {
    let ws = new WebSocket(`ws://localhost:3001/stopsend`);
    this.StartFalse();
    ws.onopen = () => {
      ws.send(this.token);
    };
  }

  istoken() {
    let data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      this.token = data.token;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.photo = data.photo;
      return this.token;
    } else {
      return null;
    }
  }

  ChangeOt(value) {
    this.Ot = value;
  }
  ChangeDo(value) {
    this.Do = value;
  }
  ChangeSubsOt(value) {
    this.subsOt = value;
  }

  ChangeSubsDo(value) {
    this.subsDo = value;
  }
  GetLoginData() {
    let data = JSON.parse(localStorage.getItem("loginData"));
    if (data) {
      this.login = data.login;
      this.pass = data.pass;
    }
  }

  AutorizeOwnMethod() {
    let ws = new WebSocket(`ws://localhost:3001/autorize`);
    ws.onopen = () => {
      let data = JSON.stringify({
        login: this.login,
        pass: this.pass,
        captchaValue: this.captchaValue,
      });
      localStorage.setItem("loginData", data);
      ws.send(data);
    };

    ws.onmessage = (event) => {
      let dataEvetn = JSON.parse(event.data);
      if (this.token === null && localStorage.getItem("token") === null) {
        if (dataEvetn.arr[0].length > 50) {
          this.token = dataEvetn.arr[0];
          let data = JSON.parse(dataEvetn.userData); //получаем аватарку с сервера
          this.first_name = data[0].first_name;
          this.last_name = data[0].last_name;
          console.log(this.last_name, "lastname");
          this.photo = data[0].photo_50;
          let user = {
            token: this.token,
            first_name: this.first_name, //данные для аватарки
            last_name: this.last_name,
            photo: this.photo,
          };
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
      if (dataEvetn.arr.indexOf("captcha") > -1) {
        this.captcha = dataEvetn.arr;
      } else {
        ws.close();
      }
    };
  }

  CheckIsSend() {
    let ws = new WebSocket(`ws://localhost:3001/CheckIsSend`);

    ws.onopen = (e) => {
      console.log(this.token);
      ws.send(this.token);
    };
    ws.onerror = (e) => {
      console.log(ws.readyState);
    };
    ws.onmessage = (event) => {
      this.WsOnMessage(ws, event);
    };
  }

  WsOnMessage(ws, event) {
    let dataEvent;
    let data = JSON.parse(event.data);
    if (data.progress) {
      this.progress = data.progress;
      if (this.progress >= 99) {
        this.progress = null;
      }
      return;
    }
    if (event && !data.progress) {
      dataEvent = JSON.parse(event.data);
      if (dataEvent.userData) {
        this.errorFromServer = dataEvent.userData;
        console.log(this.errorFromServer);
      }
      console.log(dataEvent.userData);
      if (dataEvent && this.startSend === null) {
        this.start = true;
        this.startSend = true;
      }
      let result = dataEvent.arr.concat(this.SendDone);
      let finalresult = [...new Set(result)];
      this.SendDone = toJS(finalresult);
      console.log(this.SendDone);
    }
  }

  SendDoneReturn() {
    return this.SendDone;
  }

  // Return_obj_text_all_area() {
  //   let user = {
  //     first_name: this.first_name,
  //     last_name: this.last_name,
  //     photo: this.photo,
  //     inputValue: this.inputValue,
  //     exclude: this.exclude, //галочка исключить сообщества со словами
  //     sendMessage: this.sendMessage,
  //     subsOt: this.subsOt,
  //     subsDo: this.subsDo,
  //     Ot: this.Ot,
  //     Do: this.Do,
  //   };
  //   return user;
  // }

  //
  // setLocalStorageArea() {
  //   localStorage.setItem(
  //     "textAll",
  //     JSON.stringify(this.Return_obj_text_all_area())
  //   );
  // }

  getUser() {
    let data = localStorage.getItem("user");
    if (data) {
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.photo = data.photo;
    }
  }

  getLocalStorageArea() {
    if (!this.tumbler) {
      //проверяет был ли вызван уже этот метод
      let data = JSON.parse(localStorage.getItem("textAll"));
      if (data) {
        this.tumbler = true;
        this.inputValue = data.inputValue;
        this.sendMessage = data.sendMessage;
        this.subsOt = data.subsOt;
        this.subsDo = data.subsDo;
        this.Ot = data.Ot;
        this.Do = data.Do;
        return data;
      } else {
        return "";
      }
    }
  }

  groupLookUpValues = () => {
    let data = JSON.stringify({
      inputValue: this.inputValue[0] != "" ? this.inputValue : false, //запросы
      inputValue2: this.inputValue2[0] != "" ? this.inputValue2 : false, //исключить сообщества со словами
      // reqMustTitle: this.reqMustTitle,
      openWalls: this.openWalls,
      openComments: this.openComments,
      countMemFrom: this.countMemFrom,
      countMemTo: this.countMemTo,
      is_closed: this.is_closed,
      type: this.allGroups2.value,
      city: this.City.indexOf("Люб") > -1 ? false : this.City,
      country: this.Country.indexOf("Люб") > -1 ? false : this.Country,
      token: this.token,
    });

    return data;
  };

  formValidation = () => {
    if (!this.inputValue[0]) {
      this.validation = true; //валидация первого поля поиска групп
    }
  };

  startSearch = () => {
    const ws = new WebSocket(`ws://localhost:3001/startSearch`);
    ws.onopen = () => {
      let data = this.groupLookUpValues();
      console.log(data, "384");
      this.formValidation();
      if (!this.validation) {
        this.validation = false;
        ws.send(data);
      }
    };
  };

  ResultGroup() {
    // this.setLocalStorageArea();
    const connect = () => {
      const ws = new WebSocket(`ws://localhost:3001/startSend`);
      console.log("client start");
      ws.onopen = () => {
        console.log("client open", this.Loader);
        if (!this.start) {
          // let data = JSON.stringify({
          //   data: this.inputValue,
          //   token: this.token,
          //   messForSend: this.sendMessage,
          //   Ot: this.Ot, //задержка в секундах для рассылки
          //   Do: this.Do,
          //   subsOt: this.subsOt, //кол-во подписчиков
          //   subsDo: this.subsDo,
          // });
          // ws.send(data);
          this.start = true;
        }
      };
      ws.onmessage = (event) => {
        this.WsOnMessage(ws, event);
      };

      // this.WsOnMessage(ws);

      ws.onerror = (err) => {
        console.error(
          "Socket encountered error: ",
          err.message,
          "Closing socket"
        );
        ws.close();
      };
    };
    connect();
  }
}

export default new Search();
let search = new Search();
search.GetLoginData();
search.getUser();
