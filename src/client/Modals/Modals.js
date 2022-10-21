import React from "react";
import ErrorFromServer from "./ErrorFromServer";
import { observer } from "mobx-react";
import Search from "../../store/State";
const Modals = () => {
  let data;
  let dataError = Search.errorFromServer;
  if (dataError) {
    data = true;
  } else {
    data = false;
  }

  return (
    <div>
      <ErrorFromServer data={data} />
    </div>
  );
};

export default observer(Modals);
