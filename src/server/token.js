class token {
    constructor(token) {
        this.token = token;
    }
    splitToken() {
        const data = encodeURI(this.token)
            .split("=")
        const token = data.filter((data) => data.indexOf("vk1.a.") > -1)
        const data2 = encodeURI(token)
            .split("&")
        const token2 = data2.filter((k) => k.indexOf('vk1.a.') > -1)
        return token2
    }
}
module.exports = token;