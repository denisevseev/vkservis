const filter_type_is_closed = async (data, arr)=>{
    this.inputValue = data.inputValue.split("\n")
    this.arr = []
    let temparr = ['порно', 'видео']
    arr.map((key)=>{
        if(data.reqMustTitle){
            this.inputValue.map((valKey)=>{
                if(key.name.toLowerCase().indexOf(valKey.toLowerCase())>-1){
                    this.arr.push(key)
                    console.log(key.name)
                }
            })
        }
    })
    return this.arr
}
module.exports = filter_type_is_closed