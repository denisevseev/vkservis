const axios = require('axios')
class groups_search{
    constructor(data, token, arr) {
        this.data = data;
        this.token = token;
        this.arr = arr;
    }
     async post() {
        await axios.get(`https://api.vk.com/method/groups.search?&city_id=1&offset=5&count=1000&q=${encodeURI(this.data.data)}&access_token=${this.token}&v=5.131`)
            .then(async (res) => {
                const r = res.data.response.items
                await r.map((k) => {
                    if (k.is_closed === 0) {this.arr.push(k.id)} //проверка на закрытость
                })
            })
            .catch((err) => {
                console.log(err)
            })
            
    }
    returnarr(){
        return this.arr
    }
}

module.exports = groups_search