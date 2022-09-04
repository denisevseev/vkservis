import React from 'react';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import Search from '../../State'

const SendMessageToGroup = () => {
    const search = toJS(Search.SendDone)
    return (
        <div>
            {search.map((k) => {
                return <div>
                    <a href={`https://vk.com/club${k}`}>{`https://vk.com/club${k}`}</a>отправлено!
                </div>
            })}
        </div>
    );
};

export default observer(SendMessageToGroup);