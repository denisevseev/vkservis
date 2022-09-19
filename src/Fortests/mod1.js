const owner = require("./Own");
// const childfunc= (function (){
//     // console.log(ow)
//     const parent = 7
//   function parent1 (data) {
//        return data+2
//     }
//     return {
//         parent1: parent1,
//         parent: parent
//     }
// })()
// const d= childfunc()
// console.log(childfunc.parent1())
// const ow =  owner()
class childfunc extends owner {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    gf(){
       return {
       name: this.name,
       age: this.age+2
       }
    }
}
module.exports = childfunc

