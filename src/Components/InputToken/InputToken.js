import React, {useEffect, useRef} from 'react';
import './Module.InputToken.scss'
import {observer} from "mobx-react";
import Search from '../../State'
import {useState} from "react";

const InputToken = () => {
    const value = useRef()
    const [hide, show] = useState(false)
    useEffect(() => {
        let tokenVK = localStorage.getItem('token')
        if (tokenVK) {
            Search.token = tokenVK
            show(true)
        }
    })
    const token = () => {
        Search.checkToken(value.current.value)
    }
    return (
        <div style={{marginTop: "1em"}}>
            {hide === false ?
                <input style={{textAlign: "center"}} onChange={() => token()}
                       ref={value} placeholder="вставьте токен" type="text"
                       className="form-control inputControl" aria-label="Default"
                       aria-describedby="inputGroup-sizing-default"></input> : ''}

        </div>
    );
};

export default observer(InputToken);