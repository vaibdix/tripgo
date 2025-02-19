import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

const AccommodationFilters = ({
  filters,
  onPriceChange,
  onCapacityChange,
  onAmenityChange,
  onSortChange,
  onAdditionalFilterChange,
  onRatingChange,
  onClearAll,
  onApplyFilters,
}) => {
  return (
    <Grid container spacing={4} sx={{ marginTop: '0.5rem' }}>
      {/* Price Range Section */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Price Range
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={filters.priceRange} onChange={onPriceChange}>
            {['Under ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹15,000', 'Above ₹15,000'].map(
              (price) => (
                <FormControlLabel key={price} value={price} control={<Radio />} label={price} />
              )
            )}
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Capacity Section */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Capacity
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={filters.capacity} onChange={onCapacityChange}>
            {['1-2 Guests', '3-4 Guests', '5-6 Guests', '7+ Guests'].map((size) => (
              <FormControlLabel key={size} value={size} control={<Radio />} label={size} />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Amenities Section */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Amenities
        </Typography>
        <FormControl component="fieldset">
          {[
            'Free WiFi',
            'Campfire',
            'Free Breakfast',
            'Trekking',
            'Wildlife Safari',
            'Yoga Sessions',
          ].map((amenity) => (
            <FormControlLabel
              key={amenity}
              control={
                <Checkbox
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => onAmenityChange(amenity)}
                />
              }
              label={amenity}
            />
          ))}
        </FormControl>
      </Grid>

      {/* Rating Filter Section */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Rating
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={filters.rating} onChange={onRatingChange}>
            {[
              { value: '4.5', label: '4.5 & above' },
              { value: '4.0', label: '4.0 & above' },
              { value: '3.5', label: '3.5 & above' },
              { value: '3.0', label: '3.0 & above' },
            ].map((rating) => (
              <FormControlLabel
                key={rating.value}
                value={rating.value}
                control={<Radio />}
                label={rating.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Additional Filters */}
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          More Filters
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {[
            'Meal Included',
            'Pet Friendly',
            'Wheelchair Accessible',
            'Family Friendly',
            'Couples',
            'Adventure Activities',
          ].map((filter) => (
            <FormControlLabel
              key={filter}
              control={
                <Checkbox
                  checked={filters.additionalFilters.includes(filter)}
                  onChange={() => onAdditionalFilterChange(filter)}
                />
              }
              label={filter}
            />
          ))}
        </Box>
      </Grid>

      {/* Action Buttons */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            onClick={onClearAll}
            sx={{ borderRadius: '25px', py: 1, px: 4, color: 'black', border: '1px solid' }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            onClick={onApplyFilters}
            sx={{
              borderRadius: '24px',
              py: 1,
              px: 4,
              color: 'white',
              border: '1px solid',
              backgroundColor: 'black',
            }}
          >
            Apply
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccommodationFilters;
