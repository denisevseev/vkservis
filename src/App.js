import './App.scss';
import { observer } from "mobx-react";
import React, { useEffect } from 'react'
import InputWordsToSearch from './Components/InputWordsToSearch/InputWordsToSearch';
import SubscribersCount from "./Components/SubscribersCount/SubscribersCount";
import InputMessageToSend from "./Components/InputMessageToSend/InputMessageToSend";
import SendMessageToGroup from "./Components/SendMessageToGroup/SendMessageToGroup";
import Avatar from "./Components/UserProfile/Avatar";
import AuthModal from "./Components/autorize/authModal/AuthModal";
import Preloader from "./Components/Preloader/Preloader";
import Instruction from "./Components/Instruction/Instruction";
import StartButtonSendMessage from "./Components/StartButtonSendMessage/StartButtonSendMessage";
import StopButtonSendMessage from "./Components/StopButtonSendMessage/StopButtonSendMessage";
function App() {
    return (
        <div className="App">
            <AuthModal/>
            <Avatar/>
            <Instruction/>
            <StopButtonSendMessage/>
            <InputWordsToSearch />
            <InputMessageToSend />
             <Preloader/>
            {/*<SubscribersCount />*/}
            <SendMessageToGroup />
            <StartButtonSendMessage/>
        </div>
    )
}


export default observer(App)
