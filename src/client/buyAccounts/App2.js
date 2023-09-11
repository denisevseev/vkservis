import React, { useState } from 'react';
import {
    AppBar,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const App2 = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    <Avatar
                        onClick={handleAvatarClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <AccountCircleIcon />
                    </Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Личный кабинет</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Выйти</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer open={isDrawerOpen} onClose={handleDrawerClose}>
                <List>
                    <ListItem button>
                        <ListItemText primary="Пункт 1kjhhhhhhhhhhhhhhhhhhhh" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Пункт 2" />
                    </ListItem>
                    {/* Добавьте другие пункты для бокового меню */}
                </List>
            </Drawer>
        </div>
    );
};

export default App2;
