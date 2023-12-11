const http = require("http");
const axios = require("axios-https-proxy-fix");

const ins = axios.create({
  proxy: {
    // protocol: "http",
    host: '95.165.14.53',
    port: 47458,
    auth: {
      username: 'c80773',
      password: '2cfc28'
    }
  },
});

// const ins  = axios

// const randomValue = Math.random() < 0.5 ? "axios" : "ins";
// console.log(randomValue);

// const httpsAgent = new https.Agent({ keepAlive: true });
const url = `https://api.vk.com/method/`;
const posts_request = async (data) => {
  console.log(data.owner_id, "data owner id");
  const response = await axios
    .get(
      `${url}wall.post?&owner_id=-${encodeURI(
        data.owner_id
      )}&message=${encodeURI(data.message)}&access_token=${data.token}&v=5.131`,
      // {
      //   timeout: 5000,
      //   headers: {
      //     "Content-Type": "application/json",
      //     "User-Agent":
      //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 YaBrowser/23.3.3.721 Yowser/2.5 Safari/537.36",
      //   },
      // }
    )
    .catch((err) => {
      console.log(err, "BAN VK!!!!!!!!!");
      return;
    });
  console.log(response?.data, 'response?.data')
  return response?.data;
};

const wallDelete = async (data) => {
  //запрос на удаление записи со стены
  let response = await axios.get(
    `${url}wall.delete?owner_id=${data.owner_id}&post_id=${data.post_id}&access_token=${data.token}&v=5.131`
  );
  console.log(response.data);
  return response.data;
};

const wallDeleteComment = async (data) => {
  //запрос на удаление комментария со стены
  let response = await axios.get(
    `${url}wall.deleteComment?owner_id=-${data.owner_id}&comment_id=${data.comment_id}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const wallGetComments = async (data) => {
  //запрос получение ид комментво к записи на стене
  let response = await axios.get(
    `${url}wall.getComments?owner_id=-${data.owner_id}&post_id=${data.post_id}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const createComment = async (data) => {
  let message = encodeURI(data.message);
  let response = await axios.get(
    // оставление комментария на стене группы с известным айди группы и айди поста
    `${url}wall.createComment?&owner_id=${data.owner_id}&post_id=${data.post_id}&message=${message}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const joinGroups = async (owner_id, token) => {
  let response = await axios.get(
    // вступление в группу
    `${url}groups.join?&group_id=${owner_id}&access_token=${token}&v=5.131`
  );
  return response.data;
};

const search = async (data) => {
  console.log(data.inputValue[data.arr_str_for_search], "req!!!");
  let search = await axios.get(
    `${url}groups.search?${
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
  let response = await axios
    .get(
      `${url}wall.get?&owner_id=-${owner_id}&extended=1&fields=can_post,is_closed&access_token=${token}&v=5.131`,
      { timeout: 5000 }
    )
    .catch((err) => console.log(err, "err wall.get!!!"));
  console.log(response?.data);
  return response?.data;
};

module.exports = {
  posts_request,
  createComment,
  wallDelete,
  wallDeleteComment,
  wallGetComments,
  joinGroups,
  search,
  Filter_group,
  canComments,
  url,
};
