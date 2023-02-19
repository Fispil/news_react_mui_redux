import { Typography, Container, Box, makeStyles } from '@material-ui/core';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { theme } from '../../theme';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const useStyles = makeStyles({
  label: {
    color: 'white' // define the color you want to use for the label here
  }
});

export const Footer = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  return (
    <footer
      style={{
        marginTop: '60px',
        backgroundColor: 'black',
        padding: '20px'
      }}
    >
      <Box sx={{ flexGrow: 1 }} bgcolor={theme.palette.primary.dark}>
        <Container>
          <Grid container>
            <Grid item md={12} xs={8}>
              <BottomNavigation
                sx={{ bgcolor: theme.palette.common.black }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction
                  label="Recents"
                  value="recents"
                  classes={{ label: classes.label }}
                  icon={<RestoreIcon htmlColor="lightBlue" />}
                />
                <BottomNavigationAction
                  label="Favorites"
                  value="favorites"
                  classes={{ label: classes.label }}
                  icon={<FavoriteIcon htmlColor="lightBlue" />}
                />
                <BottomNavigationAction
                  label="Nearby"
                  value="nearby"
                  classes={{ label: classes.label }}
                  icon={<LocationOnIcon htmlColor="lightBlue" />}
                />
                <BottomNavigationAction
                  label="Folder"
                  value="folder"
                  classes={{ label: classes.label }}
                  icon={<FolderIcon htmlColor="lightBlue" />}
                />
              </BottomNavigation>
            </Grid>
            <Grid
              item
              md={12}
              xs={4}
              justifyContent="center"
              alignSelf="center"
              sx={{ color: theme.palette.common.white, marginTop: '20px' }}
            >
              <Typography variant="h6" align="center" gutterBottom>
                © All rights reserved
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};
