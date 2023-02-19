import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Box,
  DialogTitle,
  Dialog
} from '@mui/material';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField
} from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from '../../theme';
import { Link } from 'react-router-dom';
import { User } from '../../types/User';
import { LoggedProfile } from '../LoggedProfile';

interface Props {
  user: User;
  onUserChange: (user: User) => void;
  userIsLogged: boolean;
  onUserIsLogged: (userIsLogged: boolean) => void;
}

export const Header: React.FC<Props> = ({ user, onUserChange, userIsLogged, onUserIsLogged }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginedUser = {
      login: login,
      password: password
    };

    onUserChange(loginedUser);
    if (login === '123@123' && password === '12345') {
      onUserIsLogged(true);
    } else {
      setLogin('');
      setPassword('');
      alert('Wrong loggin and password try again');
    }
    handleClose();
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexShrink: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 2 }}>
            <IconButton edge="start" color="inherit" area-laabel="menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ color: theme.palette.primary.light, flexShrink: 1 }}>
              Menu
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: '20px', flexShrink: 2 }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontSize: '20px'
              }}
            >
              Home
            </Link>
            <Link
              to="/news"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontSize: '20px'
              }}
            >
              News
            </Link>
          </Box>

          <Box
            mr={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 2
            }}
          >
            {userIsLogged ? (
              <LoggedProfile user={user} onUserChange={onUserChange} />
            ) : (
              <Box>
                <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
                  Log In
                </Button>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">
                      Please enter your login and password
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText></DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Adress"
                        type="email"
                        value={login}
                        onChange={handleLoginChange}
                        fullWidth
                      />
                      <TextField
                        autoFocus
                        value={password}
                        onChange={handlePasswordChange}
                        margin="dense"
                        id="pass"
                        label="Password"
                        type="password"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button color="primary" variant="outlined" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button color="error" variant="outlined" type="submit">
                        Log in
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>

                <Button
                  color="secondary"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.error.main,
                    marginLeft: theme.spacing(3),
                    flexShrink: 2
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
