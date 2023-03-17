const wsSend = (ws, arrForClient, userData, progress) => {
  let arr2 =
    arrForClient instanceof Array
      ? arrForClient.filter((el) => el != null)
      : arrForClient; //если массив то исключить нулевые элементы
  let data = JSON.stringify({
    arr: arr2, //массив групп или слово 'nothing'
    userData: userData ? userData : "", //ошибки
    progress: progress ? progress : "", //прогресс
  });
  try {
    ws.send(data);
    console.log(data.progress);
  } catch (e) {
    console.log(e);
  }
};
module.exports = wsSend;
