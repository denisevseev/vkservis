import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";
import StopButtonSendMessage from "../StopButtonSendMessage/StopButtonSendMessage";
import Form from "react-bootstrap/Form";

const StartButtonSendMessage = () => {
  const ResultGroup = () => {
    Search.ResultGroup();
  };

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
      {
        <button
          type="button"
          onClick={ResultGroup}
          className="btn bg-info btn-outline-primary"
        >
          Начать рассылку
        </button>
      }
    </div>
  );
};

export default observer(StartButtonSendMessage);
