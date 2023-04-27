import * as React from "react";
import Button from "@mui/material/Button";
import { observer } from "mobx-react";
const ButtonAppBar = () => {
  const getLink = () => {
    window.location.href =
      "https://oauth.vk.com/authorize?client_id=51612442&display=page&scope=wall,comments,posts,photos,groups,friends,video,market,email,offline&redirect_uri=http://localhost:80&response_type=token&v=5.131";
  };
  return (
    <Button onClick={getLink} variant="outlined" href="#outlined-buttons">
      Войти
    </Button>
  );
};
export default observer(ButtonAppBar);