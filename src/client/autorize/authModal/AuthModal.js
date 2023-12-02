import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Search from "./../../../store/State";
import { observer } from "mobx-react";
import Preloader from "../../Preloader/Preloader";

const handleClose = async () => {
  Search.loginMain = true;
  await Search.getOwnAuthToken(); //request for a master token from the server
};

const AuthModal = () => {
  const handleChancel = () => {
    Search.start = false;
    Search.loginMain = false;
  };

  return (
    <div>
      <Dialog
        open={Search.authModal}
        onClose={() => (Search.start = false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Из-за ограничений VK мы не можем сделать рассылку с текущим токеном,
          вам придеться ввести логин и пароль от VK чтобы сгенерировать новый
          токен и сделать рассылку!
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Телефон или почта VK"
            type="email"
            value={Search.login}
            fullWidth
            onChange={(e) => (Search.login = e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Пароль VK"
            value={Search.pass}
            type="password"
            fullWidth
            onChange={(e) => (Search.pass = e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {Search.loginMain ? <Preloader /> : <div>Войти</div>}
          </Button>
          <Button onClick={handleChancel} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default observer(AuthModal);
