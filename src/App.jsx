import "./App.scss";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import InputWordsToSearch from "./client/InputWordsToSearch/InputWordsToSearch";
import SubscribersCount from "./client/SubscribersCount/SubscribersCount";
import InputMessageToSend from "./client/InputMessageToSend/InputMessageToSend";
import SendMessageToGroup from "./client/SendMessageToGroup/SendMessageToGroup";
import Avatar from "./client/UserProfile/Avatar";
import AuthModal from "./client/autorize/authModal/AuthModal";
import Preloader from "./client/Preloader/Preloader";
import Instruction from "./client/Instruction/Instruction";
import { Routes, Route } from "react-router-dom";
import StartButtonSendMessage from "./client/StartButtonSendMessage/StartButtonSendMessage";
import StopButtonSendMessage from "./client/StopButtonSendMessage/StopButtonSendMessage";
import WaitSecSend from "./client/waitSecSend/WaitSecSend";
import Modals from "./client/Modals/Modals";
import LeftMenu from "./client/LeftMenu/LeftMenu";
import BuyAccounts from "./client/buyAccounts/BuyAccounts";
import Filter from "./client/Filter/Filter";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <AuthModal />
              <Avatar />
              <Instruction />
              <StopButtonSendMessage />
                <div style={{display: "flex", marginLeft: "25%"}} >
                  <InputWordsToSearch />
                  <Filter/>
                </div>
              {/*<InputMessageToSend />*/}
              <Preloader />
              {/*<SubscribersCount />*/}
              <SendMessageToGroup />
              <SubscribersCount />
              <WaitSecSend />
              <StartButtonSendMessage />
              <Modals />
              <LeftMenu />
            </>
          }
        />
        <Route exact path="/buyAccounts" element={<BuyAccounts />} />
      </Routes>
      {/*<ErrorFromServer/>*/}
    </div>
  );
}

export default observer(App);