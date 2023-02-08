import React, { useState } from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";
import Form from "react-bootstrap/Form";
const WaitSecSend = ({ cl }) => {
  let [color1, setColor1] = useState("");
  let [color2, setColor2] = useState("");
  let validation = (data, val) => {
    if (data == "from" && Number(val) != NaN) {
      Search.from = val;
      setColor2("blue");
    } else {
      setColor2("red");
    }
    if (data == "before" && Number(val) != NaN) {
      Search.before = val;
      setColor1("blue");
    } else {
      setColor1("red");
    }
  };
  return (
    <div className={cl}>
      <div>Задержка в секундах для рассылки:</div>
      <div className="input-group">
        <span className="input-group-text">От</span>
        <input
          onChange={(e) => validation("from", e.target.value)}
          type="text"
          aria-label="First name"
          style={{ borderColor: color1 }}
          className="form-control"
        />
        <span className="input-group-text">До</span>
        <input
          style={{ borderColor: color2 }}
          onChange={(e) => validation("before", e.target.value)}
          type="text"
          aria-label="Last name"
          className="form-control"
        />
      </div>
    </div>
  );
};

export default observer(WaitSecSend);
