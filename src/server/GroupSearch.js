const { search_request } = require("./requests");
const groups_search = async (data, token, arr, subsOt, subsDo) => {
  this.arr = arr;
  let result = await search_request(data.data, token, subsOt, subsDo);
  if (!result.error) {
    await result.response.items.map((res) => {
      if (res.is_closed === 0) {
        this.arr.push(res.id);
      }
    });
    return this.arr;
  } else {
    return result.error.error_msg;
  }
};

module.exports = groups_search;
