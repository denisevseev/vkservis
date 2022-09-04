const express = require('express')
const axios = require('axios')
const fs = require('fs')
const cors = require('cors')
const app = express()
const port = 3002
app.use(cors())
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
class searchGroup {
    constructor() {
        this.token = "vk1.a.nX9B8-Lkv_11G6q5F91vyc3LaAN-AedW_fvrx2MRidBmSScpTrJkyZBELrTbflDsnTzjjP5bPoZ4nAJHc43o7mmQpGDv8VbhxlDQ2EijtmwHO3ws_gT7bAdAMB03ktCGdNmIK7-QZIQ9pWw-Cp2ObugsHGcmC9j0Iz1lY3PnE1_sPTl4yoyJPM9vOxXa5A3S"
    }
    SendMessageToGroup() {
        app.post("/postMessage", (req, res) => {
            function response(data) {
                res.send(data);
            }
            console.log("encodeURI(req.body.id) server, /postMessage", encodeURI(req.body.id))
            axios.get(`https://api.vk.com/method/wall.post?&owner_id=-${encodeURI(req.body.id)}&message=${encodeURI(req.body.message)}&access_token=${this.token}&v=5.131`)
                .then((r) => { console.log(r); response(r.data.response) })
        })
    }
    searchGroupMethod() {
        app.post('/', (req, res) => {
            function response(data) {
                res.send(data);
            }
            console.log("encodeURI(req.body.id) server, /", encodeURI(req.body.data))

            axios.get(`https://api.vk.com/method/groups.search?&city_id=1&offset=0&count=1000&q=${encodeURI(req.body.data)}&access_token=${this.token}&v=5.131`)
                .then((res) => {
                    const r = res.data.response.items
                    const arr = []
                    r.map((k) => {
                        if (k.is_closed == 0) arr.push(k.id)
                    })
                    // let i = 0
                    // let interval  = setInterval(() => {
                    //     i++
                    //     console.log('https://vk.com/club'+arr[i])
                    //     if(i>30){clearInterval(interval)}
                    //     axios.get(`https://api.vk.com/method/wall.post?&owner_id=-${arr[i]}&message=${encodeURI('готов платить 20000 за встречу ищу девушку для постоянных встреч')}&access_token=${this.token}&v=5.131`)
                    //     // .then((response) => {console.log(response)})
                    // }, 5000);
                    response(res.data.response)
                })
                .catch((err) => { console.log(err) })
        })

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    }
}
let search = new searchGroup()
search.searchGroupMethod()
search.SendMessageToGroup()
