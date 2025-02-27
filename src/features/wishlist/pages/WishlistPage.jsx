import { Box, Container, Typography, Grid } from '@mui/material';
import useAccommodationStore from '../../../store/accommodationStore';
import CampCard from '../../home/components/campcard/CampCard';

const WishlistPage = () => {
  const { wishlist } = useAccommodationStore();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Wishlist ({wishlist.length})
      </Typography>

      {wishlist.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Your wishlist is empty
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <CampCard {...item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WishlistPage;
