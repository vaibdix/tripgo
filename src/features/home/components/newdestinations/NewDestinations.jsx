import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import CampCard from '../campcard/CampCard';

const destinations = [
  {
    location: 'Borivali',
    name: 'Whispering Woods Tents',
    price: 7383,
    originalPrice: 8932,
    rating: 4.5,
    temperature: '28°C',
  },
  {
    location: 'Australia',
    name: 'Jervis Bay Holiday Park',
    price: 7383,
    originalPrice: 8932,
    rating: 4.5,
    temperature: '28°C',
  },
  {
    location: 'Australia',
    name: 'Huskisson Beach B&B',
    price: 7383,
    originalPrice: 8932,
    rating: 4.5,
    temperature: '28°C',
  },
  {
    location: 'India',
    name: 'Ladakh',
    price: 7383,
    originalPrice: 8932,
    rating: 4.5,
    temperature: '28°C',
  },
  {
    location: 'Borivali',
    name: 'Camp Adventure Rishikesh',
    price: 7383,
    originalPrice: 8932,
    rating: 4.5,
    temperature: '28°C',
  },
  {
    location: 'Borivali',
    name: "Coorg Planter's Camp",
    price: 7383,
    originalPrice: 8932,
    rating: 4.5,
    temperature: '28°C',
  },
  {
    location: 'Borivali',
    name: 'Seagot, Wayanad',
    price: 7383,
    originalPrice: 8932,
    rating: 4.5,
    temperature: '28°C',
  },
  {
    location: 'Borivali',
    name: 'Mirvana, Jodhpur',
    price: 7383,
    originalPrice: 8932,
    rating: 4.5,
    temperature: '28°C',
  },
];

const NewDestinations = () => {
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
            background: `
      linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))
    `,
            height: '2px',
            width: '24%',
          }}
        />
      </Typography>
      <Grid container spacing={3}>
        {destinations.map((destination, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CampCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewDestinations;
