import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Search from '../../State'
import StartButtonSendMessage from '../StartButtonSendMessage/StartButtonSendMessage'
const SearchGroup = () => {
    const search = toJS(Search.Group)
    function ResultGroup() {
        if (search == null) {
            Search.ResultGroup(Search.inputValue)
        }
    }
    if (Search.Loader == true) { return <div>Загрузка...</div> }
    if (search == null) {
      return <StartButtonSendMessage/>
    }
    else {
        return (
            <div>
                {/* {search.map((k, value) => {
                    return (<div>
                        <a href={`https://vk.com/club${k.id}`}>{`https://vk.com/club${k.id}`}</a>
                    </div>)
                })} */}

            </div>
        )
    }

};

export default observer(SearchGroup)