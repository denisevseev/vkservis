const { canComments, Filter_group } = require("./requests");
const delay = require("./delay");
const wsSend = require("./wsSendData");
const filter_type_is_closed = async (data, arr, ws) => {
  this.arr = [];
  if (data.is_closed) {
    await wsSend(ws, "", "", "Фильтруем группы на закрытость");
    //фильтр на открытые закрытые
    arr.map((key) => {
        if (key?.is_closed == data?.is_closed) {
          this.arr.push(key);
          console.log(key?.is_closed);
        }
    });
  }
  if (this.arr.length > 0) {
    return this.arr;
  } else {
    return arr;
  }
};

const filter_exclude = (data, arr) => {
  //филтр на слова исключения
  this.inputValue2 = data.inputValue2.split("\n");
  this.arr = [];
  if (this.inputValue2) {
    //если поле от клиента исключить сообщества со словами не пустое
    arr.map((key) => {
      this.inputValue2.map((valKey) => {
        if (key?.name.toLowerCase().indexOf(valKey.toLowerCase()) === -1) {
          this.arr.push(key);
          // console.log(key.name);
        }
      });
    });
  }
  return this.arr;
};

const filter_type = (data, arr) => {
  //фильтр по типу сообщества
  let sendArr = [];
  if (data.type) {
    try {
      arr.map((key) => {
        if (key.type == data.type) {
          sendArr.push(key);
        }
      });
    } catch (e) {
      console.log(e);
    }
    if (sendArr.length > 0) {
      return sendArr;
    } else {
      return arr;
    }
  } else {
    return arr;
  }
};

const can_Comments = async (ws, arr, token) => {
  this.arr = [];
  this.arr15 = [];
  let count = 0;
  while (count < arr.length) {
    try {
      let result = await canComments(arr[count].id, token);
      if (result.response.items[1].comments.can_post == 1) {
        await delay(1, 1);
        this.arr.push(arr[count]);
        console.log("обработано сообществ");
        await wsSend(
          ws,
          "",
          "",
          `обработано сообществ ${count} из  ${arr.length}`
        ); //прогресс
      }
    } catch (e) {
      try {
        if (result.error.error_code === 15) {
          this.arr15.push(arr[count]); //если нарвался на закрытую группу
        }
      } catch (e) {
        this.arr.push(arr[count]);
      }
    }

    count++;
  }
  let data = {
    arr: this.arr, //массив с открытыми комментами
    arr15: this.arr15, //массив закртытых
  };
  return data;
};

const openWalls = async (arr, token, count) => {
  let arrForOwn = [];
  let lengthArr = Math.ceil(arr.length / 499);
  let arrFromClient = arr;
  let arrIds = [];
  this.i = 0;
  let id = null;
  let whileCicle = () => {
    let i = 0;
    arrIds = [];
    for (i; i < arrFromClient.length; i++) {
      id = arrFromClient.shift();
      if (id) {
        arrIds.push(id.id);
      }
      if (i >= arrFromClient.length - 1 || i >= 499) {
        return arrIds;
        break;
      }
    }
  };

  while (arrFromClient.length > 1) {
    let result = await whileCicle();
    let resultReq = await Filter_group(result, token);
    arrForOwn = arrForOwn.concat(resultReq);
    this.i++;
  }
  let arr2 = [];

  if (arrForOwn.length > 0) {
    if (count) {
      //если колич участников
      for (let i = 0; i < arrForOwn.length; i++) {
        try {
          arr2.push(arrForOwn[i].response);
        } catch (e) {
          console.log(e);
        }
      }
      return arr2;
    }
    arrForOwn.map((key1) => {
      key1.response?.map((key2) => {
        if (key2.can_post === 1) {
          arr2.push(key2);
        }
      });
    });
    return arr2;
  }
};

module.exports = {
  filter_type_is_closed,
  filter_exclude,
  filter_type,
  can_Comments,
  openWalls,
};
