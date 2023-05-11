const fs = require("fs").promises;



const own  = ()=>{
  const asincfunc = async () => {
    const data = await fs.readFile(
        "C:\\Users\\Administator\\Desktop\\vkservis\\src\\store\\State.js",
        "utf8"
    );
    const result = data.replace(/localhost/g, "45.87.0.164");
    await fs.writeFile(
        "C:\\Users\\Administator\\Desktop\\vkservis\\src\\store\\State.js",
        result,
        "utf8"
    );
  };
  asincfunc();

  const asincfunc2 = async () => {
    const data = await fs.readFile(
        "C:\\Users\\Administator\\Desktop\\vkservis\\src\\client\\Head\\ButtonAppBar.js",
        "utf8"
    );
    const result = data.replace("http://localhost:80", "http://vk-ekler.ru");
    await fs.writeFile(
        "C:\\Users\\Administator\\Desktop\\vkservis\\src\\client\\Head\\ButtonAppBar.js",
        result,
        "utf8"
    );
  };
  asincfunc2();

  const asincfunc3 = async () => {
    const data = await fs.readFile(
        "C:\\Users\\Administator\\Desktop\\vkservis\\src\\client\\UserProfile\\Avatar.js",
        "utf8"
    );
    const result = data.replace("http://localhost", "http://vk-ekler.ru");
    await fs.writeFile(
        "C:\\Users\\Administator\\Desktop\\vkservis\\src\\client\\UserProfile\\Avatar.js",
        result,
        "utf8"
    );
  };

  asincfunc3()
}

module.exports = own

