import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";

const StartButtonSendMessage = () => {
  const ResultGroup = () => {
    Search.startSend = true;
    Search.ResultGroup();
    debugger;
  };

  return (
    <div style={{ marginTop: "1em" }}>
      {Search.token && !Search.start ? (
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
