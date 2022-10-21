import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Search from "../../store/State";
import StartButtonSendMessage from "../StartButtonSendMessage/StartButtonSendMessage";
const Preloader = () => {
  if (Search.startSend == true) {
    return <div>Идет рассылка...</div>;
  }
  // if(Search.Loader!=true){return <StartButtonSendMessage/>}
};

export default observer(Preloader);
