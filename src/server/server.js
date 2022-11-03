const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;
const ws = require("express-ws")(app);
const WebSocket = require("ws");
const searchGroup = require("./owner");
const search = new searchGroup();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

class Server {
  constructor() {
    this.arr = [];
    this.arrLogin = [];
  }

  AutorizeOwnMethod() {
    app.ws("/autorize", (ws) => {
      ws.on("message", async (mes) => {
        let data = JSON.parse(mes);
        new searchGroup().AutorizeOwnMethod(data, ws);
      });
    });
  }

  StopSend() {
    app.ws(`/stopsend`, (ws) => {
      ws.on("message", async (mes) => {
        let index = this.arr.findIndex((i) => i.token === mes);
        console.log(index, "index");
        index != -1 ? this.arr[index].owner_i() : null;
      });
    });
  }

  CheckIsSend() {
    app.ws(`/CheckIsSend`, (ws) => {
      ws.on("message", (mes) => {
        if (this.arr.length > 0) {
          let index = this.arr.findIndex((i) => i.token === mes);
          index != -1
            ? this.arr[index].CheckIsSend(ws)
            : console.log("error 50 server");
        }
      });
    });
  }
  httpMethod() {
    app.get(`mailru-domainAgdxMPH55DhMKEvw.html`, (req, res) => {
      res.sendFile(`mailru-domainAgdxMPH55DhMKEvw.html`, (err) => {
        if (err) {
          console.log(err);
        }
        console.log("send");
      });
    });
  }

  searchGroupMethod() {
    app.ws("/startSend", (ws) => {
      ws.on("message", async (mes) => {
        let data = JSON.parse(mes);
        let index = this.arr.findIndex((i) => i.token === data.token);
        if (index == -1) {
          this.arr.push(new searchGroup());
          this.arr[this.arr.length - 1].searchGroupMethod(data, ws);
        } else {
          this.arr[index].searchGroupMethod(data, ws);
        }

        console.log(this.arr);
      });
    });
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
}

let server = new Server();
server.AutorizeOwnMethod();
server.searchGroupMethod();
server.StopSend();
server.CheckIsSend();
server.httpMethod();
