const wssend = (ws, arr, userData, progress) => {
  let arr2 = arr instanceof Array ? arr.filter((el) => el != null) : arr; //если массив то исключить нулевые элементы
  let data = JSON.stringify({
    arr: arr2, //массив групп или слово 'nothing'
    userData: userData ? userData : "", //ошибки
    progress: progress ? progress : "", //прогресс
  });
  console.log(data, "6 wssen");
  try {
    ws.send(data);
  } catch (e) {
    console.log(e);
  }
};
module.exports = wssend;
