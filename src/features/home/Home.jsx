import CampLocation from './components/camplocation/CampLocation';
import Hero from './components/hero/Hero';
import NewDestinations from './components/newdestinations/NewDestinations';
import Newsletter from './components/newsletter/Newsletter';
import NordicSection from './components/nordicsection/NordicSection';
import { Box, Container } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Hero />
      <Container maxWidth="xl" sx={{ my: 8, px: { xs: 2, md: 3 } }} />
      <CampLocation />
      <NordicSection />
      <NewDestinations />
      <Newsletter />
    </Box>
  );
};

export default Home;
