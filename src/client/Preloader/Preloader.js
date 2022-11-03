import React from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";
const Preloader = () => {
  if (Search.progress) {
    console.log(Search.progress);
    return <div>поиск групп {Search.progress}% </div>;
  } else if (Search.startSend) {
    return <div>идет рассылка...</div>;
  } else {
  }

};

export default observer(Preloader);
