const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;
const ws = require("express-ws")(app);
const WebSocket = require("ws");
const groups_search = require("./GroupSearch");
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
        this.arr2 = []
        this.inputSubsOt = null
        this.inputSubsDo = null
        this.result = false
        this.post_data = null
        this.error_msg = null
        this.tumbler = false
        this.autorizeconst = null
    }

    VariblesNull() {
        this.message = null
        this.login = null
        this.pass = null
        // this.token =  null
        this.arr = []
        this.arrForsend = [];
        this.i = 0
        this.startAuto = false
        this.mailing = '70'
    }

    async AutorizeOwnMethod(data, ws) {
        console.log(data, '71')
        this.startAuto = true
        // if (!this.tumbler) {
        //     this.login = data.login
            this.autorizeconst = new autorize_class(data.login, data.pass)
            // this.tumbler = true
        // }


        const gettoken = await this.autorizeconst.autorizeMethod(data)
        if (gettoken.indexOf('captcha') > -1) {
            await wssend(ws, gettoken)
        } else {
            this.token = await splitToken(gettoken);

            const userInfo = new getUserInfo(this.token[0])
            await userInfo.getUser()
            const user = await userInfo.returnUserinfo()
            console.log(this.token)
            await wssend(ws, this.token, JSON.stringify(user))
            return await ws.close()
        }

    }

    returnToken() {
        return this.token
    }

    owner_i() {
        this.mailing = '70'
        this.VariblesNull()
        console.log(this.i, this.mailing)
    }

    async StopSend(mes) {
        let data = JSON.parse(mes)
        if (data == '70' || !data || data === null) {
            this.VariblesNull()
        }
    }

    CheckIsSend(ws) {
        let interval = setInterval(() => {
            if (ws.readyState != 1) {
                clearInterval(interval)
            }
            if (this.arrForsend) {
                this.arrForsend.length > 0 ? wssend(ws, this.arrForsend) : ''
            }
        }, 2000)

    }

    async searchGroupMethod(data, ws) {
        if (data) {
            this.message = data.messForSend;
            this.login = data.login
            this.pass = data.pass
            this.token = data.token
            this.mailing = 0
            this.Do = data.Do
            this.Ot = data.Ot
            this.subsOt = data.subsOt
            this.subsDo = data.subsDo

        }


        if (this.token && data)
            this.start = true
        this.arr = await groups_search(data, this.token, this.arr, this.subsOt, this.subsDo);


        this.post_data = {
            i: this.i,
            message: this.message,
            arr: this.arr,
            arrForsend: this.arrForsend,
            token: this.token,
            Ot: this.Ot,
            Do: this.Do,
            subsDo: this.subsDo,
            subsOt: this.subsOt
        }


        this.group_post = await Group_post(this.post_data)


        const i_res_arr = () => {
            console.log('131')
            this.i = this.group_post.i
            this.arrForsend = this.group_post.arrForsend
            this.result = this.group_post.result
        }
        await i_res_arr()
        const is_error = async () => {
            try {
                if (this.result.error.error_msg) {
                    this.error_msg = this.result.error.error_msg
                }
            } catch (e) {
                console.log(e)
            }

        }
        await is_error()

        const if_arr = async () => {
            console.log(this.arrForsend.length, 'arr forsend leng')
            if (this.arrForsend.length > 0) {
                await wssend(ws, this.arrForsend, this.error_msg)
                if (this.error_msg) {
                    this.VariblesNull()
                }
            }
        }

        const while_i = async () => {
            console.log('62!!!')
            this.group_post = await Group_post(this.post_data)
            await i_res_arr()
            await if_arr()
        }

        while (this.i < 70) {
            console.log('150')
            if (this.mailing == '70' || this.error_msg) {
                await wssend(ws, this.arrForsend, this.error_msg)
                this.VariblesNull()
                break
            } else {
                await while_i()
            }
        }
    }

}

module.exports = searchGroup

