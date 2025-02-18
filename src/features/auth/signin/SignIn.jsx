import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import hike from '../../../assets/images/hike.jpg';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: '#111',
        color: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px',
          pointerEvents: 'none',
          mask: 'radial-gradient(circle at 50% 30%, black, transparent 70%)',
          WebkitMask: 'radial-gradient(circle at 50% 30%, black, transparent 70%)',
        },
      }}
    >
      {/* Left Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 500 }}>
              Welcome back
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              Welcome back! Please enter your details.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                },
                '& .MuiInputLabel-root': { color: 'grey.500' },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                },
                '& .MuiInputLabel-root': { color: 'grey.500' },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    sx={{ color: 'grey.500', '&.Mui-checked': { color: 'primary.main' } }}
                  />
                }
                label="Remember for 30 days"
                sx={{ color: 'grey.500' }}
              />
              <Link to="/forgot-password" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'grey.500' }}>
                  Forgot password
                </Typography>
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                bgcolor: '#7C3AED',
                '&:hover': { bgcolor: '#6D28D9' },
                textTransform: 'none',
                borderRadius: 1,
              }}
            >
              Sign in
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{
                py: 1.5,
                color: 'white',
                borderColor: 'rgba(255,255,255,0.2)',
                '&:hover': { borderColor: 'rgba(255,255,255,0.3)' },
                textTransform: 'none',
                borderRadius: 1,
              }}
            >
              Sign in with Google
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', color: 'grey.500' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={hike}
          alt="Hiking"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Container>
  );
};

export default SignIn;
