import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react";
import Search from '../../State'
const Login = () => {
    const value = useRef()
    const changelogin = ()=>{
        Search.loginMethod(value.current.value)
    }
    return (
        <div style={{marginTop: "1em"}}>
                <input ref={value} style={{textAlign: "center"}}
                       onChange={()=>changelogin()}
                        placeholder="ваш логин вк" type="text"
                       className="form-control inputControl" aria-label="Default"
                       aria-describedby="inputGroup-sizing-default"></input>

        </div>
    );
};

export default observer(Login)