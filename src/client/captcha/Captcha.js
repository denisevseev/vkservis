import React from "react";
import Search from "../../store/State";
import { useState } from "react";
import Login from "../autorize/Login";
import Pass from "../autorize/Pass";
import { observer } from "mobx-react";

const Captcha = () => {
  let handle = (e) => {
    Search.captchaValue = e.target.value;
    console.log(Search.captchaValue);
  };
  let handleSend = () => {
    // Search.AutorizeOwnMethod()
    Search.captcha = null;
    window.location.reload();
  };
  const getVk = () => {};

  if (Search.captcha) {
    return (
      <div>
        <img src={Search.captcha} alt="" />
        {/*<input onChange={(e)=>handle(e)} className="form-control inputControl"/>*/}
        <div>
          сервер вернул капчу, войдите сначала{" "}
          <a href="https://vk.com/login" target="_blank">
            в вконтакте
          </a>
          , затем снова войдите на этом сайте
        </div>
        <button onClick={handleSend} className="btn btn-outline-primary">
          закрыть
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <Login />
        <Pass />
      </div>
    );
  }
};

export default observer(Captcha);
