import React, {useRef} from 'react';
import Search from '../../State'
import { observer } from 'mobx-react-lite';
const InputMessageToSend = () => {
    const value = useRef()
    const val = () => {
        Search.MessageForSend(value.current.value)
    }
    return (
        <div  style={{ marginTop: "2em" }}>
            <input ref={value} onChange={()=>val()}  style={{ textAlign: "center" }}
                placeholder="сообщение для рассылки"
                type="text" className="form-control inputControl" aria-label="Default"
                aria-describedby="inputGroup-sizing-default"/>
        </div>
    );
};

export default observer(InputMessageToSend);