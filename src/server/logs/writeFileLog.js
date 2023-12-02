const fs = require("fs");
const writeFileLog = async (data) => {
  let date = new Date();
  fs.appendFileSync("log.txt", `${data} ${date} \n`);
};
module.exports = writeFileLog;
