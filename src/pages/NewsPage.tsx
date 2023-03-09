import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Theme,
  Typography,
  CircularProgress,
  Backdrop,
  Modal,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { getNews } from '../utilitys/fetchNews';
import { Article } from '../types/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShareIcon from '@mui/icons-material/Share';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@mui/icons-material/Home';
import { makeStyles } from '@material-ui/core/styles';
import { Box, useMediaQuery } from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Delete from '@mui/icons-material/Delete';
import Menu from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  newsList: {
    marginTop: theme.spacing(2)
  },
  paginationBlock: {
    marginTop: theme.spacing(2)
  },
  card: {
    maxWidth: 600,
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actions: {
    display: 'flex'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing(2)
  },
  pagginationcontainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: '16px 0'
  },
  mobilebottomnavigation: {
    width: '100%',
    position: 'fixed',
    bottom: '0'
  }
}));

export const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState('9');
  const [isLoading, setIsLoading] = useState(true);
  const [currentSelectedItem, setCurrentSelectedItem] = React.useState(0);
  const matches = useMediaQuery('(min-width:500px)');

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setitemsPerPage(event.target.value as string);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const classes = useStyles();

  const totalPages = Math.ceil(articles.length / +itemsPerPage);

  const getItemsForPage = (): Article[] => {
    const startIndex = (page - 1) * +itemsPerPage;
    const endIndex = startIndex + +itemsPerPage;
    return articles.slice(startIndex, endIndex);
  };

  const loadNewsFromServer = useCallback(async () => {
    try {
      const latestNews = await getNews();
      latestNews.slice(0, 25);

      setArticles(latestNews);
      console.log(latestNews);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      throw new Error('Api call limit exceeded');
    }
  }, []);

  const deleteNewsHandler = (articleIndex: number) => {
    const filteredArticle = articles.filter((article, index) => index !== articleIndex);
    setArticles(filteredArticle);
  };

  useEffect(() => {
    loadNewsFromServer();
  }, []);

  return (
    <>
      {matches && <Header />}
      <main>
        <Container sx={{ marginTop: '80px', minHeight: 'calc(100vh - 135px - 64px)' }}>
          {isLoading ? (
            <Modal
              open={isLoading}
              className={classes.modal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 100
              }}
            >
              <CircularProgress className={classes.progress} />
            </Modal>
          ) : (
            <Container>
              <Grid container spacing={3} className={classes.newsList}>
                {getItemsForPage().map((article, index) => (
                  <Grid item key={article.id} md={4}>
                    <Card sx={{ maxWidth: 600, minHeight: 650 }} className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton onClick={() => deleteNewsHandler(index)}>
                            <Delete />
                          </IconButton>
                        }
                        title={article.title}
                      />
                      {article.imageUrl && (
                        <CardMedia
                          component="img"
                          height="194"
                          image={article.imageUrl}
                          alt="News image"
                        />
                      )}
                      <CardContent>
                        <Typography paragraph>{article.content}</Typography>
                      </CardContent>
                      <CardActions disableSpacing className={classes.actions}>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box className={classes.pagginationcontainer}>
                <Box>
                  <FormControl>
                    <InputLabel id="select__items_per_page">Items</InputLabel>
                    <Select
                      labelId="select__items_per_page"
                      id="selector__items_per_page"
                      value={itemsPerPage}
                      label="itemsPerPage"
                      onChange={handleItemsPerPageChange}
                    >
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={15}>15</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    size="large"
                  />
                </Box>
              </Box>
            </Container>
          )}
        </Container>
      </main>
      {matches ? (
        <Footer />
      ) : (
        <Box className={classes.mobilebottomnavigation}>
          <BottomNavigation
            showLabels
            value={currentSelectedItem}
            onChange={(event, newValue) => {
              setCurrentSelectedItem(newValue);
            }}
          >
            <BottomNavigationAction label="Menu" icon={<Menu />} />
            <BottomNavigationAction
              label={
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
              }
              icon={<HomeIcon />}
            />
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction
              label={
                <Link
                  to="/profile"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    fontSize: '20px'
                  }}
                >
                  MyProfile
                </Link>
              }
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
        </Box>
      )}
    </>
  );
};
