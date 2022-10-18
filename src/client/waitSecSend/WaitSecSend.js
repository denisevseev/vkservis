import React from "react";
import { observer } from "mobx-react";
import { useRef } from "react";
import Search from "../../State";
const WaitSecSend = () => {
  const value = useRef();
  const value2 = useRef();
  const val = () => {
    Search.ChangeOt(value.current.value);
  };
  const val2 = () => {
    Search.ChangeDo(value2.current.value);
  };

  return (
    <div style={{ marginTop: "3em" }} className="inputs">
      <div>Задержка в секундах для рассылки:</div>
      <div className="input-group">
        <span className="input-group-text">От</span>
        <input
          ref={value}
          onChange={() => val()}
          type="text"
          aria-label="First name"
          className="form-control"
        />
        <span className="input-group-text">До</span>
        <input
          ref={value2}
          onChange={() => val2()}
          type="text"
          aria-label="Last name"
          className="form-control"
        />
      </div>
    </div>
  );
};

export default observer(WaitSecSend);
