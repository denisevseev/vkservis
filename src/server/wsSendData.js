const wssend = (ws, arr, userData) => {
  let data = JSON.stringify({
    arr: arr,
    userData: userData,
  });
  console.log(data, "6 wssen");
  try {
    ws.send(data);
  } catch (e) {
    console.log(e);
  }
};
module.exports = wssend;
