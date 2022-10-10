const wssend = (ws, arr, userData)=>{
    let f =userData
    let data = JSON.stringify({
        arr: arr,
        userData: userData
    });
    console.log(data)
    try{ws.send(data)}catch (e) {console.log(e)}

}
module.exports = wssend