const { search, df } = require("./requests");
const groups_search = async (data, token, arr, subsOt, subsDo) => {
  this.arr = arr;
  let result = await search(data.data, token);
  if (!result.error) {
    await result.response.items.map((res) => {
      this.arr.push(res.id);
    });
    return this.arr;
  } else {
    return result.error.error_msg;
  }
};
const sdf = () => {
  df();
};
module.exports = {
  groups_search,
  sdf,
};
// module.exports.sdf=sdf
