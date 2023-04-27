import React, { useEffect, useRef, useState } from "react";
import "./Module.LeftMenu.scss";
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import Search from "./../../store/State";

const LeftMenu = ({ cl }) => {
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
    setTimeout(() => setActive(false), 2000);
  };
  return (
    <div className={cl}>
      <input type="checkbox" id="hmt" className="hidden-menu-ticker" />
      <label className="btn-menu" htmlFor="hmt">
        <span className="first"></span>
        <span className="second"></span>
        <span className="third"></span>
      </label>
      <div className="hidden-menu">
        <NavLink to="/">
          <li>
            <a style={{ marginTop: "1em" }} className="dropdown-item" href="#">
              группы
            </a>
          </li>
        </NavLink>
        <NavLink to="/mailingToGroups">
          <li>
            <a className="dropdown-item">рассылка</a>
          </li>
        </NavLink>

        <NavLink to="/BuyAccounts">
          <li>
            <a className="dropdown-item">Аккаунты</a>
          </li>
        </NavLink>
        <button onClick={Search.StopSend}>Остановить рассылку</button>
      </div>
    </div>
  );
};

export default observer(LeftMenu);
