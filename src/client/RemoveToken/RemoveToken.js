import React from 'react';

const RemoveToken = () => {
    const remove = ()=>{localStorage.removeItem('token'); window.location.reload()}
    return (
        <div>
            <button onClick={()=>remove()}>удалить токен</button>
        </div>
    );
};

export default RemoveToken;