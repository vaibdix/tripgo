import { Box, Typography, Container } from '@mui/material';
import tripgoLogo from '../../../assets/images/footerlogo.png';

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#1E1E1E',
        color: 'white',
        pt: 16,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          {/* Left Section */}
          <Box>
            <Box sx={{ mb: 3 }}>
              <img src={tripgoLogo} alt="TripGo" style={{ height: '40px' }} />
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 4,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Company
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  >
                    Home
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  >
                    About Us
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  >
                    Tours
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  >
                    Careers
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Contact
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">+91 987654321</Typography>
                  <Typography variant="body2">Info@tripgo.com</Typography>
                  <Typography variant="body2">support@tripgo.com</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <img
              src={tripgoLogo}
              alt="TripGo Large"
              style={{
                height: 'auto',
                maxWidth: '100%',
                paddingTop: '10em',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
