import React from 'react';
import { Box, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import gridnordicimage from '../../../../assets/images/gridnordicimage.jpg';
import card1Bg from '../../../../assets/images/bgstar.png';
import card4Bg from '../../../../assets/images/bgstar.png';

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '0.8fr 0.8fr 1.4fr',
  gridTemplateRows: '1.3fr 0.4fr 1.3fr',
  gap: '0px 0px',
  gridTemplateAreas: `
    "one two image"
    "one four image"
    "three four image"
  `,
  padding: theme.spacing(2),
  height: '90vh',
  position: 'relative',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    background: '#E5E5E5',
    opacity: 0.5,
  },
  // Vertical lines
  '&::before': {
    width: '2px',
    height: '100%',
    left: '54.2%',
    top: 0,
  },
  // Horizontal lines
  '&::after': {
    width: '27.3%',
    height: '2px',
    left: 375,
    top: '42.4%',
  },
}));

const GridOverlay = styled(Box)({
  position: 'absolute',
  width: '25.3%',
  height: '2px',
  left: 24,
  top: '57.5%',
  background: '#E5E5E5',
  opacity: 0.5,
  zIndex: 1,
});

const GridOverlayVertical = styled(Box)({
  position: 'absolute',
  width: '2px',
  height: '100%',
  left: '27%',
  top: 0,
  background: '#E5E5E5',
  opacity: 0.5,
  zIndex: 1,
});

const GridItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  background: '#1a1a1a',
  color: 'white',
  margin: '4px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  justifyContent: 'flex-end',
  minHeight: '200px',
  '& .MuiTypography-root': {
    padding: theme.spacing(1),
  },
}));

const ImageBox = styled(Box)({
  gridArea: 'image',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const MobileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const MobileGridItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  background: '#1a1a1a',
  color: 'white',
  borderRadius: '15px',
  minHeight: '120px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  justifyContent: 'flex-end',
  '& .MuiTypography-root': {
    padding: theme.spacing(0.5, 0),
  },
}));

const MobileImageBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '250px',
  marginBottom: theme.spacing(2),
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '15px',
  },
}));

// Update in both desktop and mobile layouts
const NordicSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const MobileLayout = () => (
    <Box
      position="relative"
      sx={{ px: 2, borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
    >
      <Typography variant="h6" sx={{ mt: 3, mb: 3, fontSize: '1.5rem' }}>
        Nordic Adventures
        <Box
          sx={{
            background: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))`,
            height: '2px',
            width: '24%',
          }}
        />
      </Typography>

      <MobileContainer>
        <MobileImageBox>
          <img src={gridnordicimage} alt="Nordic fjords and landscapes" />
        </MobileImageBox>

        <MobileGridItem
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '25%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              backgroundImage: `url(${card1Bg})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: 0.5,
              zIndex: -1,
            },
          }}
        >
          <Typography variant="h5" sx={{ position: 'relative', zIndex: 2 }}>
            Discover Nordic Fjords
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.500', position: 'relative', zIndex: 2 }}>
            Experience majestic fjords and pristine landscapes
          </Typography>
        </MobileGridItem>

        <MobileGridItem sx={{ bgcolor: '#F8F8F8', color: 'black' }}>
          <Typography variant="overline">/01</Typography>
          <Typography variant="h6">Northern Lights</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Chase the magical Aurora Borealis
          </Typography>
        </MobileGridItem>

        <MobileGridItem sx={{ bgcolor: '#F8F8F8', color: 'black' }}>
          <Typography variant="overline">/02</Typography>
          <Typography variant="h6">Coastal Villages</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Visit charming fishing communities
          </Typography>
        </MobileGridItem>

        <MobileGridItem sx={{ bgcolor: '#F8F8F8', color: 'black' }}>
          <Typography variant="overline">/03</Typography>
          <Typography variant="h6">Arctic Wildlife</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Encounter whales, seals & arctic birds
          </Typography>
        </MobileGridItem>
      </MobileContainer>
    </Box>
  );

  return isMobile ? (
    <MobileLayout />
  ) : (
    // Desktop Layout
    <Box
      position="relative"
      sx={{
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mt: 3,
          mb: 3,
          fontSize: '1.7rem',
          pl: 0,
        }}
      >
        New Destinations
        <Box
          sx={{
            background: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))`,
            height: '2px',
            width: '24%',
          }}
        />
      </Typography>
      <GridContainer sx={{ gap: 4, bgcolor: 'white', padding: 2 }}>
        <GridItem
          sx={{
            gridArea: 'one',
            padding: 2,
            borderRadius: '15px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '25%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              backgroundImage: `url(${card1Bg})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: 0.5,
              zIndex: -1,
            },
          }}
        >
          <Typography variant="overline">/01</Typography>
          <Typography variant="h5" sx={{ position: 'relative', zIndex: 2 }}>
            Explore Nordic Sea
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.500', position: 'relative', zIndex: 2 }}>
            Feel the cold breeze of nordic seas
          </Typography>
        </GridItem>

        <GridItem
          sx={{
            gridArea: 'two',
            padding: 2,
            borderRadius: '15px',
            bgcolor: '#F8F8F8',
            color: 'black', // Changed to black for better contrast
          }}
        >
          <Typography variant="overline">/02</Typography>
          <Typography variant="h5">Wilderness</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Embrace the Wild Wilderness
          </Typography>
        </GridItem>

        <GridItem
          sx={{
            gridArea: 'three',
            padding: 2,
            borderRadius: '15px',
            bgcolor: '#F8F8F8',
            color: 'black', // Changed to black for better contrast
          }}
        >
          <Typography variant="overline">/03</Typography>
          <Typography variant="h5">Wilderness</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Embrace the Wild Wilderness
          </Typography>
        </GridItem>
        <GridOverlay />
        <GridOverlayVertical />
        <GridItem
          sx={{
            gridArea: 'four',
            padding: 2,
            borderRadius: '15px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '25%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              backgroundImage: `url(${card4Bg})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: 0.5,
              zIndex: -1,
            },
          }}
        >
          <Typography variant="overline" sx={{ position: 'relative', zIndex: 2 }}>
            /04
          </Typography>
          <Typography variant="h5" sx={{ position: 'relative', zIndex: 2 }}>
            Nordic Sea
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.500', position: 'relative', zIndex: 2 }}>
            Enjoy cold breeze
          </Typography>
        </GridItem>

        <ImageBox sx={{ padding: 1 }}>
          <img
            src={gridnordicimage}
            alt="Nordic wilderness"
            style={{
              borderRadius: '15px',
            }}
          />
        </ImageBox>
      </GridContainer>
    </Box>
  );
};

export default NordicSection;
