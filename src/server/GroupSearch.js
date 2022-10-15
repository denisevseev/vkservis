const {search_request} = require("./requests");
const groups_search = async (data, token, arr)=>{
        this.arr =arr
        let result = await search_request(data.data, token)
            await result.map((res)=>{
                if (res.is_closed === 0) {this.arr.push(res.id)}
            })
    return this.arr
}

module.exports = groups_search
