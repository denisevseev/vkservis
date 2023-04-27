const { search, groupSetRequest, canComments } = require("./requests");
const groups_search = async (data) => {
  this.arr = [];
  let result = await search(data);
  if (!result.error) {
    await result.response.items.map((res) => {
      let idName = res;
      // console.log('isclosed: ', res.is_closed, '  type:', res.type)
      this.arr.push(idName);
    });

    let resultData = {
      arr: this.arr,
    };
    return resultData;
  } else {
    return result.error.error_msg;
  }
};

module.exports = {
  groups_search,
};
