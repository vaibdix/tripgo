import React from 'react';
import { Box, Typography, Button, Drawer, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ open, onClose, product }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {product && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <img
                src={product.about.images[0]}
                alt={product.campName}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
              <Box>
                <Typography variant="subtitle1">{product.campName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.type} • {product.suitableFor}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  ₹{product.prices.afterDiscount}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            navigate('/cart');
            onClose();
          }}
          sx={{
            bgcolor: '#111',
            '&:hover': { bgcolor: '#000' },
            textTransform: 'none',
            py: 1.5,
            borderRadius: 0,
          }}
        >
          View Cart
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;
