import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { theme } from '../../theme';
import { Link } from 'react-router-dom';
import { LoggedProfile } from '../LoggedProfile';
import { PopUpMenu } from '../PopUpMenu';
import { useAppSelector } from '../../utilitys/hooks';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const userLogin = useAppSelector((state) => state.user.login);
  const userIsLogged = useAppSelector((state) => state.user.isLoggined);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<unknown>) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexShrink: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 2,
              justifyContent: 'space-between',
              gap: '32px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PopUpMenu />
              <Typography variant="h6" sx={{ color: theme.palette.primary.light, flexShrink: 1 }}>
                {t('menu.menu')}
              </Typography>
            </Box>

            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontSize: '20px'
              }}
            >
              {t('menu.home')}
            </Link>
            <Link
              to="/news"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontSize: '20px'
              }}
            >
              {t('menu.news')}
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
            <Select
              labelId="language-switch-label"
              value={i18n.language}
              onChange={handleLanguageChange}
              sx={{ color: theme.palette.primary.light }}
            >
              <MenuItem value="eng">Eng</MenuItem>
              <MenuItem value="uk">Укр</MenuItem>
            </Select>
            {userIsLogged ? (
              <>
                <Typography>{`Hello, ${userLogin}`}</Typography>
                <LoggedProfile />
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary.dark}`,
                    borderRadius: '5px',
                    backgroundColor: 'rgb(176,224,230)',
                    color: 'black'
                  }}
                >
                  <Button component="a" href="#/signin" color="inherit">
                    {t('menu.signin')}
                  </Button>
                </Box>

                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary.dark}`,
                    borderRadius: '5px',
                    backgroundColor: 'rgb(220,20,60)',
                    color: 'black'
                  }}
                >
                  <Button component="a" href="#/signup" color="inherit">
                    {t('menu.signup')}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
