let a = async (arr) => {
  arr[2] = "45";
  return arr;
};

this.arr = ["1", "2", "3"];

this.arr = a(this.arr);

console.log(this.arr);
