import { Box, Container, Typography, Grid } from '@mui/material';
import aimg from '../../assets/images/aboutimage.jpg';
import team from '../../assets/images/team.jpg.webp';
import quality from '../../assets/images/quality.png';
import travelStory from '../../assets/images/travelstory.jpg';
import hike from '../../assets/images/hike.jpg';
import campfire from '../../assets/images/campfire.jpg';
import { grey } from '@mui/material/colors';

const About = () => {
  const journalImages = [travelStory, hike, campfire];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '70vh',
          width: '100%',
          position: 'relative',
          backgroundImage: `url(${aimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          mb: 8,
        }}
      >
        {/* <Container>
          <Typography
            variant="h1"
            sx={{ color: 'black', fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 'bold' }}
          >
            EXPLORE
            <br />
            YOUR WAY
          </Typography>
        </Container> */}
      </Box>

      {/* Manifesto Section */}
      <Container sx={{ mb: 8 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, color: '#666' }}>
          Embracing Adventure, Embracing You
        </Typography>

        <Typography variant="h4" sx={{ mb: 4, maxWidth: '800px' }}>
          Unbounded: The Travelers' Manifesto
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px' }}>
          Since 2020, TripGo has been dedicated to providing memorable and sustainable travel
          experiences. With years of expertise, we've grown to become your trusted partner in
          creating unforgettable journeys that respect both our travelers and our destinations.
        </Typography>
      </Container>

      {/* Features Grid */}
      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <img src={team} alt="Team" />
              <Box>
                <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
                  The Message
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, mt: 2 }}>
                  We believe everyone deserves authentic experiences. Whether exploring ancient
                  ruins or tasting local cuisine, we're committed to making travel accessible while
                  preserving the world's natural and cultural heritage.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Quality and Affordability
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Our commitment to quality and affordability is reflected in everything we do. We
                carefully curate each experience to ensure the perfect balance of adventure,
                comfort, and value, making extraordinary travel accessible to everyone.
              </Typography>
              <img src={quality} alt="Quality and Affordability" />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Journal Preview Section */}
      <Container sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          OUR JOURNAL
        </Typography>
        <Grid container spacing={4}>
          {journalImages.map((image, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box>
                <Box
                  sx={{
                    height: 340,
                    mb: 2,
                    backgroundColor: '#f5f5f5',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Hiking Natures Canopy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover amazing destinations and experiences through our travelers' stories.
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
