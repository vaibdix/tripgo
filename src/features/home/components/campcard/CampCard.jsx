import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { SelfImprovement as CampIcon, LocalFireDepartment as FireIcon } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { BedOutlined, StarBorder, CloudOutlined, Cloud } from '@mui/icons-material';

import './CampCard.css';

const images = [
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/b3/ab/c0/tents-n-trails.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/da/91/bb/tents-n-trails.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/da/91/bb/tents-n-trails.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/da/91/bb/tents-n-trails.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/cd/ed/b7/caption.jpg?w=700&h=-1&s=1',
];

const CampCard = () => {
  return (
    <Card
      sx={{
        borderRadius: '15px',
        position: 'relative',
        maxWidth: 350,
        border: '0.5px solid gray',
        backgroundColor: '#eeeeee',
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
        <IconButton sx={{ backgroundColor: 'white', width: 25, height: 25 }}>
          <CampIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton sx={{ backgroundColor: 'white', width: 25, height: 25 }}>
          <FireIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      <Box sx={{ position: 'relative' }}>
        {/* Image Slider with Pagination (Dots) */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          style={{ height: 330 }}
          className="swiper-container"
        >
          {images.map((img, index) => (
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
          <StarBorder sx={{ color: 'gold', fontSize: 16 }} />
          <Typography sx={{ fontSize: 14, ml: 0.5 }}>4.5</Typography>
          <Cloud sx={{ color: 'blue', fontSize: 16, ml: 1 }} />
          <Typography sx={{ fontSize: 14, ml: 0.5 }}>28°C</Typography>
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ position: 'relative', pt: 2, pb: '16px !important' }}>
        <Typography variant="subtitle2" color="text.secondary">
          Borivali
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
            Whispering Woods Tents
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <BedOutlined
              sx={{
                color: 'blue',
                fontSize: 28,
                backgroundColor: 'white',
                borderRadius: '50%',
                border: '1px solid gray',
                padding: 0.5,
              }}
            />
            <CloudOutlined
              sx={{
                color: 'green',
                fontSize: 28,
                backgroundColor: 'white',
                borderRadius: '50%',
                border: '1px solid gray',
                padding: 0.5,
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ₹ 7383
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textDecoration: 'line-through',
              ml: 1,
              color: 'text.secondary',
            }}
          >
            ₹ 8932
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CampCard;
