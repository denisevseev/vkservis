import React from "react";
import Search from "../../store/State";
const GroupListRender = () => {
  return (
    <div>
      {!Search.nothingFound?Search.groupListRender.map((k) => {
        return (
          <div key={k}>
            {
              <a href={`https://vk.com/club${k.id}`} target="_blank">
                {`https://vk.com/club${k.id}`}{" "}
                <span style={{ visibility: "hidden" }}>.....</span>
                <span style={{ color: "black" }}>{k.name}</span>
              </a>
            }
          </div>
        );
      }):""}
    </div>
  );
};

export default GroupListRender;
