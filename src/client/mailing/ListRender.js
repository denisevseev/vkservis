import React from "react";
import GroupListRender from "../results/GroupListRender";

const ListRender = ({ cl }) => {
  console.log(cl);
  return (
    <div className={cl}>
      <div className="border1">
        <div className="form-group">
          <div
            className="overflow-auto"
            style={{
              textAlign: "left",
              height: "20em",
              backgroundColor: "white",
            }}
          >
            <GroupListRender />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRender;
