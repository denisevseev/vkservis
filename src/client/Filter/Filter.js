import React from 'react';
import Select from 'react-select'
import options from "../options/Options";
import Form from 'react-bootstrap/Form';
import './Filter.Module.scss'
const Filter = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    return (
        <div >
            Фильтрация сообществ
            <div className='border1'>
                <Select  placeholder='все типы сообществ' options={options} />
                <Select  placeholder='открытые и закрытые сообщества' options={options} />
                <Form.Check label='Открытые стены' style={{textAlign: "left"}}/>
                <Form.Check label='Открытые сообщения' style={{textAlign: "left"}}/>
                <Form.Check label='Открытые комментарии' style={{textAlign: "left"}}/>
                <div className="border1">
                    <Form.Check label='Количество участников' style={{textAlign: "left"}}/>
                    <div style={{display: 'flex'}}>
                        <Form.Group >
                            <Form.Control placeholder="500" />
                        </Form.Group>
                        -
                        <Form.Group >
                            <Form.Control placeholder="1000" />
                        </Form.Group>
                    </div>
                    <div style={{paddingTop: "5.3em"}} className="border1" >
                        <button className='btn btn-outline-primary'>старт</button>
                        <button className='btn btn-outline-primary'>стоп</button>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Filter;