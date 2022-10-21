import { toJS } from "mobx";
import { observer } from "mobx-react";
import Search from "../../store/State";
import React, { useEffect, useState } from "react";

const SendMessageToGroup = () => {
  if (!Search.Search_CheckIsSend) {
    console.log("8");
    Search.Search_CheckIsSend = true;
    Search.CheckIsSend();
  }

  return (
    <div>
      {Search.SendDoneReturn().map((k) => {
        console.log(k, k.length);
        return (
          <div key={k}>
            {k instanceof Array || k.length > 50 ? (
              ""
            ) : (
              <a href={`https://vk.com/club${k}`}>
                {`https://vk.com/club${k}`}
                <span style={{ color: "black" }}>&#10004;&#65039;</span>{" "}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default observer(SendMessageToGroup);
