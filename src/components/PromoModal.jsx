import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useState } from 'react';
import tent from '../assets/images/hike.jpg';

const PromoModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: 0,
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ display: 'flex', maxWidth: 800 }}>
        {/* Left side - Image */}
        <Box
          sx={{
            width: '50%',
            position: 'relative',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            },
          }}
        >
          <img src={tent} alt="Camping by the lake" />
        </Box>

        {/* Right side - Content */}
        <Box sx={{ width: '50%', p: 4 }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              15% Off your First Order
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Get news on our latest arrivals, exclusive offers, surprise sales and more!
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                bgcolor: 'black',
                '&:hover': { bgcolor: 'black' },
                borderRadius: 50,
              }}
            >
              Subscribe
            </Button>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 2 }}
          >
            By completing this form you are signing up to receive our emails
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PromoModal;
