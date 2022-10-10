const axios = require("axios");
const posts = (arr, i, mes, token) => {
    axios.get(
        `https://api.vk.com/method/wall.post?&owner_id=-${encodeURI(
            arr[i]
        )}&message=${encodeURI(mes)}&access_token=${
            token
        }&v=5.131`
    );
}
module.exports = posts
