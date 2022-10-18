const axios = require("axios");
const posts_request = async (data) => {
  const response = await axios.get(
    `https://api.vk.com/method/wall.post?&owner_id=-${encodeURI(
      data.arr[data.i]
    )}&message=${encodeURI(data.message)}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};
const search_request = async (mes, token, subsOt, subsDo) => {
  console.log(this.data, "13 requests");
  const result = await axios.get(
    `https://api.vk.com/method/groups.search?&city_id=1&count=1000&q=${encodeURI(
      mes
    )}&access_token=${token}&v=5.131`
  );
  return result.data;
};
module.exports = {
  posts_request,
  search_request,
};
