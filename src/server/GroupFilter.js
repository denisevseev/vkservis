const filter_type_is_closed = async (data, arr) => {
  this.arr = [];
  if (data.is_closed) { //фильтр на открытые закрытые
    arr.map((key) => {
      if (key.is_closed == data.is_closed) {
        this.arr.push(key);
        console.log(key.is_closed);
      }
    });
  }
  if(this.arr.length>0){
    return this.arr
  }else {
    return  arr
  }
};

const filter_exclude = (data, arr) => { //филтр на слова исключения
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

const filter_type = (data, arr) => { //фильтр по типу сообщества
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
module.exports = {
  filter_type_is_closed,
  filter_exclude,
  filter_type,
};
