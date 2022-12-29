import React from "react";
import Search from "../../store/State";
import { observer } from "mobx-react";
import "./../InputWordsToSearch/InputWordsToSearch.Module.scss";
const Results = () => {
  return (
    <div className="results">
      <label className="form-check-label" htmlFor="flexCheckChecked">
        Результаты:
      </label>
      <div className="border1">
        <div className="form-group">
          <div
            className="border1 overflow-auto"
            style={{ textAlign: "left", height: "30em" }}
          >
            {Search.groupListRender.map((k) => {
              return (
                <div key={k}>
                  {
                    <a href={`https://vk.com/club${k.id}`} target="_blank">
                      {`https://vk.com/club${k.id}`}{" "}
                      <span style={{ color: "black" }}>{k.name}</span>
                    </a>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ display: "inline-block" }}>
        <button className="btn btn-outline-primary">Копировать</button>
        <button className="btn btn-outline-primary">Сохранить</button>
        <button className="btn btn-outline-primary" onClick={()=>Search.groupListRender=[]}>Очистить</button>
      </div>
    </div>
  );
};

export default observer(Results);
