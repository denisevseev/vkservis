// const app = express();
// const ws = require("express-ws")(app);
// const WebSocket = require("ws");
// const express = require("express");
// class SendMessage_class{
//     constructor(data) {
//         this.data =data
//     }
//     sendMessage() {
//             ws.on("message", (mes) => {
//                 let d = 0;
//                 // console.log(message)
//                 let message = JSON.parse(mes);
//                 console.log(message, "message from client 33");
//                 if (message == "getres") {
//                     // && (this.arr[this.i] != this.d))
//                     console.log(message, "message from client");
//
//                     setInterval(() => {
//                         if (this.arrForsend.length > 0) {
//                             let data = JSON.stringify(this.arrForsend);
//                             console.log(data, "server data arr for send");
//                             ws.send(data);
//                         }
//                     }, 3000);
//
//                     // this.d = this.arr[this.i]
//                 }
//             });
//     }
// }
// module.exports = SendMessage_class