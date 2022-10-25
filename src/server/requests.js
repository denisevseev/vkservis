const axios = require("axios");
const url = `https://api.vk.com/method/`;
const posts_request = async (data) => {
  const response = await axios.get(
    `${url}wall.post?&owner_id=-${encodeURI(
      data.arr[data.i]
    )}&message=${encodeURI(data.message)}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const search = async (mes, token, offset) => {
  console.log(offset);
  let search = await axios.get(
    `${url}groups.search?&city_id=1&count=1000&q=${encodeURI(
      mes
    )}&access_token=${token}&v=5.131`
  );
  return search.data;
};

const Filter_group = async (token, arr) => {
  let filter = await axios.get(
    `${url}groups.getById?&group_ids=${arr}&fields=can_post,members_count&access_token=${token}&v=5.131`
  );
  return filter.data;
};

module.exports = {
  posts_request,
  search,
  Filter_group,
  url
};
