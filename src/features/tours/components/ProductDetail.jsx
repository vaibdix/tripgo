import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Rating,
  Chip,
  Button,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  SportsEsports,
  Person,
  Pool,
  LocalFireDepartment,
  OutdoorGrill,
  Park,
} from '@mui/icons-material';
import {
  Footprints,
  SquareActivity,
  MapIcon,
  Wifi,
  Wine,
  Soup,
  Hotel,
  ChevronRightIcon,
  ChevronLeftIcon,
  ParkingCircle,
  Landmark,
  Mountain,
} from 'lucide-react';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AttractionsIcon from '@mui/icons-material/Attractions';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import KingBedIcon from '@mui/icons-material/KingBed';

import useAccommodationStore from '../../../store/accommodationStore';
import RandomDestinations from './RandomDestinations';
import DiningOptions from './DiningOptions';
import SpecialPackages from './SpecialPackages';

const amenities = {
  Restaurant: <Hotel />,
  'Game Room': <SportsEsports />,
  Caretaker: <Person />,
  Bonfire: <LocalFireDepartment />,
  'Swimming Pool': <Pool />,
  Garden: <Park />,
  Barbeque: <OutdoorGrill />,
  treaking: <Footprints />,
  yoga: <SquareActivity />,
};

const freeServices = {
  'Free WiFi': <Wifi />,
  'Complimentary Drinks': <Wine />,
  'Free Breakfast': <Soup />,
  'Free Parking': <ParkingCircle />,
};

const ProductDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'tents';
  const { getAccommodationById } = useAccommodationStore();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching product with ID:', id, 'Type:', type);
        const productData = await getAccommodationById(id, type);
        console.log('Fetched product data:', productData);

        if (productData) {
          console.log('Setting product:', productData);
          setProduct(productData);
        } else {
          console.log('Product not found for ID:', id);
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error loading product');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, type, getAccommodationById]);

  // Add debug log for current product state
  console.log('Current product state:', product);

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
      >
        <Typography>Product not found</Typography>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)', // Changed from 6 to 5 columns
          gridTemplateRows: 'repeat(3, 250px)', // Added consistent gap
          gridAutoFlow: 'row',
          //   gridTemplateColumns: 'repeat(6, 1fr)',
          //   gridTemplateRows: 'repeat(3, 1fr)',
          //   gap: '0px 0px',
          //   gridTemplateAreas: `"image0 image0 image0 image1 basicproductdetails basicproductdetails"
          //                      "image0 image0 image0 image2 basicproductdetails basicproductdetails"
          //                      "image0 image0 image0 image3 basicproductdetails basicproductdetails"
          //                      "tabs tabs tabs tabs tabs tabs"`,
          gap: '0px 0px',
          gridTemplateAreas: `"image0 image0 image1 basicproductdetails basicproductdetails" 
                             "image0 image0 image2 basicproductdetails basicproductdetails" 
                             "image0 image0 image3 basicproductdetails basicproductdetails" 
                             "tabs tabs tabs tabs tabs"`,
          // Center the grid
        }}
      >
        {/* Images Section */}
        <Grid item sx={{ gridArea: 'image0' }}>
          <Box sx={{ height: '100%', position: 'relative' }}>
            {' '}
            {/* Fixed height */}
            <img
              src={product.about.images[0]}
              alt={product.campName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </Box>
        </Grid>
        {/* Smaller images */}
        <Grid item sx={{ gridArea: 'image1' }}>
          <Box sx={{ height: '100%', position: 'relative' }}>
            {' '}
            {/* Adjusted height */}
            <img
              src={product.about.images[1]}
              alt={`${product.campName} 1`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </Box>
        </Grid>
        <Grid item sx={{ gridArea: 'image2' }}>
          <Box sx={{ height: '100%', position: 'relative' }}>
            <img
              src={product.about.images[2]}
              alt={`${product.campName} 2`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </Box>
        </Grid>
        <Grid item sx={{ gridArea: 'image3' }}>
          <Box sx={{ height: '100%', position: 'relative' }}>
            <img
              src={product.about.images[3]}
              alt={`${product.campName} 3`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </Box>
        </Grid>
        {/* Basic Product Details */}
        <Grid item sx={{ gridArea: 'basicproductdetails' }}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {product.campName}
              </Typography>

              {/* Ratings */}
              <Box sx={{ alignItems: 'self-end', gap: 2, marginLeft: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating
                    value={
                      (product.ratings.location +
                        product.ratings.cleanliness +
                        product.ratings.valueForMoney +
                        product.ratings.food +
                        product.ratings.facilities +
                        product.ratings.checkInExperience) /
                      6
                    }
                    readOnly
                    precision={0.1}
                    max={1}
                  />
                  <Typography sx={{ ml: 1 }}>
                    {(
                      (product.ratings.location +
                        product.ratings.cleanliness +
                        product.ratings.valueForMoney +
                        product.ratings.food +
                        product.ratings.facilities +
                        product.ratings.checkInExperience) /
                      6
                    ).toFixed(1)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex' }}>
                {/* Type and Capacity */}
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                  {product.type} • {product.suitableFor}
                </Typography>
              </Box>

              {/* Price */}
              <Typography variant="p" sx={{ mb: 1, marginLeft: 'auto' }}>
                ₹ {product.prices.afterDiscount}
                <Typography
                  component="span"
                  sx={{ textDecoration: 'line-through', color: 'text.secondary', ml: 1 }}
                >
                  ₹ {product.prices.actual}
                </Typography>
              </Typography>
            </Box>

            {/* Free Services */}
            <Box sx={{ mb: 2, display: 'flex' }}>
              <Typography variant="p" sx={{ mr: 1, fontWeight: 600 }}>
                Free Services
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {Object.entries(freeServices).map(([service, icon]) => (
                  <Tooltip key={service} title={service} arrow>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 0.4,
                        mt: -0.3,
                        ml: 1,
                        cursor: 'pointer',
                        borderRadius: '25px',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        },
                      }}
                    >
                      {icon}
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            </Box>

            {/* Description */}
            <Typography sx={{ mb: 2 }}>{product.about.info}</Typography>

            {/* Location */}
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
              <Typography
                component="div" // Change component to div instead of p
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}
              >
                Address
              </Typography>
              <Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip icon={<LocationOnIcon />} label={product.address.dist} />
                </Box>
              </Box>
            </Box>

            {/* activities */}
            {product.activities && product.activities.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="p"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}
                >
                  Activities
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {product.activities.map((activity) => (
                    <Chip key={activity} label={activity} />
                  ))}
                </Box>
              </Box>
            )}

            {/* Room Details */}
            {/* <Box sx={{ mb: 2 }}>
              <Typography variant="p" sx={{ mb: 1 }}>
                Room Details
              </Typography>
              {product.roomsInACamp.map((room, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="subtitle1">{room.type}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {room.beds} • {room.capacity}
                  </Typography>
                </Box>
              ))}
            </Box> */}

            {/* Amenities */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="p" sx={{ mb: 1, fontWeight: 600 }}>
                Amenities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {product.amenities?.map((amenity) => (
                  <Chip key={amenity} label={amenity} />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography
                variant="p"
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}
              >
                Nearby Attractions
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {product.localAttractions.map((attraction, index) => (
                  <Chip
                    key={index}
                    label={`${attraction.name} (${attraction.distance})`}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 2, mt: 1, width: '100%' }}>
              <SpecialPackages packages={product.specialPackages} />
            </Box>

            {/* Book Now Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: 'black',
                py: 1.5,

                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
              }}
            >
              Book Now
            </Button>
          </Paper>
        </Grid>

        {/* Tabs Section */}
        <Grid item sx={{ gridArea: 'tabs', marginTop: 3 }}>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <IconButton
              sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
              onClick={() => {
                const newValue = Math.max(0, tabValue - 1);
                setTabValue(newValue);
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
              onClick={() => {
                const newValue = Math.min(11, tabValue + 1);
                setTabValue(newValue);
              }}
            >
              <ChevronRightIcon />
            </IconButton>
            <Box sx={{ overflow: 'hidden', mx: 5 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTabs-scrollButtons': {
                    display: 'none',
                  },
                }}
              >
                <Tab label="Address" />
                <Tab label="Dining" />

                <Tab label="Reviews" />
                <Tab label="Property Layout" />
                <Tab label="Activities" />
                <Tab label="Dynamic Pricing" />
                <Tab label="Local Attractions" />
                <Tab label="Weather" />
                <Tab label="Transportation" />
                <Tab label="Health & Safety" />
                <Tab label="Unique Features" />
                <Tab label="Policies" />
                <Tab label="Policies" />
              </Tabs>
            </Box>
          </Box>
          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <LocationOnIcon /> Address
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography>
                    {product.address.village}, {product.address.tal},{product.address.dist},{' '}
                    {product.address.state}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {product.address.location && (
                      <Button
                        variant="outlined"
                        startIcon={<MapIcon color="rgba(0, 0, 0, 0.04)" />}
                        size="small"
                        href={product.address.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderRadius: '20px',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            color: 'white',
                          },
                        }}
                      >
                        View on Map
                      </Button>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: '300px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <iframe
                      title="Location Map"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        `${product.address.village}, ${product.address.tal}, ${product.address.dist}, ${product.address.state}`
                      )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {tabValue === 1 && <DiningOptions foodDining={product.foodDining} />}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Policies
                </Typography>
                <Typography>Refund: {product.refundPolicy}</Typography>
                <Typography>Cancellation: {product.cancellationPolicy}</Typography>
              </Box>
            )}
            {tabValue === 2 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <ReviewsIcon /> Guest Reviews
                </Typography>
                {product.reviews.slice(0, 3).map((review, index) => (
                  <Box
                    key={index}
                    sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1">{review.custName}</Typography>
                      <Rating value={Number(review.rating)} readOnly size="small" />
                    </Box>
                    <Typography variant="body2">{review.review}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            {tabValue === 3 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <KingBedIcon /> Property Layout
                </Typography>
                <Typography variant="subtitle1">Room Options:</Typography>
                {product.propertyLayout && product.propertyLayout.roomOptions ? (
                  product.propertyLayout.roomOptions.map((option, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <img
                        src={option.img}
                        alt={option.name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                      <Typography variant="subtitle1">
                        {option.name} (Qty: {option.qty})
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.beds} {option.extra && `• ${option.extra}`}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary">No room options available</Typography>
                )}

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Shared Spaces:
                </Typography>
                {product.propertyLayout && product.propertyLayout.sharedOptions ? (
                  product.propertyLayout.sharedOptions.map((option, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <img
                        src={option.img}
                        alt={option.name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                      <Typography variant="subtitle1">
                        {option.name} (Qty: {option.qty})
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary">No shared spaces available</Typography>
                )}
              </Box>
            )}
            {tabValue === 4 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <LocalOfferIcon /> Special Packages
                </Typography>
                {product.specialPackages.map((pkg, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{pkg.name}</Typography>
                    <Typography>₹{pkg.price}</Typography>
                  </Box>
                ))}
              </Box>
            )}
            {tabValue === 5 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <LocalActivityIcon /> Activities
                </Typography>
                {product.activitiesDetails.map((activity, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">{activity.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.difficulty} • {activity.duration} • ₹{activity.price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            {tabValue === 6 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Dynamic Pricing
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography>
                    Weekday: ₹{product.dynamicPricing.weekday.discounted}
                    <Typography
                      component="span"
                      sx={{ textDecoration: 'line-through', color: 'text.secondary', ml: 1 }}
                    >
                      ₹{product.dynamicPricing.weekday.actual}
                    </Typography>
                  </Typography>
                  <Typography>
                    Weekend: ₹{product.dynamicPricing.weekend.discounted}
                    <Typography
                      component="span"
                      sx={{ textDecoration: 'line-through', color: 'text.secondary', ml: 1 }}
                    >
                      ₹{product.dynamicPricing.weekend.actual}
                    </Typography>
                  </Typography>
                  <Typography>
                    Peak Season: ₹{product.dynamicPricing.peakSeason.discounted}
                    <Typography
                      component="span"
                      sx={{ textDecoration: 'line-through', color: 'text.secondary', ml: 1 }}
                    >
                      ₹{product.dynamicPricing.peakSeason.actual}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            )}
            {tabValue === 7 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <AttractionsIcon /> Nearby Attractions
                </Typography>
                {product.localAttractions.map((attraction, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">{attraction.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {attraction.distance} • {attraction.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            {tabValue === 8 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <WbSunnyIcon /> Weather
                </Typography>
                <Typography>Current Temperature: {product.weather.currentTemp}</Typography>
                <Typography>Forecast: {product.weather.forecast.join(', ')}</Typography>
              </Box>
            )}
            {tabValue === 9 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <DirectionsCarIcon /> Transportation
                </Typography>
                <Typography>Nearest Airport: {product.transportation.nearestAirport}</Typography>
                <Typography>
                  Nearest Railway: {product.transportation.nearestRailwayStation}
                </Typography>
                {product.transportation.shuttleService && (
                  <Typography>✓ Shuttle service available</Typography>
                )}
              </Box>
            )}
            {tabValue === 10 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <HealthAndSafetyIcon /> Health & Safety
                </Typography>
                <Typography>
                  Emergency Contact: {product.healthAndSafety.emergencyContact}
                </Typography>
                {product.healthAndSafety.firstAidAvailable && (
                  <Typography>✓ First aid available</Typography>
                )}
                <Typography>{product.healthAndSafety.covidPrecautions}</Typography>
              </Box>
            )}
            {tabValue === 11 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Unique Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {product.uniqueFeatures.map((feature, index) => (
                    <Chip key={index} label={feature} />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <RandomDestinations />
    </Box>
  );
};

export default ProductDetail;
