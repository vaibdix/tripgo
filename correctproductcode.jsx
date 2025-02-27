import { useParams, useSearchParams } from 'react-router-dom';
import { Box, Typography, Grid, Rating, Chip, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import useAccommodationStore from '../../../store/accommodationStore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ReviewsIcon from '@mui/icons-material/Reviews';
// Add these new imports
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AttractionsIcon from '@mui/icons-material/Attractions';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import KingBedIcon from '@mui/icons-material/KingBed';

const ProductDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'tents';
  const { getAccommodationById } = useAccommodationStore();
  const [product, setProduct] = useState(null); // Add this line
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Images Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', height: '400px' }}>
            <img
              src={product.about.images[0]}
              alt={product.campName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          </Box>
          <Grid container spacing={1} sx={{ mt: 2 }}>
            {product.about.images.slice(1, 5).map((image, index) => (
              <Grid item xs={3} key={index}>
                <img
                  src={image}
                  alt={`${product.campName} ${index + 2}`}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Details Section - keep existing content and add new sections */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {product.campName}
          </Typography>

          {/* Type and Capacity */}
          <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
            {product.type} • {product.suitableFor}
          </Typography>

          {/* Ratings */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 3 }}>
            <Box>
              <Rating value={product.ratings.location} readOnly precision={0.1} />
              <Typography sx={{ ml: 1 }}>Location ({product.ratings.location})</Typography>
            </Box>
            <Box>
              <Rating value={product.ratings.cleanliness} readOnly precision={0.1} />
              <Typography sx={{ ml: 1 }}>Cleanliness ({product.ratings.cleanliness})</Typography>
            </Box>
          </Box>

          {/* Price */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            ₹{product.prices.afterDiscount}
            <Typography
              component="span"
              sx={{ textDecoration: 'line-through', color: 'text.secondary', ml: 1 }}
            >
              ₹{product.prices.actual}
            </Typography>
          </Typography>

          {/* Description */}
          <Typography sx={{ mb: 3 }}>{product.about.info}</Typography>

          {/* Location */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon /> Location
            </Typography>
            <Typography>
              {product.address.village}, {product.address.tal}, {product.address.dist}
            </Typography>
          </Box>

          {/* Room Details */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
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
          </Box>

          {/* Amenities */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Amenities
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {product.amenities?.map((amenity) => (
                <Chip key={amenity} label={amenity} />
              ))}
            </Box>
          </Box>

          {/* Dining */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalDiningIcon /> Dining Options
            </Typography>
            {product.foodDining.map((dining, index) => (
              <Box key={index}>
                <Typography>Meals Offered: {dining.mealsOffered.join(', ')}</Typography>
                <Typography>
                  {dining.veg ? '🟢 Veg' : ''} {dining['non-veg'] ? '🔴 Non-veg' : ''}
                </Typography>
                <Typography>
                  Outside Food: {dining.isOutsideFoodAllowed ? 'Allowed' : 'Not Allowed'}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Policies */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Policies
            </Typography>
            <Typography>Refund: {product.refundPolicy}</Typography>
            <Typography>Cancellation: {product.cancellationPolicy}</Typography>
          </Box>

          {/* Reviews Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ReviewsIcon /> Guest Reviews
            </Typography>
            {product.reviews.slice(0, 3).map((review, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
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

          {/* Add these new sections before the Book Now Button */}

          {/* Property Layout */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <KingBedIcon /> Property Layout
            </Typography>
            <Typography variant="subtitle1">Room Options:</Typography>
            {product.propertyLayout.roomOptions.map((option, index) => (
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
            ))}

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Shared Spaces:
            </Typography>
            {product.propertyLayout.sharedOptions.map((option, index) => (
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
            ))}
          </Box>

          {/* Special Packages */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalOfferIcon /> Special Packages
            </Typography>
            {product.specialPackages.map((pkg, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>{pkg.name}</Typography>
                <Typography>₹{pkg.price}</Typography>
              </Box>
            ))}
          </Box>

          {/* Activities */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
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

          {/* Dynamic Pricing */}
          <Box sx={{ mb: 3 }}>
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

          {/* Local Attractions */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
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

          {/* Weather */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <WbSunnyIcon /> Weather
            </Typography>
            <Typography>Current Temperature: {product.weather.currentTemp}</Typography>
            <Typography>Forecast: {product.weather.forecast.join(', ')}</Typography>
          </Box>

          {/* Transportation */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <DirectionsCarIcon /> Transportation
            </Typography>
            <Typography>Nearest Airport: {product.transportation.nearestAirport}</Typography>
            <Typography>Nearest Railway: {product.transportation.nearestRailwayStation}</Typography>
            {product.transportation.shuttleService && (
              <Typography>✓ Shuttle service available</Typography>
            )}
          </Box>

          {/* Health & Safety */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <HealthAndSafetyIcon /> Health & Safety
            </Typography>
            <Typography>Emergency Contact: {product.healthAndSafety.emergencyContact}</Typography>
            {product.healthAndSafety.firstAidAvailable && (
              <Typography>✓ First aid available</Typography>
            )}
            <Typography>{product.healthAndSafety.covidPrecautions}</Typography>
          </Box>

          {/* Unique Features */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Unique Features
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {product.uniqueFeatures.map((feature, index) => (
                <Chip key={index} label={feature} />
              ))}
            </Box>
          </Box>

          {/* Keep the existing Book Now Button */}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
