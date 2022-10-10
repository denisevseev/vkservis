const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;
const ws = require("express-ws")(app);
const WebSocket = require("ws");
const groups_search = require("./post");
const Group_post = require("./posts");
const splitToken = require("./token");
// const { removeConsoleHandler } = require("selenium-webdriver/lib/logging");
const autorize_class = require('./autorize')
const wssend = require('./wsSendData')
const getUserInfo = require('./getUserInfo')
// const test = require('./Test')
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

class searchGroup {
    constructor() {
        this.token = null;
        this.arr = [];
        this.message = null;
        this.i = 0;
        this.arrForsend = [];
        this.d = null;
        this.wsOnMessage = false
        this.login = null
        this.pass = null
        this.start = false
        this.mailing = 0
        this.startAuto = false
        this.arr2=[]
        this.inputSubsOt = null
        this.inputSubsDo = null
    }

    VariblesNull(){
        this.message = null
        this.login = null
        this.pass = null
        // this.token =  null
        this.arr = []
        this.arrForsend = [];
        this.i=0
        this.startAuto = false
        this.mailing = '70'
    }
    async AutorizeOwnMethod(data, ws){
                console.log(data, '71')
                this.startAuto = true
                const autorizeconst = new autorize_class(data.login, data.pass)
                const gettoken  = await autorizeconst.autorizeMethod()
                this.token = await splitToken(gettoken);

                const userInfo = new getUserInfo(this.token[0])
                await userInfo.getUser()
                const user = await userInfo.returnUserinfo()
                console.log(this.token)
                await wssend(ws, this.token, JSON.stringify(user))
                return await ws.close()
    }
    returnToken(){
        return this.token
    }

    owner_i(){
        this.mailing='70'
        console.log('owner 71', this.i, this.mailing)
        this.VariblesNull()
    }

    async StopSend(mes){
                let data =JSON.parse(mes)
                if(data == '70'||!data||data===null){
                    this.VariblesNull()
                }
    }

    CheckIsSend(ws){
                let interval  = setInterval(()=>{
                    if(ws.readyState!=1){clearInterval(interval)}
                    if(this.arrForsend){
                        this.arrForsend.length>0? wssend(ws, this.arrForsend):''
                    }
                },2000)

    }

   async searchGroupMethod(data, ws) {
                if(data) {
                    this.message = data.messForSend;
                    this.login = data.login
                    this.pass = data.pass
                    this.token = data.token
                    this.mailing = 0
                    this.inputSubsDo = data.inputSubsDo
                    this.inputSubsOt = data.inputSubsOt
                }


                if(this.token&&data){
                    this.start = true
                    const post = new groups_search(data, this.token, this.arr);
                    await post.post(); //other file
                    this.arr = await post.returnarr();

                    const postsForposts = new Group_post(
                        this.i,
                        this.message,
                        this.arr,
                        this.arrForsend,
                        this.token
                    );
                    const startposts = async () => {
                        await postsForposts.post();
                        this.i = postsForposts.returnArrForsend().i; //other file
                        this.arrForsend = postsForposts.returnArrForsend().arrForsend;
                    };
                    const while_i = async ()=>{
                        console.log('62!!!')
                        await startposts();
                        if (this.arrForsend.length > 0) {
                            await wssend(ws, this.arrForsend)
                        }

                    }
                    while(this.i<70){
                        if(this.mailing=='70') {
                            this.VariblesNull()
                            break
                        }
                        else await while_i()
                    }
                }

    }
}
module.exports = searchGroup
// let search = new searchGroup();

