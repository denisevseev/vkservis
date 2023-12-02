const writeFileLog = require("./writeFileLog");
const tryCatch = async (data) => {
  try {
    return data;
  } catch (e) {
    await writeFileLog(e);
    return null;
  }
};
module.exports = tryCatch;
