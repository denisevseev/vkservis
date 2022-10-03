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
const token = require("./token");
const { removeConsoleHandler } = require("selenium-webdriver/lib/logging");
const autorize_class = require('./autorize')
const wssend = require('./wsSendData')
const getUserInfo = require('./getUserInfo')
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
    }

    VariblesNull(){
        this.message = null
        this.login = null
        this.pass = null
        this.token =  null
        this.arr = []
        this.arrForsend = [];
        this.i=0
        this.startAuto = false
        this.mailing = '70'
    }
     AutorizeOwnMethod(){
        app.ws('/autorize', (ws)=>{
            ws.on('message', async (mes)=>{
                let data = JSON.parse(mes)
                console.log(data, '71')
                this.startAuto = true
                const autorizeconst = new autorize_class(data.login, data.pass)
                const gettoken  = await autorizeconst.autorizeMethod()
                const token2 = new token(gettoken);
                this.token = await token2.splitToken();

                const userInfo = new getUserInfo(this.token[0])
                await userInfo.getUser()
                const user = await userInfo.returnUserinfo()
                console.log(this.token)
                await wssend(ws, this.token, JSON.stringify(user))
                return await ws.close()
            })
        })

    }

    StopSend(){
        app.ws(`/stopsend`, (ws)=>{
            ws.on('message', async (mes)=>{
                let data =JSON.parse(mes)
                if(data == '70'||!data||data===null){
                    this.VariblesNull()
                }
            })
        })
    }
    CheckIsSend(){
        app.ws(`/CheckIsSend`, (ws)=>{
            console.log('85')
            ws.on("message", (mes)=>{
                if(this.arrForsend){
                    console.log(mes)
                    this.arrForsend.length>0? wssend(ws, this.arrForsend):''
                }
            })
        })
    }

    searchGroupMethod() {
        app.ws("/token", (ws) => {
            ws.on("message", async (mess) => {
                    let data = JSON.parse(mess);
                    console.log(data)
                    if(data) {
                        this.message = data.messForSend;
                        this.login = data.login
                        this.pass = data.pass
                        this.token = data.token
                        this.mailing = 0
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





            });
        });
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
}

let search = new searchGroup();
search.AutorizeOwnMethod()
search.searchGroupMethod();
search.StopSend()
search.CheckIsSend()
