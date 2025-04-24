import andaman from '../../../../assets/images/andaman.png';
import canada from '../../../../assets/images/canada.png';
import ecoast from '../../../../assets/images/ecoast.png';
import konkan from '../../../../assets/images/konkan.png';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Campaddress() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/collection');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, overflow: 'hidden' }}>
      <Typography
        variant="h6"
        sx={{
          mb: 4,
          fontSize: '1.7rem',
          pl: 1,
        }}
      >
        Discover the Touch of Nature
        <Box
          sx={{
            background: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))`,
            height: '2px',
            width: '30%',
          }}
        />
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 3,
          mt: 4,
        }}
      >
        {/* Pune Card */}
        <Box
          onClick={handleCardClick}
          sx={{
            position: 'relative',
            height: 400,
            borderRadius: 4,
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          <Box
            component="img"
            src={konkan}
            alt="Pune"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 25,
              px: 2,
              py: 0.5,
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Pune
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            height: 400,
            borderRadius: 4,
            overflow: 'hidden',
            cursor: 'pointer',
            marginTop: { xs: 0, md: '40px' },
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          <Box
            onClick={handleCardClick}
            component="img"
            src={ecoast}
            alt="Nagpur"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 25,
              px: 2,
              py: 0.5,
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Nagpur
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            height: 400,
            borderRadius: 4,
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          <Box
            onClick={handleCardClick}
            component="img"
            src={canada}
            alt="Nashik"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 25,
              px: 2,
              py: 0.5,
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Nashik
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            height: 400,
            borderRadius: 4,
            overflow: 'hidden',
            cursor: 'pointer',
            marginTop: { xs: 0, md: '40px' },
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          <Box
            onClick={handleCardClick}
            component="img"
            src={andaman}
            alt="kolhapur"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 25,
              px: 2,
              py: 0.5,
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              kolhapur
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Campaddress;
