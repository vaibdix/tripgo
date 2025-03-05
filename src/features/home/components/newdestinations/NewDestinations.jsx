import { useNavigate } from 'react-router-dom';
import useAccommodationStore from '../../../../store/accommodationStore';
import CampCard from '../campcard/CampCard';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react';

const NewDestinations = () => {
  const { fetchAccommodations } = useAccommodationStore();
  const [randomDestinations, setRandomDestinations] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchRandomDestinations = async () => {
      try {
        const response = await fetchAccommodations('tents');
        const allAccommodations = response || [];
        const shuffled = [...allAccommodations].sort(() => 0.5 - Math.random());
        const destinationsWithType = shuffled.slice(0, 8).map((item) => ({
          ...item,
          type: 'tents',
        }));
        setRandomDestinations(destinationsWithType);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setRandomDestinations([]);
      }
    };

    fetchRandomDestinations();
  }, []);

  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 4,
          fontSize: '1.7rem',
          pl: 1,
        }}
      >
        New Destinations
        <Box
          sx={{
            background: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))`,
            height: '2px',
            width: '24%',
          }}
        />
      </Typography>
      <Grid container spacing={3}>
        {randomDestinations.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CampCard
              id={item.id}
              type={item.type} // Add the type prop
              campName={item.campName}
              location={item.address.tal}
              price={item.prices.afterDiscount}
              actualPrice={item.prices.actual}
              rating={item.ratings.location}
              images={item.about.images}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Button sx={{ textDecoration: 'underline', textUnderlineOffset: '4px' }} onClick={() => navigate('/tours')}>
          View More
        </Button>
      </Box>
    </Container>
  );
};

export default NewDestinations;
