import * as React from "react";
import { observer } from "mobx-react";
import Search from "../../store/State";
import ButtonAppBar from "./ButtonAppBar";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "../UserProfile/Avatar";
const Head = () => {
  console.log(Search.token, "ITS TOKEN");
  return (
    <Box className="App-header" sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "#61dafb" }} position="static">
        <Toolbar>
          <IconButton
            size="medium"
            edge="end"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span style={{ color: "blue", fontSize: "0.4em" }}>Эклер</span>
            cервис рассылок и сбора целевой аудитории вконтакте
          </Typography>
          {Search.token ? <ResponsiveAppBar /> : <ButtonAppBar />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default observer(Head);
