import React from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Divider,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Add, Remove, ArrowBack, ArrowForward } from '@mui/icons-material';
import useAccommodationStore from '../../store/accommodationStore';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal } = useAccommodationStore();
  const [total, setTotal] = React.useState(getCartTotal());
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Update total whenever cart changes
  React.useEffect(() => {
    setTotal(getCartTotal());
  }, [cart, getCartTotal]);

  // Empty cart state
  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            gap: 3,
            py: 8,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 400, letterSpacing: 0.5 }}>
            Your cart is empty
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', maxWidth: 400, mb: 2 }}
          >
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            disableElevation
            sx={{
              bgcolor: '#111',
              '&:hover': { bgcolor: '#000' },
              textTransform: 'none',
              px: 4,
              py: 1.5,
              borderRadius: 0,
              fontWeight: 400,
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h3"
          sx={{
            mb: { xs: 5, md: 6 },
            fontWeight: 400,
            textAlign: 'center',
            letterSpacing: 0.5,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          Shopping Cart
        </Typography>

        <Grid container spacing={4}>
          {/* Cart Items Section */}
          <Grid item xs={12} md={8}>
            {/* Cart header */}
            <Box
              sx={{
                display: { xs: 'none', md: 'grid' },
                gridTemplateColumns: '5fr 2fr 2fr',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                pb: 1.5,
                mb: 3,
              }}
            >
              <Typography sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.875rem' }}>
                PRODUCT
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  textAlign: 'center',
                }}
              >
                QUANTITY
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  textAlign: 'right',
                }}
              >
                TOTAL
              </Typography>
            </Box>

            {/* Cart items */}
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '5fr 2fr 2fr' },
                  alignItems: 'center',
                  py: 3,
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  '&:last-child': {
                    borderBottom: 'none',
                    mb: 2,
                  },
                }}
              >
                {/* Product */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: { xs: 3, md: 0 },
                  }}
                >
                  {/* Image */}
                  <Box
                    component="img"
                    src={item.about.images[0]}
                    alt={item.campName}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      mr: 3,
                      flexShrink: 0,
                      borderRadius: 3,
                    }}
                  />

                  {/* Product info */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: -3,
                        fontWeight: 400,
                        mb: 1,
                        fontSize: '1.125rem',
                      }}
                    >
                      {item.campName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}
                    >
                      {item.type}{' '}
                      <Box component="span" sx={{ mx: 1, fontSize: '0.5rem' }}>
                        •
                      </Box>{' '}
                      {item.suitableFor}
                    </Typography>

                    {/* Mobile only price */}
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1.5,
                        fontWeight: 400,
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      ₹{item.prices.afterDiscount}
                    </Typography>
                  </Box>
                </Box>

                {/* Quantity */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'flex-start', md: 'center' },
                    mb: { xs: 3, md: 0 },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',

                      width: '120px',
                      height: '42px',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        item.quantity > 1 && updateCartItemQuantity(item.id, item.quantity - 1)
                      }
                      sx={{
                        border: '1px solid rgb(211, 211, 211)',
                        borderRadius: 20,
                        width: '40px',
                        height: '40px',
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>

                    <TextField
                      value={item.quantity}
                      inputProps={{
                        sx: {
                          padding: 0,
                          textAlign: 'center',
                          width: '40px',
                          '-moz-appearance': 'textfield',
                          '&::-webkit-outer-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                          },
                          '&::-webkit-inner-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                          },
                        },
                      }}
                      variant="standard"
                      type="number"
                      onChange={(e) => {
                        const val = parseInt(e.target.value || '1');
                        if (val >= 1) updateCartItemQuantity(item.id, val);
                      }}
                      sx={{
                        '& .MuiInput-underline:before': { borderBottom: 'none' },
                        '& .MuiInput-underline:after': { borderBottom: 'none' },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                          borderBottom: 'none',
                        },
                      }}
                    />

                    <IconButton
                      size="small"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      sx={{
                        border: '1px solid rgb(211, 211, 211)',
                        borderRadius: 20,
                        width: '40px',
                        height: '40px',
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                {/* Total + Remove */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      textAlign: { xs: 'left', md: 'right' },
                      flexGrow: 1,
                    }}
                  >
                    ₹{item.prices.afterDiscount * item.quantity}
                  </Typography>
                </Box>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  sx={{
                    mt: -4,
                    ml: -13
                  }}
                >
                  Remove
                </Button>
              </Box>
            ))}

            {/* Continue Shopping Button */}
            <Button
              startIcon={<ArrowBack />}
              variant="text"
              onClick={() => navigate('/')}
              sx={{
                color: '#000',
                textTransform: 'none',
                padding: 0,
                fontWeight: 400,
                fontSize: '0.875rem',
                mt: 3,
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Continue shopping
            </Button>
          </Grid>

          {/* Order Summary Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ pl: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 500,
                  textAlign: 'center',
                  letterSpacing: 0.5,
                }}
              >
                ORDER SUMMARY
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ color: 'text.primary', fontSize: '0.95rem' }}>
                    Subtotal
                  </Typography>
                  <Typography sx={{ fontWeight: 400, fontSize: '0.95rem' }}>
                    ₹{total}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ color: 'text.primary', fontSize: '0.95rem' }}>
                    Shipping
                  </Typography>
                  <Typography sx={{ fontWeight: 400, fontSize: '0.95rem' }}>Free</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 4,
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  ₹{total}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                onClick={() => navigate('/checkout')}
                disableElevation
                sx={{
                  bgcolor: '#111',
                  '&:hover': { bgcolor: '#000' },
                  textTransform: 'none',
                  py: 1.8,
                  borderRadius: 25,
                  fontSize: '0.9rem',
                  fontWeight: 400,
                }}
              >
                Proceed to Checkout
              </Button>

              
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Cart;
