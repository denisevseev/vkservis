import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "../Login";
import Pass from "../Pass";

const AuthModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button type="button"  onClick={handleShow} className="btn btn-outline-primary">Войти с помщью VK</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login/>
                    <Pass/>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{width: "18em"}} className="btn btn-outline-primary" onClick={handleClose}>
                        Войти
                    </Button>
                    <span className="btn btn-outline-primary" onClick={handleClose}>
                        Закрыть
                    </span>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AuthModal;
