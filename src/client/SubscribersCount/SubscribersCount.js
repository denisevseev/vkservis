import React from "react";
import { observer } from "mobx-react";
import "./SubscribersCount.Module.scss";
import { useRef } from "react";
import Search from "../../State";
const SubscribersCount = () => {
  const value = useRef();
  const value2 = useRef();
  const val = () => {
    Search.ChangeSubsOt(value.current.value);
  };
  const val2 = () => {
    Search.ChangeSubsDo(value2.current.value);
  };

  return (
    <div className="inputs">
      <div>Количество подписчиков в группах</div>
      <div className="input-group">
        <span className="input-group-text">ОТ</span>
        <input
          ref={value}
          onChange={() => val()}
          type="text"
          value={Search.getLocalStorageArea().subsOt}
          aria-label="First name"
          className="form-control"
        />
        <span className="input-group-text">До</span>
        <input
          ref={value2}
          value={Search.getLocalStorageArea().subsDo}
          onChange={() => val2()}
          type="text"
          aria-label="Last name"
          className="form-control"
        />
      </div>
    </div>
  );
};

export default observer(SubscribersCount);
