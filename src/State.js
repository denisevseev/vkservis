import {
    makeAutoObservable,
    observable,
} from "mobx";
import { configure } from "mobx";
import axios from "axios";

class Search {
    Group = null;
    Loader = false;
    inputValue = "";
    sendMessage = "";
    SendDone = [];
    i = 0;
    token = null;
    clientSend = false

    constructor() {
        configure({
            useProxies: "never",
            enforceActions: "never",
        });
        makeAutoObservable(this, {
            Group: observable,
            inputValue: observable,
            sendMessage: observable,
            SendDone: observable,
        });
    }

    changeInput(data) {
        //ключевое слово для поиска групп
        this.inputValue = data;
    }

    maessageForSend(mess) {
        // сообщение для рассылки
        this.sendMessage = mess;
    }

    checkToken(dataToken) {
        if (dataToken.indexOf("vk1.a") > -1) {
            JSON.stringify(localStorage.setItem("token", dataToken));
            this.token = dataToken;
            return "token";
        } else {
            this.token = null;
        }
    }


    ResultGroup() {
        const ws = new WebSocket(`ws://45.87.0.164:3001/token`);
        this.Loader = true;
        const connect = () => {
            ws.onopen = () => {
                console.log("client open");
                if(!this.clientSend){
                    let data = JSON.stringify({
                        data: this.inputValue,
                        token: this.token,
                        messForSend: this.sendMessage,
                    });
                    ws.send(data);
                    this.clientSend = true
                }
                
            };
            ws.onmessage = (event) => {
                let dataEvetn = JSON.parse(event.data);
                let result = dataEvetn.concat(this.SendDone);
                let finalresult = [...new Set(result)];
                this.SendDone = finalresult;

                console.log("this.SendDone:", this.SendDone);
            };

            ws.onclose = (e) => {
                console.log(
                    "Socket is closed. Reconnect will be attempted in 1 second.",
                    e.reason
                );
                setTimeout(() => {
                    connect();
                }, 1000);
            };

            ws.onerror = (err) => {
                console.error(
                    "Socket encountered error: ",
                    err.message,
                    "Closing socket"
                );
                ws.close();
            };
        };

        connect();

        // this.getResponse();
    }
}
export default new Search();
