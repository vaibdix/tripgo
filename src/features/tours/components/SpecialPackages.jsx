import { Box, Typography, Grid, Paper } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const SpecialPackages = ({ packages }) => {
  // Calculate grid columns based on number of packages
  const getGridColumns = (count) => {
    if (count === 1) return 12;
    if (count === 2) return 6;
    return 4; // for 3 or more items
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Special Packages
      </Typography>
      <Grid container spacing={2}>
        {packages.map((pkg, index) => (
          <Grid item xs={12} sm={getGridColumns(packages.length)} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 1,
                height: '100%',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            >
              <Typography variant="subtitle1">{pkg.name}</Typography>
              <Typography variant="p">₹{pkg.price}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SpecialPackages;
