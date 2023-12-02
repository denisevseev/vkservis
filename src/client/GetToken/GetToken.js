import React from "react";
import Search from "../../store/State";
import { Navigate } from "react-router-dom";

const GetToken = () => {
  const gettoken = () => {
    window.location.href =
      "https://oauth.vk.com/authorize?client_id=51405187&display=page&scope=wall,photos,friends,video,market,email,offline&response_type=token&v=5.131";
  };
  if (!Search.token) {
    return <button onClick={() => gettoken()}>Получить токен</button>;
  }
};

export default GetToken;
