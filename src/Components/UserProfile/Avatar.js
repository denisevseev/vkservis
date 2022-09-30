import React, {useEffect, useState} from "react";
import "./Avatar.Module.scss";
import Search from "./../../State";
import { observer } from "mobx-react";
const Avatar = () => {
    let out = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };
    const [state, setState] = useState('none')
    // console.log(Search.last_name)
    const handleStyle = ()=>{
        if(state=='none'){
            setState('block')
        }else{
            setState('none')
        }
    }
       let data = JSON.parse(localStorage.getItem('user'))
       if (data) {
           return (
               <div onClick={()=>handleStyle()} className="own">
                   <div>
                       <img
                           style={{ width: "2em", height: "2em", borderRadius: "2em" }}
                           src={data.photo}
                           alt=""
                       />
                       <p><i className="down"></i></p>
                   </div>

                   <div style={{display: state, cursor: 'pointer'}}>
                       <div>{data.first_name}</div>
                       <div>{data.last_name}</div>
                       <div onClick={() => out()} className="menuavatar">
                           Выйти
                       </div>
                   </div>

               </div>
           );
       }
};

export default observer(Avatar)
