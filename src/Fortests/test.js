const df = ()=>{
    const g= 4

    const gh =()=>{
        return g+3
    }
    return  gh()
}
console.log(df())