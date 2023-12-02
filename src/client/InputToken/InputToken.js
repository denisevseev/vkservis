import React, { useEffect, useRef } from "react";
import "./Module.InputToken.scss";
import { observer } from "mobx-react";
import Search from "../../store/State";
import { useState } from "react";
import Login from "../autorize/Login";
import Pass from "../autorize/Pass";

const InputToken = () => {
  let search = Search.istoken();
  if (search !== null) {
    return (
      <div>
        <Login />
        <Pass />
      </div>
    );
  }
};

export default observer(InputToken);
