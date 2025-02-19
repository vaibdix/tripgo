import React, { useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import CampCard from '../campcard/CampCard';
import useAccommodationStore from '../../../../store/accommodationStore';

const NewDestinations = () => {
  const { accommodations, fetchAccommodations, cachedData } = useAccommodationStore();

  useEffect(() => {
    fetchAccommodations('tents');
  }, []);

  // Get 8 random items from all cached accommodations
  const getRandomDestinations = () => {
    const allAccommodations = Object.values(cachedData).flat();
    const shuffled = [...allAccommodations].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  };

  const randomDestinations = getRandomDestinations();

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
    </Container>
  );
};

export default NewDestinations;
