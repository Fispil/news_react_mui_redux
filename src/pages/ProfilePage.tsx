import { Box, Avatar, Typography, Container, Grid } from '@mui/material';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export const ProfilePage: React.FC = () => {
  const name = '';
  const avatarUrl = '';

  return (
    <>
      <Header />
      <Container sx={{ minHeight: 'calc(100vh - 135px - 64px)' }}>
        <Grid container spacing={3} sx={{ marginTop: '64px' }}>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar
                sx={{ width: 100, height: 100, marginBottom: '16px', alignSelf: 'flex-start' }}
                alt={name}
                src={avatarUrl}
              />
              <Typography variant="h4" sx={{ marginBottom: '8px' }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, quisquam!
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, ipsum.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="body2" sx={{ backgroundColor: '#f5f5f5' }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde facere sequi tempora,
              repellat quas iste molestiae eius voluptatum eos officiis voluptatem nam maiores rem
              earum doloremque cum ratione incidunt corrupti sed ad, illo excepturi porro sunt
              cupiditate. Illo iure eligendi pariatur nostrum quas debitis voluptatum harum nesciunt
              officiis quod sed officia perferendis deleniti, non facere beatae vitae nemo
              accusantium alias quisquam inventore? Optio nobis, voluptates maxime autem sunt animi
              placeat quos omnis reiciendis eaque dolorem illo doloribus assumenda ipsam obcaecati
              ut eligendi! In porro ducimus amet. Alias fugiat incidunt sint doloribus reprehenderit
              placeat officia quo debitis sequi rerum, sunt optio!
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
