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
import StartButtonSendMessage from "./client/StartButtonSendMessage/StartButtonSendMessage";
import StopButtonSendMessage from "./client/StopButtonSendMessage/StopButtonSendMessage";
import WaitSecSend from "./client/waitSecSend/WaitSecSend";
import Modals from "./client/Modals/Modals";
function App() {
  return (
    <div className="App">
      <AuthModal />
      <Avatar />
      <Instruction />
      <StopButtonSendMessage />
      <InputWordsToSearch />
      <InputMessageToSend />
      <Preloader />
      {/*<SubscribersCount />*/}
      <SendMessageToGroup />
      <SubscribersCount />
      <WaitSecSend />
      <StartButtonSendMessage />
      <Modals />
      {/*<ErrorFromServer/>*/}
    </div>
  );
}

export default observer(App);
