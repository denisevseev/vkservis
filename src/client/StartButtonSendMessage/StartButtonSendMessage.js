import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";

const StartButtonSendMessage = () => {
  const ResultGroup = () => {
    Search.startSend = true;
    Search.ResultGroup();
  };

  return (
    <div className="StartButtonSendMessage">
      {2 > 1 ? (
        <button
          type="button"
          onClick={ResultGroup}
          className="btn btn-outline-primary"
        >
          Начать рассылку
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default observer(StartButtonSendMessage);
