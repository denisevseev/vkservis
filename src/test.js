
let d = async ()=>{
    const a = async ()=>{
        let i = 0
       function s (){
           while(i<1000){
               let g = 5
               i++
               console.log(i)
           }
       }
       await s()

    }

    let b = async ()=>{
        let f= 0
        while (f<10){
            console.log(f)
            f++
            await a()
        }

    }
   await b()
}
d()
