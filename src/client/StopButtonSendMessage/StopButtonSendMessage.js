import React from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";
import Preloader from "../Preloader/Preloader";
import Button from "@mui/material/Button";
const StopButtonSendMessage = () => {
  return (
    <div className="StopButtonSendMessage">
      {
        <Button onClick={()=>Search.StopSend()} variant="outlined">
          Остановить рассылку
          <Preloader/>
        </Button>
      }
    </div>
  );
};

export default observer(StopButtonSendMessage);
