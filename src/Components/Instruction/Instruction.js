import React from 'react';

const Instruction = () => {
    return (
        <div className="App-header">
            <h2>
                Чтобы начать рассылку нажмите получить "Получить токен",
                вы будете перенаправлены с этого сайта на вк.
                <hr/>
            </h2>
            <ul className="list-group" style={{textAlign: 'left'}}>
                <li className="list-group-item">1. скопируйте содержимое адресной строки</li>
                <li className="list-group-item">2. вернитесть на этот сайт </li>
                <li className="list-group-item">3. вставьте в текстовое поле для токена то что скопировали</li>
                <li className="list-group-item"> 4. заполните остальные поля и нажмите начать рассылку</li>
            </ul>
            <hr/>
        </div>
    );
};

export default Instruction;