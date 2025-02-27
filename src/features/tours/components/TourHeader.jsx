import { Box, Typography } from '@mui/material';
import catebg from '../../../assets/images/catebg.png';

const TourHeader = () => (
  <Box
    sx={{
      backgroundImage: `url(${catebg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '250px',
      marginBottom: '2rem',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#fff' }}>
      SHOP COLLECTION
    </Typography>
  </Box>
);

export default TourHeader;
