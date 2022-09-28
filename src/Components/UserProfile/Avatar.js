import React from "react";
import "./Avatar.Module.scss";
import Search from "./../../State";
import { observer } from "mobx-react";
const Avatar = () => {
    let out = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    let name = Search.last_name;
    let firstname = Search.first_name;
    let photo = Search.photo;

    if (name != null) {
        return (
            <div className="own">
                <div>
                    <img
                        style={{ width: "2em", height: "2em", borderRadius: "2em" }}
                        src={photo}
                        alt=""
                    />
                </div>
                <p>
                    <i className="down"></i>
                </p>
                <h4>{name}</h4>
                <h4>{firstname}</h4>
                <div onClick={() => out()} className="menuavatar">
                    Выйти
                </div>
            </div>
        );
    }
};

export default observer(Avatar);
