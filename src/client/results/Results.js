import React from "react";
import Search from "../../store/State";
import { observer } from "mobx-react";
import "./../InputWordsToSearch/InputWordsToSearch.Module.scss";
const Results = () => {
  const foundGroups = () => {
    if (Search.groupListRender.length > 0) {
      return (
        <span>найдено сообществ {"  " + Search.groupListRender.length}</span>
      );
    }
  };
  return (
    <div className="results">
      <label className="form-check-label" htmlFor="flexCheckChecked">
        Результаты: {foundGroups()}
      </label>
      <div className="border1">
        <div className="form-group">
          <div
            className="overflow-auto"
            style={{ textAlign: "left", height: "20em", backgroundColor: 'white' }}
            contentEditable={true}
          >
            {Search.groupListRender.map((k) => {
              return (
                <div key={k}>
                  {
                    <a href={`https://vk.com/club${k.id}`} target="_blank">
                      {`https://vk.com/club${k.id}`}{" "}
                      <span style={{ visibility: "hidden" }}>.....</span>
                      <span style={{ color: "black" }}>{k.name}</span>
                    </a>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Results);
