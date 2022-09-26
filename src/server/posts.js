const axios = require("axios");
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
            function delay(ms) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, ms);
                });
            }

            console.log(this.i, "this.i");
            await axios.get(
                `https://api.vk.com/method/wall.post?&owner_id=-${encodeURI(
                    this.arr[this.i]
                )}&message=${encodeURI(this.message)}&access_token=${
                    this.token
                }&v=5.131`
            );
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
