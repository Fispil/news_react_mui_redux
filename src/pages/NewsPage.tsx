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
import { Article, FeaturedPosts, MainPost } from '../types/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShareIcon from '@mui/icons-material/Share';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@mui/icons-material/Home';
import { makeStyles } from '@material-ui/core/styles';
import { Box, useMediaQuery } from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Delete from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../utilitys/hooks';
import { PopUpMenu } from '../components/PopUpMenu';
import { FeaturedPost } from '../components/FeaturedPost';
import { MainFeaturedPost } from '../components/MainFeaturedPost';

const useStyles = makeStyles((theme: Theme) => ({
  newsList: {
    marginTop: '40px',
    '@media (max-width:600px)': {
      marginTop: 0
    }
  },
  feauredPostList: {
    marginTop: '40px'
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
    position: 'sticky',
    bottom: '0'
  }
}));

export const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState('12');
  const [isLoading, setIsLoading] = useState(true);
  const [currentSelectedItem, setCurrentSelectedItem] = useState(0);
  const [mainFeaturedPost, setMainFeaturedPost] = useState<MainPost>({
    title: '',
    description: '',
    image: '',
    imageText: 'main image description',
    linkText: 'Continue reading…'
  });
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPosts[]>([]);
  const matches = useMediaQuery('(min-width:500px)');
  const userIsLoggined = useAppSelector((state) => state.user.isLoggined);

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setitemsPerPage(event.target.value as string);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const classes = useStyles();

  const totalPages = Math.ceil(articles.length / +itemsPerPage);

  const getItemsForPage = useCallback((): Article[] => {
    const startIndex = (page - 1) * +itemsPerPage;
    const endIndex = startIndex + +itemsPerPage;
    return articles.slice(startIndex, endIndex);
  }, [articles, itemsPerPage, page]);

  const loadNewsFromServer = useCallback(async () => {
    try {
      const latestNews = await getNews();
      setArticles(latestNews);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw new Error(`Api call limit exceeded: ${err}`);
    }
  }, []);

  const deleteNewsHandler = (articleIndex: number) => {
    const filteredArticle = articles.filter((article, index) => index !== articleIndex);
    setArticles(filteredArticle);
  };

  useEffect(() => {
    loadNewsFromServer();
  }, []);

  useEffect(() => {
    const allVisibleArticles = getItemsForPage();
    setVisibleArticles(allVisibleArticles);
  }, [getItemsForPage]);

  useEffect(() => {
    if (articles.length) {
      const latestFeatredMainPost = {
        title: articles[0].title,
        description: articles[0].content,
        image: articles[0].imageUrl,
        imageText: 'main image description',
        linkText: 'Continue reading…'
      };

      const latestFeaterdPost = [
        {
          title: articles[4].title,
          date: articles[4].date,
          description: articles[4].content,
          image: articles[4].imageUrl,
          imageLabel: 'Image Text'
        },
        {
          title: articles[5].title,
          date: articles[5].date,
          description: articles[5].content,
          image: articles[5].imageUrl,
          imageLabel: 'Image Text'
        }
      ];

      setMainFeaturedPost(latestFeatredMainPost);

      setFeaturedPosts(latestFeaterdPost);
    }
  }, [articles]);

  return (
    <>
      {matches && <Header />}
      <Container
        component="main"
        sx={{
          marginTop: '40px',
          minHeight: 'calc(100vh - 135px - 64px)',
          '@media (max-width:600px)': {
            marginTop: '32px'
          }
        }}
        maxWidth="xl"
      >
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
          <Container maxWidth="xl">
            <Box sx={{ maxHeight: '360' }}>
              <MainFeaturedPost post={mainFeaturedPost} />
            </Box>
            <Box className={classes.feauredPostList}>
              <Grid container spacing={3}>
                {featuredPosts.map((post) => (
                  <FeaturedPost key={post.title} post={post} />
                ))}
              </Grid>
            </Box>
            <Box className={classes.newsList}>
              <Grid container spacing={3}>
                {visibleArticles.map((article, index) => (
                  <Grid item key={article.id} xs={12} sm={6} md={3}>
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
            </Box>

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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                flexGrow: '1',
                height: '55px'
              }}
            >
              <PopUpMenu />
              <Typography sx={{ textAlign: 'center' }}>Menu</Typography>
            </Box>
            <BottomNavigationAction
              label={
                <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    fontSize: '16px'
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
                userIsLoggined ? (
                  <Link
                    to="/profile"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontSize: '16px'
                    }}
                  >
                    MyProfile
                  </Link>
                ) : (
                  <Link
                    to="/signin"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontSize: '16px'
                    }}
                  >
                    SignIn
                  </Link>
                )
              }
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
        </Box>
      )}
    </>
  );
};
