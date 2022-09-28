const wssend = (ws, arr, userData)=>{
    let f =userData
    let data = JSON.stringify({
        arr: arr,
        userData: userData
    });
     ws.send(data)
}
module.exports = wssend