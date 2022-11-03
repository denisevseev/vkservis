import React, { useEffect, useRef, useState } from "react";
import "./Module.LeftMenu.scss";
// import State from "../store/State";
import { observer } from "mobx-react";

const LeftMenu = () => {
  const [isActive, setActive] = useState(false);
  let ChangeCheckBox = (e) => {
    // State.LeftMenuCheckboxes(e)
  };
  let ref = useRef();
  let showMenu = () => {
    ref.current.style.display = "inline";
  };
  const inputChanged = (e) => {
    setActive(true);
    // State.input(e.target.value)
    setTimeout(() => setActive(false), 2000);
  };
  return (
    <div>
      <input type="checkbox" id="hmt" className="hidden-menu-ticker" />
      <label className="btn-menu" htmlFor="hmt">
        <span className="first"></span>
        <span className="second"></span>
        <span className="third"></span>
      </label>

      <div className="hidden-menu">
        <li>
          <a className="dropdown-item" href="#">
            группы
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            рассылка
          </a>
        </li>
      </div>
    </div>
  );
};

export default observer(LeftMenu);
