import React from "react";
import Avatar from "../UserProfile/Avatar";

const Instruction = () => {
  return (
    <div className="App-header">
      <Avatar />
      <h1 style={{ fontSize: "1em" }}>
        {" "}
        <span style={{ color: "blue", fontSize: "0.4em" }}>Эклер</span> сервис
        рассылок и сбора целевой аудитории вконтакте
      </h1>
    </div>
  );
};

export default Instruction;
