import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Search from "./../../store/State";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  console.log(Search.token);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const han = () => {
    setAnchorEl(false);
  };
  const handleClose = () => {
    // Search.token = null
    localStorage.removeItem("user");
    localStorage.removeItem("loginData");
    window.location.href = "http://localhost";
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <IconButton edge="start">
          <Avatar alt="Remy Sharp" src={Search.photo} />
        </IconButton>
        {Search.first_name}
        <div style={{ visibility: "hidden" }}>..</div>
        {Search.last_name}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={han}
      >
        <MenuItem disableRipple>
          <EditIcon />
          Мой кабинет
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <LogoutIcon />
          Выйти
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import "./Avatar.Module.scss";
// import Search from "../../store/State";
// import { observer } from "mobx-react";
// const Avatar = () => {
//   console.log(Search.token);
//
//   const [state, setState] = useState("none");
//   const [ava, setAva] = useState(Search.avatar);
//
//   const handleStyle = () => {
//     if (state == "none") {
//       setState("block");
//     } else {
//       setState("none");
//     }
//   };
//
//   if (Search.token) {
//     return (
//       <div onClick={handleStyle} className="own">
//         <div>
//           {!Search.photo ? <div>Ваш аккаунт заблокирован</div> : ""}
//           <img
//             style={{ width: "2em", height: "2em", borderRadius: "2em" }}
//             src={Search.photo}
//             alt=""
//           />
//           <p>
//             <i className="down"></i>
//           </p>
//         </div>
//
//         <div style={{ display: state, cursor: "pointer" }}>
//           <div>{Search.first_name}</div>
//           <div>{Search.last_name}</div>
//           <div onClick={Search.Logout} className="menuavatar">
//             Выйти
//           </div>
//         </div>
//       </div>
//     );
//   }
// };
//
// export default observer(Avatar);
