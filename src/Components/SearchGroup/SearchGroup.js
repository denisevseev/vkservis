import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Search from '../../State'
import StartButtonSendMessage from '../StartButtonSendMessage/StartButtonSendMessage'
const SearchGroup = () => {
    const search = toJS(Search.SendDone)
    function ResultGroup() {
        if (search.length==0) {
            Search.ResultGroup(Search.inputValue)
        }
    }
    if (Search.Loader == true) { return <div>Идет рассылка...</div> }
    if (search.length == 0) {
      return <StartButtonSendMessage/>
    }
    else {
        return (
            <div>
                {/* {search.map((k) => {
                    return (<div>
                        <a key={k.id} href={`https://vk.com/club${k.id}`}>{`https://vk.com/club${k.id}`}</a>
                    </div>)
                })} */}

            </div>
        )
    }

};

export default observer(SearchGroup)