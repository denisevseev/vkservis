import React, { useRef, useState } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Search from "../../State";

const StartButtonSendMessage = () => {
    const [state, setState] = useState(false);
    const search = toJS(Search.Group);

    const  ResultGroup=()=> {
        Search.startSend()
        if (Search.token != null) {
            setState(true);
        }
        Search.ResultGroup();
    }

    return (
        <div style={{ marginTop: "1em" }}>
            {state === false ? (
                <button type="button"  onClick={()=>ResultGroup()} className="btn btn-outline-primary">Начать рассылку</button>
            ) : (
                ""
            )}
        </div>
    );
};

export default observer(StartButtonSendMessage);
