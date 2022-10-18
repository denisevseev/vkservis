import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Search from "./../../State";

function ErrorFromServer({ data }) {
  console.log(data);
  let handleClose = () => {
    Search.errorFromServer = false;
    setTimeout(() => Search.Logout(), 500);
  };
  return (
    <>
      <Modal show={data} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ошибка</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Search.errorFromServer}
          <div>
            это означает что что-то не так с вашим аккаутом проверьте его или
            используйте другой.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ErrorFromServer;
