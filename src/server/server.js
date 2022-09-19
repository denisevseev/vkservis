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
    }

    sendMessage() {
        app.ws("/get", (ws) => {
            ws.on("message", (mes) => {
                let d = 0;
                // console.log(message)
                let message = JSON.parse(mes);
                console.log(message, "message from client 33");
                if (message == "getres") {
                    // && (this.arr[this.i] != this.d))
                    console.log(message, "message from client");

                    setInterval(() => {
                        if (this.arrForsend.length > 0) {
                            let data = JSON.stringify(this.arrForsend);
                            console.log(data, "server data arr for send");
                            ws.send(data);
                        }
                    }, 3000);

                    // this.d = this.arr[this.i]
                }
            });
        });
    }

    searchGroupMethod() {
        app.ws("/token", (ws) => {
            ws.on("message", async (mess) => {
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
search.sendMessage();
