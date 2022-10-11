const delay=(min, max)=> {
    if(min||max==""){
         this.rand =2000
        console.log('delay')
    }else{
        this.rand=  Math.random() * (max*1000 - min*1000) + min*1000
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, this.rand);
    });
}
module.exports = delay