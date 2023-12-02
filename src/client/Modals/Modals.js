import React from "react";
import ErrorFromServer from "./ErrorFromServer";
import { observer } from "mobx-react";
import Search from "../../store/State";
import Preloader from "../Preloader/Progress";
const Modals = () => {
  let data;
  let dataError = Search.errorFromServer;
  if (dataError) {
    data = true;
    return <ErrorFromServer data={data} />;
  } else {
    data = false;
  }
  if (Search.progress) {
    return <Preloader />;
  }
};

export default observer(Modals);
