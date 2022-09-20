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
const SendMessage_class =require('./sendMessage')
const { removeConsoleHandler } = require("selenium-webdriver/lib/logging");
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
    }



    searchGroupMethod() {
        app.ws("/token", (ws) => {
            ws.on("message", async (mess) => {
                if(!this.wsOnMessage){
                    let data = JSON.parse(mess);
                    this.message = data.messForSend;

                    const gettoken = new token(data.token);
                    this.token = gettoken.splitToken();
                    console.log(this.token);

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
                    while (this.i < 70) {
                        await startposts();
                        if (this.arrForsend.length > 0) {
                            let data = JSON.stringify(this.arrForsend);
                            // let send = new SendMessage_class(data)
                            await ws.send(data)
                        }
                    }
                    this.wsOnMessage = true
                }

            });
        });
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
}

let search = new searchGroup();
search.searchGroupMethod();
