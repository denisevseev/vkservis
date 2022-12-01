const { search, groupSetRequest } = require("./requests");
const groups_search = async (data, token, arr, offset) => {
  this.arr = arr;
  let result = await search(data, token, offset);
  if (!result.error) {
    await result.response.items.map((res) => {
      let idName = {
        id: res.id,
        name: res.name,
      };
      this.arr.push(idName);
    });

    let resultData = {
      arr: this.arr,
      count: result.response.count,
    };
    return resultData;
  } else {
    return result.error.error_msg;
  }
};

module.exports = {
  groups_search,
};
