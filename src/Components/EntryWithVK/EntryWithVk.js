import React, {useState} from 'react';
import Search from "../../State";
import Login from "../autorize/Login";
import Pass from "../autorize/Pass";
import {observer} from "mobx-react";
import './EntryWithVk.Module.scss'
import InputToken from "../InputToken/InputToken";

const EntryWithVk = () => {
    const [state, setState] = useState(false)
    return (
        <div>

            {state==false?'': <InputToken/>}

        </div>
    );
};

export default observer(EntryWithVk)