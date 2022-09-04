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

function App() {
    // const token = 'vk1.a.nX9B8-Lkv_11G6q5F91vyc3LaAN-AedW_fvrx2MRidBmSScpTrJkyZBELrTbflDsnTzjjP5bPoZ4nAJHc43o7mmQpGDv8VbhxlDQ2EijtmwHO3ws_gT7bAdAMB03ktCGdNmIK7-QZIQ9pWw-Cp2ObugsHGcmC9j0Iz1lY3PnE1_sPTl4yoyJPM9vOxXa5A3S'
    // useEffect(() => {
    //     fetch(`https://api.vk.com/method/groups.search?&city_id=1&offset=0&count=1000&q=music&access_token=${token}&v=5.131`,
    //         {  mode: 'no-cors' })
    //         .then((res) => { console.log(res) })
    // })
    return (
        <div className="App">
             <InputToken/>
            <InputWordsToSearch />
            <InputMessageToSend />
             {/*<SearchGroup/> */}
            <SubscribersCount />
            <SendMessageToGroup />
            <StartButtonSendMessage />
        </div>
    )
}


export default observer(App)
