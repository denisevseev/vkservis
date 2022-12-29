import "./App.scss";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import InputWordsToSearch from "./client/InputWordsToSearch/InputWordsToSearch";
import InputMessageToSend from "./client/InputMessageToSend/InputMessageToSend";
import SendMessageToGroup from "./client/SendDoneList/SendDoneList";
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
import Results from "./client/results/Results";
import NothingFound from "./client/Modals/NothingFound";
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
              <NothingFound />
              <Instruction />
              {/*<StopButtonSendMessage />*/}
              <div className="BorderSearchGroup">
                <div style={{ display: "flex" }}>
                  <InputWordsToSearch />
                  <Filter />
                </div>
                <Results />
              </div>

              {/*<InputMessageToSend />*/}
              {/*<SubscribersCount />*/}
              {/*<SendDoneList />*/}
              {/*<SubscribersCount />*/}
              {/*<WaitSecSend />*/}
              {/*<StartButtonSendMessage /> //рассылка компонента*/}
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
