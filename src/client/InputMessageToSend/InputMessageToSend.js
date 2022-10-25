import React, { useRef } from "react";
import Search from "../../store/State";
import { observer } from "mobx-react-lite";
import "./InputMessageToSend.Module.scss";
const InputMessageToSend = () => {
  Search.getLocalStorageArea();
  const value = useRef();
  const val = () => {
    Search.MessageForSend(value.current.value);
  };
  return (
    <div className="InputWords" style={{ marginTop: "2em", height: "6em" }}>
      <input
        ref={value}
        onChange={() => val()}
        style={{ textAlign: "center" }}
        placeholder="сообщение для рассылки"
        value={Search.sendMessage}
        type="text"
        className="form-control inputControl text-wrap"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
  );
};

export default observer(InputMessageToSend);
