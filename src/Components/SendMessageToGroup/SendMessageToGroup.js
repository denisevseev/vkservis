import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Search from '../../State'
import React, { useState } from 'react'
const SendMessageToGroup = () => {
    const search = Search.SendDone
    console.log(Search.SendDone, 'sendmessgroupclient')
    return (
        <div>
            {search.map((k) => {
                return <div key={k}>
                    {k instanceof Array ? '' : <a href={`https://vk.com/club${k}`}>{`https://vk.com/club${k}`}
                        <span style={{ color: 'black' }}>отправлено!</span> </a>}
                </div>

            })
            }
        </div>
    );
};


export default observer(SendMessageToGroup);