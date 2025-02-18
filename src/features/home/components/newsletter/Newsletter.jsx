// import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { Box, Typography, IconButton, TextField, InputAdornment, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Footer() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #f8f8f8, #8E8E8E)',
        p: 4,
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(4, 1fr)',
        },
        gap: { xs: 3, md: 0 },
        alignItems: 'center',
      }}
    >
      {/* Leading the way section */}
      <Box
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          pt: { xs: 0, md: 5 },
          pb: { xs: 0, md: 5 },
          pl: { xs: 0, md: 3 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'medium',
            fontSize: '1.4rem',
          }}
        >
          Leading the way
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'medium',
            fontSize: '1.4rem',
          }}
        >
          in adventure
        </Typography>
      </Box>

      {/* Social Icons section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'center' },
          gap: 2,
          borderRight: { xs: 'none', md: '1px solid' },
          borderImage: {
            xs: 'none',
            md: 'linear-gradient(to bottom, #f8f8f8, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) 1',
          },
          py: { xs: 2, md: 5 },
          pr: { md: 4 },
        }}
      >
        {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
          <IconButton
            key={index}
            sx={{
              bgcolor: '#D9D9D9',
              width: 50,
              height: 50,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            <Icon />
          </IconButton>
        ))}
      </Box>

      {/* Join our Newsletter text */}
      <Box
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          pl: { xs: 0, md: 5 },

          py: { xs: 2, md: 5 },
          pr: { md: 4 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'medium',
            fontSize: '1.4rem',
          }}
        >
          Join our
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'medium',
            fontSize: '1.4rem',
          }}
        >
          Newsletter
        </Typography>
      </Box>

      {/* Input field section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'center' },
          pl: { md: 4 },
          py: { xs: 2, md: 5 },
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Email@mail.com"
          sx={{
            bgcolor: '#D9D9D9',
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            },
            width: '100%',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    bgcolor: 'black',
                    color: 'white',
                    borderRadius: '50%',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.8)',
                    },
                  }}
                >
                  <ArrowRight size={24} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
