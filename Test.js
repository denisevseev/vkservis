var usersList = [
  { firstName: "Adam", lastName: "Yousif", age: 23 },
  { firstName: "Mohamed", lastName: "Ali" },
  { firstName: "Mona", lastName: "Ahmed", age: 19 },
];

var usersList2 = [
  { firstName: "Adam", lastName: "Yousif", age: 45 },
  { firstName: "Mohamed", lastName: "Ali" },
  { firstName: "Mona", lastName: "Ahmed", age: 55 },
];
usersList.map((k) => {
  console.log(k.age);
  usersList2.map((l) => {
    console.log(l.age);
  });
});
