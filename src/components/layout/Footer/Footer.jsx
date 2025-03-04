import tripgoLogo from '../../../assets/images/footerlogo.png';
import asterisk from '../../../assets/svg/astersik.svg';
import { keyframes } from '@emotion/react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  // Define animations
  const stringAnimation = keyframes`
    from { height: 150px }
    to { height: 220px }
  `;

  const yoyoAnimation = keyframes`
    from { transform: rotate(-0deg); top: 0 }
    to { transform: rotate(-360deg); top: 120px }
  `;

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
              {/* Company section */}
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

              {/* Contact section */}
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

            {/* Yo-yo animation with O
            <Box
              sx={{
                position: 'relative',
                width: '70px',
                height: '70px',
                margin: '30px auto 200px',
                color: '#fff',
              }}
            >
              <Box
                component="span"
                className="string"
                sx={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  top: '-20px',
                  left: '28px',
                  border: '2px solid #ffffff',
                  color: '#ffffff',
                  background: '#ffffff',
                  zIndex: 1, // Lower z-index so it appears behind the O
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: '10px',
                    right: '4px',
                    bottom: '-50px',
                    left: '4px',
                    background: '#ffffff',
                    width: '2px',
                    zIndex: 1, // Lower z-index so it appears behind the O
                    animation: `${stringAnimation} 2s infinite alternate`,
                  },
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  fontWeight: 'bold',
                  fontSize: '70px', // Reduced from 70px
                  lineHeight: 1,
                  zIndex: 2,
                  animation: `${yoyoAnimation} 2s infinite alternate`,
                  backgroundColor: '#1E1E1E', // Same as background to hide string
                  borderRadius: '50%', // Make it round to match the O shape
                  width: '60px', // Set explicit width
                  height: '60px', // Set explicit height
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                O
                <img
                  src={asterisk}
                  alt=""
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                    height: '70%',
                  }}
                />
              </Typography>
            </Box> */}
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="h1" sx={{ mt: 30, position: 'relative' }}>
              TRIPG
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '70px',
                  height: '70px',
                  color: '#fff',
                }}
              >
                <Box
                  component="span"
                  className="string"
                  sx={{
                    position: 'absolute',
                    marginTop: '-150px',
                    width: '10px',
                    height: '10px',
                    left: '28px',
                    border: '2px solid #ffffff',
                    color: '#ffffff',
                    background: '#ffffff',
                    borderRadius: '50%',
                    zIndex: 1,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      top: '10px',
                      left: '3px',
                      width: '2px',
                      background: '#ffffff',
                      zIndex: 1,
                      animation: `${stringAnimation} 2s infinite alternate`,
                      transformOrigin: 'top',
                    },
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    fontWeight: 'bold',
                    fontSize: '60px',
                    lineHeight: 1,
                    zIndex: 2,
                    animation: `${yoyoAnimation} 2s infinite alternate`,
                    backgroundColor: '#1E1E1E',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '0px',
                  }}
                >
                  O
                  <img
                    src={asterisk}
                    alt=""
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '70%',
                      height: '70%',
                    }}
                  />
                </Typography>
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
