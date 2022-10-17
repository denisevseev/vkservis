import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "../Login";
import Pass from "../Pass";
import Search from './../../../State'
import {observer} from "mobx-react";
import Captcha from "../../captcha/Captcha";

const AuthModal = () => {
    const name = Search.last_name
    let [state, setState] = useState(name)
    useEffect(()=>{
    Search.istoken()
     if(state===null) setState(name)
    })
    const [show, setShow] = useState(false);
    const [preload, setPreload] = useState('Войти')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlePreload = ()=>{}
    if(Search.token!==null){
       return handleClose
    }



    const preloader = <img style={{width: '1em', height: '1em', borderRadius: "2em"}} src='https://i.ibb.co/ZSHVv2v/1488.gif' alt=""/>
    return (
        <div >
            {state===null?
                <button type="button"  onClick={()=>{
                    handleShow()
                    Search.GetLoginData()
                }}
                        className="btn btn-outline-primary">
                    Войти с помщью VK</button>:''
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Captcha/>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{width: "10em"}} onClick={()=> {
                        Search.AutorizeOwnMethod()
                        setPreload(preloader)
                    }} className="btn btn-outline-primary">
                        {preload}
                    </Button>
                    <span className="btn btn-outline-primary" onClick={handleClose}>
                        Закрыть
                    </span>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default observer(AuthModal);
