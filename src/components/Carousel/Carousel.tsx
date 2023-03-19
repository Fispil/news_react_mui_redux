import { Paper, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

interface CarouselItemProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface CustomCarouselProps {
  items: CarouselItemProps[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ items }) => {
  return (
    <Carousel sx={{ height: '600px', marginBottom: '40px' }}>
      {items.map((item) => (
        <Paper
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'grey.800',
            height: '600px',
            color: '#FFA07A',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${item.imageUrl})`
          }}
        >
          <Typography variant="h5">{item.title}</Typography>
          <Typography variant="body1">{item.description}</Typography>
        </Paper>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
