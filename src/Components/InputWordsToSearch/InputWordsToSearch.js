import {observer} from 'mobx-react-lite';
import React, {useRef, useState} from 'react';
import Search from '../../State'

const InputWordsToSearch = () => {
    const value = useRef()
    const val = () => {
        Search.changeInput(value.current.value)
    }
    return (
        <div>
            <input ref={value} onChange={() => val()} style={{textAlign: "center"}}
                   placeholder=" ключевые слова для поиска групп" type="text"
                   className="form-control inputControl" aria-label="Default"
                   aria-describedby="inputGroup-sizing-default"></input>
        </div>
    );
};

export default observer(InputWordsToSearch)