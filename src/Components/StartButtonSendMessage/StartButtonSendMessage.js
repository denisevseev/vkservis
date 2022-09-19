import React, { useRef, useState } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Search from "../../State";

const StartButtonSendMessage = () => {
    const [hide, show] = useState(false);
    const search = toJS(Search.Group);

    function ResultGroup() {
        if (Search.token != null) {
            show(true);
        } else {
            alert("вставьте токен");
        }
        Search.ResultGroup();
    }

    return (
        <div style={{ marginTop: "1em" }}>
            {hide === false ? (
                <button onClick={() => ResultGroup()}>Начать рассылку</button>
            ) : (
                ""
            )}
        </div>
    );
};

export default observer(StartButtonSendMessage);
