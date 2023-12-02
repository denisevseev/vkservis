import React from "react";
import { observer } from "mobx-react";

const StopButton = () => {
  return (
    <div>
      <button className="btn btn-lg btn-outline-primary" type="button">
        Стоп
      </button>
    </div>
  );
};

export default observer(StopButton);
