import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";
import StopButtonSendMessage from "../StopButtonSendMessage/StopButtonSendMessage";

const StartButtonSendMessage = () => {
  const ResultGroup = () => {
    Search.ResultGroup();
  };

  return (
    <div className="StartButtonSendMessage">
      {
        <button
          type="button"
          onClick={ResultGroup}
          className="btn bg-info btn-outline-primary"
        >
          Начать рассылку
        </button>
      }
    </div>
  );
};

export default observer(StartButtonSendMessage);
