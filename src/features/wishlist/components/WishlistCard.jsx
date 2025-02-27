import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Heart, Star } from 'lucide-react';
import useAccommodationStore from '../../../store/accommodationStore';

const WishlistCard = ({ id, type, campName, location, price, actualPrice, rating, images }) => {
  const { toggleWishlist } = useAccommodationStore();

  const handleRemove = (e) => {
    e.stopPropagation();
    toggleWishlist({ id, type, campName, location, price, actualPrice, rating, images });
  };

  return (
    <Card
      sx={{
        display: 'flex',
        borderRadius: '10px',
        overflow: 'hidden',
        mb: 2,
        border: '1px solid hsl(35, 90.50%, 95.90%)',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ width: 200, height: 150 }}>
        <img
          src={images[0]}
          alt={campName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">{campName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Star size={16} color="gold" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {rating}
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" component="span">
              ₹{price}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              sx={{ ml: 1, textDecoration: 'line-through', color: 'text.secondary' }}
            >
              ₹{actualPrice}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={handleRemove}
          sx={{
            alignSelf: 'flex-start',
            backgroundColor: '#F0EDE9',
            width: 28,
            height: 28,
            '&:hover': { backgroundColor: '#E5E2DE' },
          }}
        >
          <Heart size={16} fill="#101F37" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default WishlistCard;
