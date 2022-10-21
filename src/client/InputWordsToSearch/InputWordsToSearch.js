import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import Search from "../../store/State";
import "./InputWordsToSearch.Module.scss";

const InputWordsToSearch = () => {
  const value = useRef();
  const val = () => {
    Search.changeInput(value.current.value);
  };
  return (
    <div className="InputWordsToSearch">
      <input
        ref={value}
        onChange={() => val()}
        placeholder=" ключевое слово для поиска групп"
        value={Search.inputValue}
        type="text"
        className="form-control inputControl"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      ></input>
      <span>
        например: "Работа" или "знакомства". Сервис найдет все группы где в
        названии есть ваши слова и сделает по ним рассылку..
      </span>
    </div>
  );
};

export default observer(InputWordsToSearch);
