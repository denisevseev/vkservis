// // const axios = require("axios");
// const delay = require('./delay')
// // const posts = require('./requests')
// // const search  = require('./requests')
// const {posts_request} = require("./requests");
// class Group_post {
//     constructor(i, message, arr, arrForsend, token) {
//         this.i = i;
//         this.message = message;
//         this.arr = arr;
//         this.arrForsend = arrForsend;
//         this.token = token;
//         this.result = null
//     }
//
//     async post(min, max) {
//         const send = async () => {
//             console.log(this.i, "this.i");
//             this.result = await posts_request(this.arr, this.i, this.message, this.token)
//             console.log("https://vk.com/club" + this.arr[this.i], "this.arr[this.i]");
//             this.i++;
//             await delay(min, max);
//             this.arrForsend.push(this.arr[this.i]);
//         };
//         await send();
//     }
//     returnArrForsend() {
//         return {
//             result: this.result,
//             arrForsend: this.arrForsend,
//             i: this.i,
//         };
//     }
// }
// module.exports = Group_post;
