import './App.css';
import { observer } from "mobx-react";
import React, { useEffect } from 'react'
import InputToken from './Components/InputToken/InputToken';
import SearchGroup from './Components/SearchGroup/SearchGroup';
import InputWordsToSearch from './Components/InputWordsToSearch/InputWordsToSearch';
import SubscribersCount from "./Components/SubscribersCount/SubscribersCount";
import InputMessageToSend from "./Components/InputMessageToSend/InputMessageToSend";
import SendMessageToGroup from "./Components/SendMessageToGroup/SendMessageToGroup";
import StartButtonSendMessage from "./Components/StartButtonSendMessage/StartButtonSendMessage";
import GetToken from "./Components/GetToken/GetToken";
import Instruction from "./Components/Instruction/Instruction";
import RemoveToken from "./Components/RemoveToken/RemoveToken";
import Search from './State'
import Login from "./Components/autorize/Login";
import Pass from "./Components/autorize/Pass";


function App() {
    const s = Search.i
    console.log(s)
    return (
        <div className="App">
            {/*<div>{search}</div>*/}
            {/*<RemoveToken/>*/}
            <Instruction/>
            {/*<GetToken/>*/}
             <InputToken/>
            {/*<Login/>*/}
            {/*<Pass/>*/}
            <InputWordsToSearch />
            <InputMessageToSend />
             <SearchGroup/>
            <SubscribersCount />
            <SendMessageToGroup />
            {/*<StartButtonSendMessage />*/}
        </div>
    )
}


export default observer(App)
