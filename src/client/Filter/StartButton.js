import React from "react";
import Search from "../../store/State";
import { observer } from "mobx-react";
const StartButton = () => {
  return (
    <div>
      <button
        className="btn btn-outline-primary bg-info btn-lg"
        onClick={Search.startSearch}
        type="button"
      >
        Старт
      </button>
    </div>
  );
};

export default observer(StartButton);
