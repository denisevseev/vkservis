// import { Server } from "socket.io";
//
// const io = new Server({
//     // options
// });
//
// io.on("connection", (socket) => {
//     // ...
// });
//
// io.listen(3000);
let arr = ["sdf", "sdf", "sadf", "sdf", "sdf"];
arr.map((k, i) => {
  if (i === 2) {
    return;
  }
  console.log(i);
});
