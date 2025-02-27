import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../store/Api';
import hike from '../../../assets/images/hike.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.register(formData);

      if (response.data) {
        // Store the token if provided
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // Redirect to login page after successful registration
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      {/* Left Side - Testimonial */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          p: 8,
          position: 'relative',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 0.5, mb: 4 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Box key={star} component="span" sx={{ color: '#FFD700', fontSize: '24px' }}>
                ★
              </Box>
            ))}
          </Box>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 500 }}>
            Untitled has saved us thousands of hours of work. We're able to spin up projects and
            features much faster.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 4 }}>
            <Box
              component="img"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
              }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Lori Bryson
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.500' }}>
                Product Designer, Sisyphus
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Form */}
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
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 500 }}>
            Sign up
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: 'grey.500' }}>
            Start your 30-day free trial.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, bgcolor: 'transparent', color: '#ff4444' }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
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
              helperText="Must be at least 8 characters."
              FormHelperTextProps={{ sx: { color: 'grey.500' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                },
                '& .MuiInputLabel-root': { color: 'grey.500' },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                py: 1.5,
                bgcolor: '#7C3AED',
                '&:hover': { bgcolor: '#6D28D9' },
                textTransform: 'none',
                borderRadius: 1,
              }}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Get started'}
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
              Sign up with Google
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', color: 'grey.500' }}>
              Already have an account?{' '}
              <Link to="/signin" style={{ color: 'white', textDecoration: 'none' }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
