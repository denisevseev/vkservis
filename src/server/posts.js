const axios = require("axios");
const delay = require('./delay')
const posts = require('./requests')
class Group_post {
    constructor(i, message, arr, arrForsend, token) {
        this.i = i;
        this.message = message;
        this.arr = arr;
        this.arrForsend = arrForsend;
        this.token = token;
    }

    async post() {
        const send = async () => {
            console.log(this.i, "this.i");
            await posts(this.arr, this.i, this.message, this.token)
            console.log("https://vk.com/club" + this.arr[this.i], "this.arr[this.i]");
            this.i++;
            await delay(5000);
            this.arrForsend.push(this.arr[this.i]);
        };
        await send();
    }
    returnArrForsend() {
        return {
            arrForsend: this.arrForsend,
            i: this.i,
        };
    }
}
module.exports = Group_post;
