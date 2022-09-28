const axios = require("axios");
class getUserInfo{
    constructor(token) {
        this.token = token
        this.responseServer = null
    }
   async getUser(){
        await axios.get(`https://api.vk.com/method/users.get?&fields=first_name,last_name,photo_50&access_token=${encodeURI(this.token)}&v=5.131`)
            .then(async (res)=>{
                let data = await res.data
               this.responseServer = data.response
                console.log(this.responseServer)
            })
   }
   returnUserinfo(){
        return this.responseServer
   }

}
module.exports = getUserInfo