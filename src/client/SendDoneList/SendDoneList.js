import { observer } from "mobx-react";
import Search from "../../store/State";
import React, { useEffect, useState } from "react";

const SendDoneList = () => {
  //вывод групп по которым разослано сообщение
  if (!Search.Search_CheckIsSend) {
    console.log("8");
    Search.Search_CheckIsSend = true;
    Search.CheckIsSend();
  }

  return (
    <div>
      {Search.SendDoneReturn().map((k) => {
        return (
          <div key={k}>
            {
              <a href={`https://vk.com/club${k}`}>
                {`https://vk.com/club${k}`}
                <span style={{ color: "black" }}>&#10004;&#65039;</span>{" "}
              </a>
            }
          </div>
        );
      })}
    </div>
  );
};

export default observer(SendDoneList);
