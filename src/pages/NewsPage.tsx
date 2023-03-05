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
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { getNews } from '../utilitys/fetchNews';
import { Article } from '../types/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Delete from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme: Theme) => ({
  newsList: {
    marginTop: theme.spacing(2)
  },
  paginationBlock: {
    marginTop: theme.spacing(2)
  }
}));

export const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState('9');
  const [isLoading, setIsLoading] = useState(true);

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
      setArticles(latestNews);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      throw new Error('Api call limit exceeded');
    }
  }, []);

  const deleteNewsHandler = (articleIndex: number) => {
    const filteredArticle = articles.filter((article, index) => index !== articleIndex);
    setArticles(filteredArticle);
    console.log(filteredArticle);
  };

  useEffect(() => {
    loadNewsFromServer();
  });

  return (
    <>
      <Header />
      <main>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Container sx={{ marginTop: '80px' }}>
            <Grid container spacing={3} className={classes.newsList}>
              {getItemsForPage().map((article, index) => (
                <Grid item key={article.title} md={4}>
                  <Card sx={{ maxWidth: 600, height: 650 }}>
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
                      subheader={article.publishedAt}
                    />
                    {article.urlToImage && (
                      <CardMedia
                        component="img"
                        height="194"
                        image={article.urlToImage}
                        alt="News image"
                      />
                    )}
                    <CardContent>
                      <Typography variant="subtitle1" color="text.secondary">
                        {article.title}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography paragraph>{article.content}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
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

            <Grid
              container
              alignItems="center"
              className={classes.newsList}
              sx={{ justifyContent: 'center', margin: '10px 0' }}
              spacing={3}
            >
              <Grid item xs={1}>
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
              </Grid>
              <Grid item xs={5}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  size="large"
                />
              </Grid>
            </Grid>
          </Container>
        )}
      </main>
      <Footer />
    </>
  );
};
