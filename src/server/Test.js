// const test = (ws, i)=>{
//     i++
//    ws.send(JSON.stringify(i))
//     ws.close()
//
// }
// module.exports = test
// import psList from 'ps-list'

// class test{
//     constructor(ws, data) {
//         this.ws = ws
//         this.i=0
//         this.data = data
//         this.letter = data.randomLetter
//         this.input = data.inputValue
//         this.localLetter = null
//     }
//     othermethod(){
//         this.i++
//         if(this.input=='0'){
//             this.i = 100
//         }
//         console.log(this.i, this.letter)
//         this.ws.send(this.i)
//
//     }
//    async ret(){
//          while (this.i<100){
//              await this.othermethod()
//              await this.delay2(2000)
//              // console.log (psList());
//          }
//             // this.localLetter = this.lette
//
//     }
//     delay2(ms){
//         return new Promise((resolve)=>{
//             setTimeout(()=>{
//                 resolve()
//             },ms)
//         })
//     }
//     returndata(){
//         let returnData = {
//             i: this.i,
//             letter:this.letter
//         }
//         return returnData
//     }
// }
// module.exports = test



class myclass{
    constructor(data) {
        this.data =data
        this.k=0
        this.r=0
    }

    first(){
        let int = setInterval(()=>{
            if(this.k==1) clearInterval(int)
            console.log(this.data)
        },2000)

    }

}
let s = '123'
const arr = []
arr.push(new myclass('data'), new myclass('data2'))
// new myclass('data').first()
// new myclass('data2').first()
arr[0].k=1
arr[0].first()
// console.log()
// setTimeout(()=>{
//     const s = arr.map((k, i)=>{
//         if(k.data=='data'){
//             let data = {
//                 i:i,
//                 k:k
//             }
//             return data
//         }
//     })
//     console.log(s)
// },5000)


