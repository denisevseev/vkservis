import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";
import StopButtonSendMessage from "../StopButtonSendMessage/StopButtonSendMessage";
import Form from "react-bootstrap/Form";
import AuthModal from "../autorize/authModal/AuthModal";
import Preloader from "../Preloader/Preloader";
import Button from "@mui/material/Button";

const StartButtonSendMessage = () => {
  return (
    <div className="StartButtonSendMessage">
      <Form.Check
        defaultChecked={Search.spamComments}
        onChange={(e) => Search.handleCheck("spamComments", e.target.checked)}
        label="Рассылать в комментарии если нельзя на стену"
      />
      <Form.Check
        defaultChecked={Search.delCommentPost}
        onChange={(e) => Search.handleCheck("delCommentPost", e.target.checked)}
        label="Удалять записи и комменты со стены перед публикацией поста или коммента"
      />
      <Form.Check
        defaultChecked={Search.joinGroups}
        onChange={(e) => Search.handleCheck("joinGroups", e.target.checked)}
        label="Вступать в группы"
      />
      {
        <Button
          type="button"
          onClick={Search.getMainTokenInLocal}
          className="btn bg-info btn-outline-primary"
        >
          {Search.startSend ? <Preloader /> : <div>Начать рассылку</div>}
        </Button>
      }
      {Search.authModal ? <AuthModal /> : ""}
    </div>
  );
};

export default observer(StartButtonSendMessage);
