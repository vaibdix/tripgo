import { Box, Typography } from '@mui/material';
import konkan from '../../../../assets/images/konkan.png';
import ecoast from '../../../../assets/images/ecoast.png';
import canada from '../../../../assets/images/canada.png';
import andaman from '../../../../assets/images/andaman.png';

function CampLocation() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        overflow: 'hidden',
      }}
    >
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
            background: `
      linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))
    `,
            height: '2px',
            width: '30%',
          }}
        />
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
          mt: 4,
        }}
      >
        {[
          { location: 'Konkan', img: konkan },
          { location: 'E. Coast', img: ecoast },
          { location: 'Canada', img: canada },
          { location: 'Andaman', img: andaman },
        ].map((destination, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              height: 400,
              borderRadius: 4,
              overflow: 'hidden',
              cursor: 'pointer',
              marginTop: index % 2 !== 0 ? { xs: 0, md: '40px' } : 0,
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease-in-out',
              },
            }}
          >
            <Box
              component="img"
              src={destination.img}
              alt={destination.location}
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
                {destination.location}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CampLocation;
