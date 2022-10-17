import React, {useEffect, useState} from "react";
import "./Avatar.Module.scss";
import Search from "./../../State";
import { observer } from "mobx-react";
const Avatar = () => {
console.log(Search.token)
    // const start = ()=>{
    //     const ws = new WebSocket(`ws://localhost:3001/CheckIsSend`);
    //     Search.CheckIsSend(ws)
    //
    // }
    const [state, setState] = useState('none')
    const [ava, setAva]= useState(Search.avatar)
    // useEffect(()=>{
    //     setAva(Search.Login())
    // })
    const handleStyle = ()=>{
        if(state=='none'){
            setState('block')
        }else{
            setState('none')
        }
    }
// return <div>
//     <button onClick={start}>клик</button>
// </div>

       if (Search.token) {
           return (
               <div onClick={handleStyle} className="own">
                   <div>{!Search.photo?<div>Ваш аккаунт заблокирован</div>:''}
                       <img
                           style={{ width: "2em", height: "2em", borderRadius: "2em" }}
                           src={Search.photo}
                           alt=""
                       />
                       <p><i className="down"></i></p>
                   </div>

                   <div style={{display: state, cursor: 'pointer'}}>
                       <div>{Search.first_name}</div>
                       <div>{Search.last_name}</div>
                       <div onClick={Search.Logout} className="menuavatar">
                           Выйти
                       </div>
                   </div>

               </div>
           );
       }
};

export default observer(Avatar)
