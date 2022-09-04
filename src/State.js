import { autorun, extendObservable, makeAutoObservable, makeObservable, observable } from "mobx";
import { configure } from "mobx";
import axios from "axios";

class Search {
    Group = '1'
    Loader = false
    inputValue = ''
    sendMessage = ''
    SendDone = []
    i = 0

    constructor() {
        configure({
            useProxies: "never",
            enforceActions: "never"
        })
        makeAutoObservable(this, {
            Group: observable,
            inputValue: observable,
            sendMessage: observable,
            SendDone: observable,
        })
    }

    changeInput(data) { //ключ для поиска групп
        this.inputValue = data
    }

    maessageForSend(mess) { // сообщение для рассылки
        this.sendMessage = mess
    }

    token(dataToken) {
        JSON.stringify(localStorage.setItem('token', dataToken))
        if (2>1) {

        } else {
            axios.post(`http://localhost:3002/token`, { data: '' })
                .then(() => console.log('token send success'))
                .catch(err => alert(err.message))
        }
    }

    ResultGroup() {
        this.Loader = true;
        const posts = async () => {
            function delay(ms) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve()
                    }, ms);

                })
            }

            let res = await axios.post(`http://localhost:3002`, { data: this.inputValue })
            const axdata = await res.data.items
            this.Group = axdata
            let group = this.Group
            console.log(group)
            await delay(1000)
            console.log('delay')
            console.log(res, 'postmassage')
            await delay(2000)
            const repeatReq = async () => {
                await axios.post(`http://localhost:3002/postMessage`, { id: group[this.i].id, message: this.sendMessage })
                await delay(2000)
                this.SendDone.push(group[this.i].id)
                console.log('post client', this.SendDone)
                console.log('done')
                this.i++
                console.log(this.i, 'this.i')
                if (this.i < 5) await repeatReq()
            }
            await repeatReq()

        }
        posts()
    }
}

export default new Search