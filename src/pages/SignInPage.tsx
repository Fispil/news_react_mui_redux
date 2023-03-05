import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Footer } from '../components/Footer';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import { useAppDispatch, useAppSelector } from '../utilitys/hooks';
import { actions as userActions } from '../features/userReducer';
import { useNavigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const currentUser = {
      login: data.get('email'),
      password: data.get('password')
    };

    if (currentUser.login === '123@123' && currentUser.password === '12345') {
      dispatch(userActions.setLoggin(currentUser.login));
      dispatch(userActions.setPassword(currentUser.password));
      dispatch(userActions.setIsLoggined(true));
      console.log(user);

      setTimeout(() => {
        navigate('/profile');
      }, 500);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" sx={{ minHeight: 'calc(100vh - 135px - 64px)' }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Incorrect username or password
          </Alert>
        )}
      </Container>
      <Footer />
    </React.Fragment>
  );
};
