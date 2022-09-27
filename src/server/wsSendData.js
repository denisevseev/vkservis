const wssend = (ws, arr)=>{
    let data = JSON.stringify(arr);
     ws.send(data)
}
module.exports = wssend