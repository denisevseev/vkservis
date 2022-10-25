const wssend = (ws, arr, userData) => {
  let arr2 = arr?arr.filter(el=>el!=null):''
  let data = JSON.stringify({
    arr: arr2,
    userData: userData?userData:'',
  });
  console.log(data, "6 wssen");
  try {
    ws.send(data);
  } catch (e) {
    console.log(e);
  }
};
module.exports = wssend;
