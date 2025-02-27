import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { SelfImprovement, LocalFireDepartment } from '@mui/icons-material';
import { BedOutlined, StarBorder, CloudOutlined, Cloud } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './CampCard.css';
import { useNavigate } from 'react-router-dom';
import heart from '../../../../assets/svg/heart.svg';
import heartfilled from '../../../../assets/svg/heartfilled.svg';
import { Plus } from 'lucide-react';
import CampModal from '../campmodal/CampModal';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Heart } from 'lucide-react';
import useAccommodationStore from '../../../../store/accommodationStore';

// Add type to the props
const CampCard = ({ id, type, campName, location, price, actualPrice, rating, images }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    console.log('Clicking card with ID:', id, 'Type:', type);
    navigate(`/tours/${id}?type=${type}`);
  };

  const { toggleWishlist, isInWishlist } = useAccommodationStore();
  const isWishlisted = isInWishlist(id);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleWishlist({ id, type, campName, location, price, actualPrice, rating, images });
  };

  const handlePlusClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    setModalOpen(true);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        borderRadius: '10px',
        position: 'relative',
        maxWidth: 330,
        backgroundColor: '#fff',
        border: '1px solid hsl(35, 90.50%, 95.90%)',
        boxShadow: 'none',
      }}
    >
      {/* Top left icons */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          display: 'flex',
          gap: 1,
          zIndex: 2,
          elevation: 0,
        }}
      >
        {/* <IconButton sx={{ backgroundColor: 'white', width: 25, height: 25 }}>
          <SelfImprovement sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton sx={{ backgroundColor: 'white', width: 25, height: 25 }}>
          <LocalFireDepartment sx={{ fontSize: 20 }} />
        </IconButton> */}
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          style={{ height: 330 }}
          className="swiper-container"
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Camp view ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  backgroundColor: 'white',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Add Plus Icon */}
        <IconButton
          onClick={handlePlusClick}
          sx={{
            position: 'absolute',
            bottom: 15,
            right: 15,
            backgroundColor: '#F0EDE9',
            width: 28,
            height: 28,
            zIndex: 2,
            '&:hover': {
              backgroundColor: '#E5E2DE',
            },
          }}
        >
          <Plus size={16} color="#101F37" />
        </IconButton>
        <CampModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          campData={{ id, type, campName, location, price, actualPrice, rating, images }}
        />

        {/* Rating & Weather Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 25,
            px: 1,
            py: 0.5,
            zIndex: 2,
          }}
        >
          <Star size={16} color="gold" />
          <Typography sx={{ fontSize: 14, ml: 0.5 }}>{rating}</Typography>
          {/* <Cloud sx={{ color: 'blue', fontSize: 16, ml: 1 }} />
          <Typography sx={{ fontSize: 14, ml: 0.5 }}>28°C</Typography> */}
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ position: 'relative', pt: 2, pb: '16px !important' }}>
        <Typography variant="subtitle2" color="text.secondary">
          {location}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mt: 0.5,
              fontSize: { xs: '1.25rem', md: '1.1rem' },
            }}
          >
            {campName}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={handleHeartClick}
              sx={{
                width: 33,
                height: 33,
                backgroundColor: '#F0EDE9',
                '&:hover': { backgroundColor: '#E5E2DE' },
              }}
            >
              <img
                src={isWishlisted ? heartfilled : heart}
                alt="heart"
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body3" sx={{ fontWeight: 'bold' }}>
            ₹ {price}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textDecoration: 'line-through',
              ml: 1,
              color: 'text.secondary',
            }}
          >
            ₹ {actualPrice}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Update defaultProps to include type
CampCard.defaultProps = {
  images: [],
  rating: 0,
  price: 0,
  actualPrice: 0,
  campName: '',
  location: '',
  type: 'tents', // Add default type
};

export default CampCard;
