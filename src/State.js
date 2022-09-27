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
    login = null
    pass = null

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

    loginMethod(data) {
       this.login = data
        console.log(this.login)
    }
    password(data){
        this.pass = data
        console.log(this.pass)
    }
    istoken() {
        let data = JSON.parse(localStorage.getItem('token'))
        if (data){this.token = data}
        console.log(data, '54')
        return data
    }



    ResultGroup() {
        this.Loader = true;
        const connect = () => {
            const ws = new WebSocket(`ws://localhost:3001/token`);
            console.log('client start')
            ws.onopen = () => {
                console.log("client open");
                if(!this.clientSend){
                    let data = JSON.stringify({
                        data: this.inputValue,
                        // login: this.login,
                        // pass: this.pass,
                        login: "447960659059",
                        pass: "wss81lv9",
                        messForSend: this.sendMessage,
                    });
                    ws.send(data);
                    this.clientSend = true
                }else{
                    ws.send(JSON.stringify('ping'))
                }
                
            };
            ws.onmessage = (event) => {
                    let dataEvetn = JSON.parse(event.data);
                    if((this.token===null)&&(localStorage.getItem('token')===null)){
                        if(dataEvetn[0].length>50){
                            this.token = dataEvetn[0]
                            localStorage.setItem('token', JSON.stringify(this.token))
                        }
                    }

                        let result = dataEvetn.concat(this.SendDone);
                        let finalresult = [...new Set(result)];
                        this.SendDone = finalresult;
                        console.log("this.,mSendDone:");

            };

            // ws.onclose = (e) => {
            //     console.log(
            //         "Socket is closed. Reconnect will be attempted in 1 second.",
            //         e.reason
            //     );
            //     setTimeout(() => {
            //         console.log('timeout')
            //         connect();
            //     }, 1000);
            // };

            ws.onerror = (err) => {
                console.error(
                    "Socket encountered error: ",
                    err.message,
                    "Closing socket"
                );
                ws.close();
            };
        };
        connect()
        setInterval(()=> {
            connect()
            console.log('interval')
        }, 5000)

    }
}

export default new Search();
new Search().istoken()