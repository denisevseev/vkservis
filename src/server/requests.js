const axios = require("axios");

const posts_request = async (data) => {
  const response = await axios.get(
    `https://api.vk.com/method/wall.post?&owner_id=-${encodeURI(
      data.arr[data.i]
    )}&message=${encodeURI(data.message)}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const search = async (mes, token) => {
  console.log(this.data, "13 requests");
  let search = await axios.get(
    `https://api.vk.com/method/groups.search?&city_id=1&count=1000&q=${encodeURI(
      mes
    )}&access_token=${token}&v=5.131`
  );
  return search.data;
};

const Filter_group = async (token, arr) => {
  let filter = await axios.get(
    `https://api.vk.com/method/groups.getById?&group_ids=${arr}&fields=can_post,members_count&access_token=${token}&v=5.131`
  );
  return filter.data;
};
const df = () => {
  console.log("sdf");
};

module.exports = {
  posts_request,
  search,
  Filter_group,
  df,
};
