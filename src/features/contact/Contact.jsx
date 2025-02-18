import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    agreeToPrivacy: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'agreeToPrivacy' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        disableGutters // Add this prop
        sx={{
          display: 'flex',
          minHeight: '90vh',
          bgcolor: '#111',
          color: 'white',
          p: 0,
        }}
      >
        {/* Left Side - Form */}
        <Box sx={{ flex: 1, p: 6 }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
            Contact us
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, color: 'grey.500' }}>
            Our friendly team would love to hear from you.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
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
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                  },
                  '& .MuiInputLabel-root': { color: 'grey.500' },
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              label="Phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
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
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                },
                '& .MuiInputLabel-root': { color: 'grey.500' },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleChange}
                  sx={{ color: 'grey.500' }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: 'grey.500' }}>
                  You agree to our friendly{' '}
                  <Button
                    variant="text"
                    sx={{ p: 0, minWidth: 'auto', color: 'white', textTransform: 'none' }}
                  >
                    privacy policy
                  </Button>
                  .
                </Typography>
              }
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                py: 1.5,
                bgcolor: '#7C3AED',
                '&:hover': { bgcolor: '#6D28D9' },
                borderRadius: 1,
              }}
            >
              Send message
            </Button>
          </Box>
        </Box>

        {/* Right Side - Map */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1644262070010!5m2!1sen!2s&map_id=8f348ca914ad6e77"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)',
            }}
            allowFullScreen=""
            loading="lazy"
          />
        </Box>
      </Container>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          bgcolor: '#111',
          p: 0,
        }}
      >
        {/* Contact Info Cards */}
        <Box
          sx={{
            width: '100%',
            bgcolor: '#111',
            py: 8,
            px: { xs: 4, md: 8 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {/* Chat Card */}
          <Box
            sx={{
              bgcolor: '#1A1A1A',
              p: 4,
              borderRadius: 2,
              flex: 1,
              maxWidth: 350,
            }}
          >
            <Box
              sx={{
                bgcolor: '#7C3AED',
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <MessageCircle size={24} color="white" />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              Chat to sales
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500', mb: 2 }}>
              Speak to our friendly team.
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              sales@tripgo.com
            </Typography>
          </Box>

          {/* Visit Card */}
          <Box
            sx={{
              bgcolor: '#1A1A1A',
              p: 4,
              borderRadius: 2,
              flex: 1,
              maxWidth: 350,
            }}
          >
            <Box
              sx={{
                bgcolor: '#7C3AED',
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <MapPin size={24} color="white" />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              Visit us
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500', mb: 2 }}>
              Visit our office HQ.
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              100 Smith Street
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              Collingwood VIC 3066 AU
            </Typography>
          </Box>

          {/* Call Card */}
          <Box
            sx={{
              bgcolor: '#1A1A1A',
              p: 4,
              borderRadius: 2,
              flex: 1,
              maxWidth: 350,
            }}
          >
            <Box
              sx={{
                bgcolor: '#7C3AED',
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Phone size={24} color="white" />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              Call us
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500', mb: 2 }}>
              Mon-Fri from 8am to 5pm.
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              +1 (555) 000-0000
            </Typography>
          </Box>
        </Box>

        {/* Free Trial Section */}
        <Box
          sx={{
            width: '100%',
            bgcolor: '#1A1A1A',
            py: 8,
            px: { xs: 4, md: 8 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
              Start your 30-day free trial
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.500' }}>
              Join over 4,000+ startups already growing with TripGo.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.2)',
                '&:hover': { borderColor: 'rgba(255,255,255,0.3)' },
                px: 4,
              }}
            >
              Learn more
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#7C3AED',
                '&:hover': { bgcolor: '#6D28D9' },
                px: 4,
              }}
            >
              Get started
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Contact;
