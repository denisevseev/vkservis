const delay = require('./delay')
const {posts_request} = require("./requests");
const Group_post = async (data)=>{
            this.i = data.i;
            this.message = data.message;
            this.arr = data.arr;
            this.arrForsend = data.arrForsend;
            this.token = data.token;
            this.Ot = data.Ot
            this.Do  = data.Do
            let result = await posts_request(this.arr, this.i, this.message, this.token)
            console.log("https://vk.com/club" + this.arr[this.i], "this.arr[this.i]");
            this.i++;
            await delay(this.Ot, this.Do);
            this.arrForsend.push(this.arr[this.i]);

       let data2  = {
            result: result,
            arrForsend: this.arrForsend,
            i: this.i,
        }
        return data2
}
module.exports = Group_post;
