const axios = require("axios");
const url = `https://api.vk.com/method/`;
const posts_request = async (data) => {
  console.log(data.owner_id, "data owner id");
  const response = await axios.get(
    `${url}wall.post?&owner_id=-${encodeURI(data.owner_id)}&message=${encodeURI(
      data.message
    )}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const createComment = async (data) => {
  let response = await axios.get(
    // оставление комментария на стене группы с известным айди группы и айди поста
    `${url}wall.createComment?&owner_id=${data.owner_id}&post_id=${data.post_id}&message=${data.message}&&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const search = async (data) => {
  console.log(data.inputValue[data.arr_str_for_search], "req!!!");
  let search = await axios.get(
    `${url}groups.search?&${
      data.city ? `city_id=${data.city}` : ""
    }&count=1000&q=${encodeURI(
      data.inputValue[data.arr_str_for_search] // поиск групп запрос со счетчиком
    )}&access_token=${data.token}&v=5.131`
  );
  return search.data;
};

const Filter_group = async (arr, token) => {
  let filter = await axios.get(
    // фильтр групп на возможность постинга на стену и фильтр колич-ва подписчиков группы
    `${url}groups.getById?&group_ids=${arr}&fields=can_post,members_count,city,country,description&access_token=${token}&v=5.131`
  );
  return filter.data;
};

const canComments = async (owner_id, token) => {
  // запрос на возможность оставления комментария на стене
  let response = await axios.get(
    `${url}wall.get?&owner_id=-${owner_id}&extended=1&fields=can_post,is_closed&access_token=${token}&v=5.131`
  );
  console.log(response.data)
  return response.data;
};

module.exports = {
  posts_request,
  createComment,
  search,
  Filter_group,
  canComments,
  url,
};
