import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { theme } from '../theme';
import BreakingNewsImage from '../pictures/breaking_News.png';
import { NewsReviewCard } from '../components/NewsCard';
import { User } from '../types/User';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface Props {
  user: User;
  onUserChange: (user: User) => void;
  userIsLogged: boolean;
  onUserIsLogged: (userIsLogged: boolean) => void;
}

export const MainPage: React.FC<Props> = ({ user, onUserChange, userIsLogged, onUserIsLogged }) => {
  return (
    <>
      <Header
        user={user}
        onUserChange={onUserChange}
        userIsLogged={userIsLogged}
        onUserIsLogged={onUserIsLogged}
      />
      <main>
        <Paper
          sx={{
            marginTop: '64px',
            color: theme.palette.common.black,
            backgroundImage: `url(${Image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh'
          }}
        >
          <Container fixed>
            <Grid container>
              <Grid item md={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Box sx={{ position: 'relative', padding: theme.spacing(3) }}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color={theme.palette.common.black}
                    sx={{ paddingTop: '20px' }}
                    gutterBottom
                  >
                    Honest and non-bribery news.
                  </Typography>
                  <img
                    src={BreakingNewsImage}
                    style={{ float: 'right', minWidth: '150px', maxWidth: '600px' }}
                  ></img>
                  <Typography
                    variant="h6"
                    color={theme.palette.common.black}
                    paragraph
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    Introducing our honest and non-bribery news portal - a platform that provides
                    unbiased and objective news coverage on a wide range of topics. We are committed
                    to maintaining the highest standards of journalistic integrity, and we do not
                    accept bribes or engage in any form of corruption. Our news portal is designed
                    to keep you informed about the latest happenings from around the world, with a
                    focus on accuracy, objectivity, and impartiality. We cover a broad range of
                    categories, including politics, business, technology, sports, entertainment, and
                    more, with a commitment to presenting all sides of the story.
                  </Typography>
                  <Typography
                    variant="h6"
                    color={theme.palette.common.black}
                    paragraph
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    We have a team of experienced journalists and writers who are dedicated to
                    providing accurate and reliable news coverage. Our reporters are trained to
                    gather information from multiple sources, fact-check all information, and
                    provide objective reporting. We do not allow personal biases or opinions to
                    influence our reporting, and we strive to present the facts in a clear and
                    concise manner. In addition to the latest news, our portal also offers opinion
                    pieces, editorials, and other types of analysis to help you understand the
                    context and significance of current events.
                  </Typography>
                  <Typography
                    variant="h6"
                    color={theme.palette.common.black}
                    paragraph
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    We encourage user engagement and provide a platform for discussion and debate,
                    but we do not tolerate hate speech or any form of discrimination. Overall, our
                    honest and non-bribery news portal is a trusted source of news and information,
                    and we are committed to providing the highest quality journalism without
                    compromising our principles or integrity. You can rely on us to deliver the news
                    you need to know, without fear or favor.
                  </Typography>
                  <Button variant="contained" color="secondary">
                    Learn More
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        <Box sx={{ marginTop: '40px' }}>
          <Container maxWidth="md">
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              News
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel in repellat commodi
              facilis? Odio dolorem cupiditate sed. Repellat optio, at perspiciatis hic nobis
              impedit, nostrum dignissimos culpa eum possimus suscipit?
            </Typography>
            <Box>
              <Grid container spacing={5} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Start Now
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Container sx={{ marginTop: '40px' }}>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card}>
                <NewsReviewCard card={card} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
};
