import {
    makeAutoObservable,
    observable,
} from "mobx";
import { configure } from "mobx";

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
    last_name=null
    first_name = null
    photo = null
    start = false

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
            last_name:observable,
            first_name:observable,
            photo:observable,
            login:observable,
            clientSend:observable,
            pass:observable,
            start:observable
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
        let data = JSON.parse(localStorage.getItem('user'))
        if (data){
            // console.log(data.token)
            this.token = data.token
            this.first_name = data.first_name
            this.last_name = data.last_name
            this.photo = data.photo
            return this.token
        }else{
            return null
        }

    }

startSend(){
  this.start = true
}

    ResultGroup() {
        const connect = () => {
            const ws = new WebSocket(`ws://localhost:3001/token`);
            console.log('client start')
            ws.onopen = () => {
                console.log("client open", this.Loader);
                if(!this.Loader){
                    debugger
                    let data = JSON.stringify({
                        data: this.inputValue,
                        // login: this.login,
                        // pass: this.pass,
                        login: "447960659059",
                        pass: "wss81lv9",
                        token: this.token,
                        messForSend: this.sendMessage,
                    });
                    ws.send(data);
                    this.Loader = true
                }else{
                    ws.send(JSON.stringify('ping'))
                }
                
            };

            ws.onmessage = (event) => {
                    let dataEvetn = JSON.parse(event.data);
                    if((this.token===null)&&(localStorage.getItem('token')===null)){
                        if(dataEvetn.arr[0].length>50){
                            this.token = dataEvetn.arr[0]
                            let data = JSON.parse(dataEvetn.userData)
                            this.first_name = data[0].first_name
                            this.last_name = data[0].last_name
                            this.photo = data[0].photo_50
                            let user={
                                token: this.token,
                                first_name: this.first_name,
                                last_name: this.last_name,
                                photo: this.photo
                            }
                            localStorage.setItem('user', JSON.stringify(user))
                            closews(ws)
                            clearInterval(interval)
                        }
                    }

                        let result = dataEvetn.arr.concat(this.SendDone);
                        let finalresult = [...new Set(result)];
                        this.SendDone = finalresult;
                        console.log("this.,mSendDone:");

            };
            const closews = (ws)=>{ws.close()}

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
       let interval =  setInterval(()=> {
            connect()
            console.log('interval')
        }, 5000)

    }
}

export default new Search();
// new Search().istoken()