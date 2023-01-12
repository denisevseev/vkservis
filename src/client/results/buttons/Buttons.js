import React from "react";
import Search from "../../../store/State";
import { observer } from "mobx-react";
import './Module.Buttons.scss'

const Buttons = () => {
  return (
        <div className="d-grid gap-1 col-2 mx-auto buttons">
            <button className="btn btn-outline-primary" type="button">Копировать</button>
            <button className="btn btn-outline-primary" type="button">Сохранить</button>
            <button className="btn btn-outline-primary" type="button" onClick={() => (Search.groupListRender = [])}>Очистить</button>
        </div>
  );
};

export default observer(Buttons);
