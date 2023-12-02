import React, { useRef } from "react";
import Search from "../../store/State";
import { observer } from "mobx-react-lite";
import "./InputMessageToSend.Module.scss";
const InputMessageToSend = () => {
  Search.getLocalStorageArea();
  return (
    <div className="InputWords">
      <input
        // ref={value}
        onChange={(e) => (Search.sendMessage = e.target.value)}
        placeholder="сообщение для рассылки"
        value={Search.sendMessage}
        className="form-control inputControl"
      />
    </div>
  );
};

export default observer(InputMessageToSend);
