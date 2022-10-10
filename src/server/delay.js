const delay=(min, max)=> {
    let rand=  Math.random() * (max - min) + min
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, rand);
    });
}
module.exports = delay