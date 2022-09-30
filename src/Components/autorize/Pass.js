import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react";
import Search from '../../State'

const Pass = () => {
    const value = useRef()
    const change = ()=>{
        Search.password(value.current.value)
    }
    return (
        <div style={{marginTop: "1em"}}>
            <input type="password" ref={value} style={{textAlign: "center"}}
                   onChange={()=>change()}
                   placeholder="ваш пароль вк" type="text"
                   className="form-control inputControl" aria-label="Default"
                   aria-describedby="inputGroup-sizing-default"></input>
        </div>
    );
};

export default observer(Pass)