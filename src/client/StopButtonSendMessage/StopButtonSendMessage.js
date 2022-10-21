import React from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";
const StopButtonSendMessage = () => {
  console.log("6");
  return (
    <div>
      {Search.startSend ? (
        <button
          type="button"
          onClick={() => Search.StopSend()}
          className="btn btn-outline-primary"
        >
          Остановить рассылку
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default observer(StopButtonSendMessage);
