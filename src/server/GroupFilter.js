const { canComments } = require("./requests");
const filter_type_is_closed = async (data, arr) => {
  this.arr = [];
  if (data.is_closed) {
    //фильтр на открытые закрытые
    arr.map((key) => {
      if (key.is_closed == data.is_closed) {
        this.arr.push(key);
        console.log(key.is_closed);
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
        if (key.name.toLowerCase().indexOf(valKey.toLowerCase()) === -1) {
          this.arr.push(key);
          console.log(key.name);
        }
      });
    });
  }
  return this.arr;
};

const filter_type = (data, arr) => {
  //фильтр по типу сообщества
  this.arr = [];
  if (data.type) {
    arr.map((key) => {
      if (key.type == data.type.value) {
        this.arr.push(key);
      }
    });
  }
  return this.arr;
};

const can_Comments = async (arr, token) => {
  this.arr = [];
  this.arr15 = [];
  let count = 0;
  while (count < arr.length) {
    let result = await canComments(arr[count].id, token);
    try {
      if (result.response.items[1].comments.can_post == 1) {
        this.arr.push(arr[count]);
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
module.exports = {
  filter_type_is_closed,
  filter_exclude,
  filter_type,
  can_Comments,
};
