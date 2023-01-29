const delay = (min, max) => {
  if (min == "" || max == "" || min == undefined || max == undefined) {
    this.rand = 4000;
  } else {
    this.rand = Math.random() * (max * 1000 - min * 1000) + min * 1000;
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, this.rand);
  });
};
module.exports = delay;
