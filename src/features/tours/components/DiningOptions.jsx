import { Box, Typography, Grid, Paper } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const DiningOptions = ({ foodDining }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 500,
          borderBottom: '1px solid #e0e0e0',
          pb: 2
        }}
      >
        Dining Options
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: '#8B9D77',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <RestaurantIcon sx={{ color: 'white', fontSize: '2rem' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Meals Offered
                </Typography>
                <Typography variant="body1">
                  {foodDining?.[0]?.mealsOffered?.join(', ') || 'Yes'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: '#8B9D77',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <RestaurantIcon sx={{ color: 'white', fontSize: '2rem' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Veg / Non-veg
                </Typography>
                <Typography variant="body1">
                  {foodDining?.[0]?.veg || foodDining?.[0]?.['non-veg'] ? 'Yes' : 'No'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: '#8B9D77',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <RestaurantIcon sx={{ color: 'white', fontSize: '2rem' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Outside Food Allowed
                </Typography>
                <Typography variant="body1">
                  {foodDining?.[0]?.isOutsideFoodAllowed ? 'Yes' : 'No'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DiningOptions;