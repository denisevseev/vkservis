import React from 'react';
import Modal from "react-bootstrap/Modal";
import Search from "../../store/State";
import Button from "react-bootstrap/Button";
import {observer} from "mobx-react";

const NothingFound = () => {
    let handleShow = ()=>{
     return    Search.nothingFound ? Search.nothingFound = false:''
    }
    return (
        <div>
            <Modal show={Search.nothingFound} >
                <Modal.Header closeButton>
                    <Modal.Title>Ошибка</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                       Ничего не найдено! Попробуйте изменить параметры поиска..
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow} >
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default observer(NothingFound) ;