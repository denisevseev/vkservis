import React from "react";
import Search from "../../store/State";
import { observer } from "mobx-react";
import "./../InputWordsToSearch/InputWordsToSearch.Module.scss";
import GroupListRender from "./GroupListRender";
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
            style={{
              textAlign: "left",
              height: "20em",
              backgroundColor: "white",
            }}
            // contentEditable={true}
          >
            <GroupListRender />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Results);
