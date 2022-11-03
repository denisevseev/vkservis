const wssend = (ws, arr, userData, progress) => {
  let arr2 = arr instanceof Array ? arr.filter((el) => el != null) : arr;
  let data = JSON.stringify({
    arr: arr2,
    userData: userData ? userData : "",
    progress: progress ? progress : "",
  });
  console.log(data, "6 wssen");
  try {
    ws.send(data);
  } catch (e) {
    console.log(e);
  }
};
module.exports = wssend;
