import { Box, Typography, IconButton, Modal, Button } from '@mui/material';
import { X } from 'lucide-react';
import { useState } from 'react';

const CampModal = ({ open, handleClose, campData }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Modal
      open={open}
      onClose={(e) => {
        e.stopPropagation();
        handleClose();
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
      aria-labelledby="camp-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 0,
          width: '90%',
          maxWidth: 1000,
          maxHeight: '90vh',
          overflow: 'auto',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            bgcolor: 'white',
            '&:hover': { bgcolor: '#f5f5f5' },
          }}
        >
          <X size={20} />
        </IconButton>

        {/* Left Side - Image Gallery */}
        <Box sx={{ width: '50%', p: 3 }}>
          <Box sx={{ height: 400, width: '100%', overflow: 'hidden' }}>
            <img
              src={campData?.images?.[selectedImage]}
              alt={campData?.campName}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 8,
                objectFit: 'cover',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 2, height: 80 }}>
            {campData?.images?.slice(0, 4).map((img, index) => (
              <Box
                key={index}
                onClick={() => setSelectedImage(index)}
                onMouseEnter={() => setSelectedImage(index)}
                sx={{
                  width: 80,
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: 4,
                  cursor: 'pointer',
                  border: selectedImage === index ? '2px solid #000' : 'none',
                  opacity: selectedImage === index ? 1 : 0.7,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <img
                  src={img}
                  alt={`${campData?.campName} ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Side - Content */}
        <Box sx={{ width: '50%', p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {campData?.campName}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              ₹{campData?.price}
            </Typography>
            <Typography
              variant="body1"
              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
            >
              ₹{campData?.actualPrice}
            </Typography>
            <Box
              sx={{
                bgcolor: '#f0f0f0',
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              <Typography variant="caption">SALE</Typography>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            {campData?.location}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Quantity
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button variant="outlined" sx={{ minWidth: 120 }}>
                Add to cart
              </Button>
              <Button
                variant="contained"
                sx={{
                  minWidth: 120,
                  bgcolor: 'black',
                  '&:hover': { bgcolor: '#333' },
                }}
              >
                Buy it now
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Pickup available at {campData?.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Usually ready in 24 hours
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CampModal;
