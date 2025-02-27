import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAccommodationStore from '../../store/accommodationStore';
import { motion } from 'framer-motion';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useAccommodationStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const generatedOrderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderId(generatedOrderId);
      setOrderPlaced(true);
      clearCart();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  if (orderPlaced) {
    return (
      <Container
        maxWidth="sm"
        sx={{ py: 6, minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%' }}
        >
          <Box
            sx={{
              py: 8,
              px: 4,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: 2,
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 300,
                letterSpacing: '0.1em',
                mb: 2,
              }}
            >
              Thank You
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
              Your order has been placed successfully. Your order ID is:
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                letterSpacing: '0.2em',
                fontFamily: 'monospace',
                background: '#fff',
                py: 2,
                px: 4,
                borderRadius: 1,
                mb: 4,
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              }}
            >
              {orderId}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                bgcolor: '#111',
                '&:hover': { bgcolor: '#000', transform: 'scale(1.02)' },
                transition: 'all 0.3s ease',
                textTransform: 'none',
                px: 6,
                py: 2,
                borderRadius: 0,
                letterSpacing: '0.1em',
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h3"
            sx={{
              mb: { xs: 4, md: 6 },
              textAlign: 'center',
              fontWeight: 300,
              letterSpacing: '0.1em',
            }}
          >
            Checkout
          </Typography>

          <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: { xs: 3, md: 5 },
                  background: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    color: 'text.secondary',
                  }}
                >
                  Personal Information
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      variant="standard"
                      InputProps={{
                        disableUnderline: false,
                      }}
                      sx={{
                        '& .MuiInput-underline:before': { borderBottomWidth: '2px' },
                        '& .MuiInput-underline:after': { borderBottomWidth: '2px' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      multiline
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      error={!!errors.address}
                      helperText={errors.address}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={!!errors.city}
                      helperText={errors.city}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      error={!!errors.state}
                      helperText={errors.state}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      error={!!errors.pincode}
                      helperText={errors.pincode}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  p: { xs: 3, md: 5 },
                  background: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                  }}
                >
                  Order Summary
                </Typography>

                <Box sx={{ mb: 4 }}>
                  {cart.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                        pb: 2,
                        borderBottom: '1px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      <Box>
                        <Typography variant="body1" sx={{ mb: 0.5 }}>
                          {item.campName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 500 }}>
                        ₹{item.prices.afterDiscount * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography color="text.secondary">Subtotal</Typography>
                    <Typography>₹{getCartTotal()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography color="text.secondary">Shipping</Typography>
                    <Typography>Free</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">₹{getCartTotal()}</Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: '#111',
                    '&:hover': { bgcolor: '#000', transform: 'scale(1.02)' },
                    transition: 'all 0.3s ease',
                    textTransform: 'none',
                    py: 2,
                    borderRadius: 0,
                    letterSpacing: '0.1em',
                    fontSize: '1rem',
                  }}
                >
                  Place Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Checkout;
