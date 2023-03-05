import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Divider, makeStyles } from '@material-ui/core';
import DarkModeSwitch from '../DarkModeSwitch/DarkModeSwitch';
import { theme } from '../../theme';

const useStyles = makeStyles({
  menuItem: {
    color: theme.palette.primary.dark
  }
});

export const PopUpMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <Box sx={{ marginTop: '20px', color: theme.palette.error }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenu}
      >
        <MenuIcon color="secondary" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={handleCloseMenu}
          component={Link}
          to="/about"
          className={classes.menuItem}
        >
          About
        </MenuItem>
        <MenuItem
          onClick={handleCloseMenu}
          component={Link}
          to="/contact"
          className={classes.menuItem}
        >
          Contact
        </MenuItem>
        <Divider />
        <DarkModeSwitch />
      </Menu>
    </Box>
  );
};
