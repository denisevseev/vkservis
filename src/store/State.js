﻿import { makeAutoObservable, observable, toJS } from "mobx";
import { configure } from "mobx";

class Search {
  Group = null;
  Loader = false;
  inputValue = "";
  sendMessage = "";
  SendDone = [];
  i = 0;
  token = null;
  clientSend = false;
  login = null;
  pass = null;
  last_name = null;
  first_name = null;
  photo = null;
  start = false;
  avatar = null;
  startSend = null;
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

  constructor() {
    configure({
      useProxies: "never",
      enforceActions: "never",
    });
    makeAutoObservable(this, {
      Group: observable,
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

  changeInput(data) {
    //ключевое слово для поиска групп
    this.inputValue = data;
  }
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
      if(this.progress>=99){
        this.progress=null
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

  Return_obj_text_all_area() {
    let user = {
      first_name: this.first_name,
      last_name: this.last_name,
      photo: this.photo,
      inputValue: this.inputValue,
      sendMessage: this.sendMessage,
      subsOt: this.subsOt,
      subsDo: this.subsDo,
      Ot: this.Ot,
      Do: this.Do,
    };
    return user;
  }

  setLocalStorageArea() {
    localStorage.setItem(
      "textAll",
      JSON.stringify(this.Return_obj_text_all_area())
    );
  }

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

  ResultGroup() {
    this.setLocalStorageArea();
    const connect = () => {
      const ws = new WebSocket(`ws://localhost:3001/startSend`);
      console.log("client start");
      ws.onopen = () => {
        console.log("client open", this.Loader);
        if (!this.start) {
          let data = JSON.stringify({
            data: this.inputValue,
            token: this.token,
            messForSend: this.sendMessage,
            Ot: this.Ot,
            Do: this.Do,
            subsOt: this.subsOt,
            subsDo: this.subsDo,
          });
          ws.send(data);
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
