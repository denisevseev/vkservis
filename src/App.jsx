import "./App.scss";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import InputWordsToSearch from "./client/InputWordsToSearch/InputWordsToSearch";
import InputMessageToSend from "./client/InputMessageToSend/InputMessageToSend";
import { Routes, Route } from "react-router-dom";
import StartButtonSendMessage from "./client/StartButtonSendMessage/StartButtonSendMessage";
import StopButtonSendMessage from "./client/StopButtonSendMessage/StopButtonSendMessage";
import WaitSecSend from "./client/waitSecSend/WaitSecSend";
import Modals from "./client/Modals/Modals";
import Search from "./store/State";
import BuyAccounts from "./client/buyAccounts/BuyAccounts";
import Filter from "./client/Filter/Filter";
import Results from "./client/results/Results";
import NothingFound from "./client/Modals/NothingFound";
import Buttons from "./client/results/buttons/Buttons";
import ListRender from "./client/mailing/ListRender";
import SendDoneList from "./client/mailing/SendDoneList/SendDoneList";
import ButtonAppBar from "./client/Head/ButtonAppBar";
import CustomNavBar from "./client/LeftMenu/MenuLeft";
function App() {
  useEffect(() => {
    Search.ownPageLocalStorage();
    Search.getUser();
    Search.getToken();
  });
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/mailingToGroups"
          element={
            <div className="listRenderAndLeftMenu">
              <ListRender cl="one" />
              <WaitSecSend cl="WaitSecSend" />
              <InputMessageToSend />
              <div className="startStop">
                {!Search.startSend ? (
                  <StartButtonSendMessage />
                ) : (
                  <StopButtonSendMessage />
                )}
                <SendDoneList />
              </div>
            </div>
          }
        />
      </Routes>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <NothingFound />
                <ButtonAppBar />
                <CustomNavBar />
                <InputWordsToSearch />
                <Filter />
                <Results />
                <Buttons />
                <Modals />

              </>
            }
          />
          <Route exact path="/buyAccounts" element={<BuyAccounts />} />
        </Routes>
      </div>
    </div>
  );
}

export default observer(App);
