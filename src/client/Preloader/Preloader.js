import React, { useState } from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Preloader = () => {
  console.log(Search.progress)
  return (
    <div>
      <Modal show={Search.progress ? true : false}>
        <Modal.Body>
          <div
            style={{ color: "red", fontWeight: "bold", wordWrap: "break-word" }}
          >
            <div>
              {" "}
              {Search.progress} <span>{Search.dotProgress}</span>{" "}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default observer(Preloader);
