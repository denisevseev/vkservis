import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Search from '../../State'
import StartButtonSendMessage from '../StartButtonSendMessage/StartButtonSendMessage'
const Preloader = () => {
    const search = toJS(Search.SendDone)
    if (Search.start == true) { return <div>Идет рассылка...</div> }
    if(Search.Loader!=true){return <StartButtonSendMessage/>}
};

export default observer(Preloader)