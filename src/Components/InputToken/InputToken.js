import React, { useEffect, useRef } from 'react';
import './Module.InputToken.scss'
import { observer } from "mobx-react";
import Search from '../../State'
import { useState } from "react";

const InputToken = () => {
    const value = useRef()
    const [hide, show] = useState(false)
    let tokenVK = localStorage.getItem('token')
    console.log(tokenVK)
    if (tokenVK) {
        show(true)
    }
    const token = () => {
        Search.token(value.current.value)
    }
    return (
        <div style={{ marginTop: "1em" }}>
            {hide === false ?
                <input onChange={() => token()}
                    ref={value} placeholder="вставьте токен" type="text"
                    className="form-control inputControl" aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"></input> : ''}

        </div>
    );
};

export default observer(InputToken);