const http = require("http");
const proxyUrl = "2.59.178.58";
const authUsername = "dastinm234_mail_ru";
const authPassword = "45bd960300";
const axios = require("axios-https-proxy-fix");

const instance = axios.create({
  proxy: {
    protocol: "http",
    host: proxyUrl,
    port: 30009,
    auth: {
      username: authUsername,
      password: authPassword,
    },
  },
});

// const httpsAgent = new https.Agent({ keepAlive: true });
const url = `https://api.vk.com/method/`;
const posts_request = async (data) => {
  console.log(data.owner_id, "data owner id");
  const response = await instance
    .get(
      `${url}wall.post?&owner_id=-${encodeURI(
        data.owner_id
      )}&message=${encodeURI(data.message)}&access_token=${data.token}&v=5.131`
    )
    .catch((err) => console.log(err, "BAN VK!!!!!!!!!"));
  return response.data;
};

const wallDelete = async (data) => {
  //запрос на удаление записи со стены
  let response = await instance.get(
    `${url}wall.delete?owner_id=${data.owner_id}&post_id=${data.post_id}&access_token=${data.token}&v=5.131`
  );
  console.log(response.data);
  return response.data;
};

const wallDeleteComment = async (data) => {
  //запрос на удаление комментария со стены
  let response = await instance.get(
    `${url}wall.deleteComment?owner_id=-${data.owner_id}&comment_id=${data.comment_id}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const wallGetComments = async (data) => {
  //запрос получение ид комментво к записи на стене
  let response = await instance.get(
    `${url}wall.getComments?owner_id=-${data.owner_id}&post_id=${data.post_id}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const createComment = async (data) => {
  let message = encodeURI(data.message);
  let response = await instance.get(
    // оставление комментария на стене группы с известным айди группы и айди поста
    `${url}wall.createComment?&owner_id=${data.owner_id}&post_id=${data.post_id}&message=${message}&access_token=${data.token}&v=5.131`
  );
  return response.data;
};

const joinGroups = async (owner_id, token) => {
  let response = await instance.get(
    // вступление в группу
    `${url}groups.join?&group_id=${owner_id}&access_token=${token}&v=5.131`
  );
  return response.data;
};

const search = async (data) => {
  console.log(data.inputValue[data.arr_str_for_search], "req!!!");
  let search = await instance.get(
    `${url}groups.search?${
      data.city ? `city_id=${data.city}` : ""
    }&count=1000&q=${encodeURI(
      data.inputValue[data.arr_str_for_search] // поиск групп запрос со счетчиком
    )}&access_token=${data.token}&v=5.131`
  );
  return search.data;
};

const Filter_group = async (arr, token) => {
  let filter = await instance.get(
    // фильтр групп на возможность постинга на стену и фильтр колич-ва подписчиков группы
    `${url}groups.getById?&group_ids=${arr}&fields=can_post,members_count,city,country,description&access_token=${token}&v=5.131`
  );
  return filter.data;
};

const canComments = async (owner_id, token) => {
  // запрос на возможность оставления комментария на стене
  let response = await instance.get(
    `${url}wall.get?&owner_id=-${owner_id}&extended=1&fields=can_post,is_closed&access_token=${token}&v=5.131`
  );
  console.log(response.data);
  return response.data;
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
