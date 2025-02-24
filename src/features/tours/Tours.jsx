import {
  Box,
  Grid,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  Collapse,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { useState, useEffect, useTransition } from 'react';
import useTentStore from '../../store/tentStore';
import CampCard from '../home/components/campcard/CampCard';
import useAccommodationStore from '../../store/accommodationStore';
import AccommodationFilters from './components/AccommodationFilters';
import { useTheme, useMediaQuery } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import catebg from '../../assets/images/catebg.png';
import CampCardSkeleton from '../home/components/campcard/CampCardSkeleton';

const Tours = () => {
  const [tentType, setTentType] = useState('tents');
  const [showFilters, setShowFilters] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isPending, startTransition] = useTransition();

  const { accommodations, fetchAccommodations, isLoading, currentPage, totalPages, changePage } =
    useAccommodationStore();

  useEffect(() => {
    fetchAccommodations(tentType, 1, filters);
  }, [tentType]);

  const handleTypeChange = (e, value) => {
    if (value !== null) {
      // Start transition for state updates
      startTransition(() => {
        setTentType(value);
        setFilters({
          priceRange: '',
          capacity: '',
          amenities: [],
          sortBy: '',
          additionalFilters: [],
          rating: '',
        });
      });
    }
  };

  // Update the ToggleButtonGroup to show loading state
  <ToggleButtonGroup
    value={tentType}
    exclusive
    onChange={handleTypeChange}
    sx={{
      gap: 1,
      display: 'flex',
      flexWrap: 'wrap',
      opacity: isPending ? 0.7 : 1,
      '& .MuiToggleButton-root': {
        border: '1px solid #e0e0e0',
        borderRadius: '24px',
        px: 3,
        py: 0.8,
        minWidth: '100px',
        textTransform: 'none',
        fontSize: '0.95rem',
        fontWeight: 500,
        color: '#666',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        },
        '&.Mui-selected': {
          backgroundColor: 'black',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        },
      },
    }}
  >
    {[
      { value: 'tents', label: 'Tents' },
      { value: 'cottages', label: 'Cottages' },
      { value: 'farmhouses', label: 'Farmhouses' },
      { value: 'hotels', label: 'Hotels' },
      { value: 'homestays', label: 'Homestays' },
      { value: 'treehouses', label: 'Treehouses' },
      { value: 'villas', label: 'Villas' },
    ].map(({ value, label }) => (
      <ToggleButton key={value} value={value}>
        {label}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>;

  const [filters, setFilters] = useState({
    priceRange: '',
    capacity: '',
    amenities: [],
    sortBy: '',
    additionalFilters: [],
  });

  const handlePriceChange = (event) => {
    setFilters({ ...filters, priceRange: event.target.value });
  };

  const handleCapacityChange = (event) => {
    setFilters({ ...filters, capacity: event.target.value });
  };

  const handleAmenityChange = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((item) => item !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: newAmenities });
  };

  // Update the handleSortChange function
  const handleSortChange = (event) => {
    setFilters({ ...filters, sortBy: event.target.value });
    fetchAccommodations(tentType, 1, { ...filters, sortBy: event.target.value });
  };

  // Replace the sort button code with this
  <FormControl sx={{ minWidth: 120 }}>
    <Select
      value={filters.sortBy}
      onChange={handleSortChange}
      displayEmpty
      sx={{
        borderRadius: '24px',
        height: '40px',
        border: '1px solid #e0e0e0',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
    >
      <MenuItem value="">Sort By</MenuItem>
      <MenuItem value="price_asc">Price: Low to High</MenuItem>
      <MenuItem value="price_desc">Price: High to Low</MenuItem>
      <MenuItem value="rating_desc">Highest Rated</MenuItem>
      <MenuItem value="popular">Most Popular</MenuItem>
    </Select>
  </FormControl>;

  const handleAdditionalFilterChange = (filter) => {
    const newFilters = filters.additionalFilters.includes(filter)
      ? filters.additionalFilters.filter((item) => item !== filter)
      : [...filters.additionalFilters, filter];
    setFilters({ ...filters, additionalFilters: newFilters });
  };

  const handleRatingChange = (event) => {
    setFilters({ ...filters, rating: event.target.value });
  };

  const handleClearAll = () => {
    setFilters({
      priceRange: '',
      capacity: '',
      amenities: [],
      sortBy: '',
      additionalFilters: [],
    });
  };

  const handleApplyFilters = () => {
    fetchAccommodations(tentType, 1, filters);
    setShowFilters(false);
  };

  return (
    <>
      <Box sx={{ pl: '2rem', pr: '2rem', pt: '2rem' }}>
        <Box
          sx={{
            backgroundImage: `url(${catebg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '250px',
            marginBottom: '2rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#fff' }}>
            SHOP COLLECTION
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              sx={{
                border: '1px solid #e0e0e0',
                height: '40px',
                width: '40px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                },
              }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterList />
            </IconButton>

            {isMobile ? (
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={tentType}
                  onChange={(e) => handleTypeChange(e, e.target.value)}
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{
                    borderRadius: '24px',
                    height: '40px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: tentType ? 'black' : 'transparent',
                    color: tentType ? 'white' : '#666',
                    '&:hover': {
                      backgroundColor: tentType ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.04)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '& .MuiSelect-icon': {
                      color: tentType ? 'white' : '#666',
                    },
                  }}
                >
                  <MenuItem value="">Select Accommodation</MenuItem>
                  {[
                    { value: 'tents', label: 'Tents' },
                    { value: 'cottages', label: 'Cottages' },
                    { value: 'farmhouses', label: 'Farmhouses' },
                    { value: 'hotels', label: 'Hotels' },
                    { value: 'homestays', label: 'Homestays' },
                    { value: 'treehouses', label: 'Treehouses' },
                    { value: 'villas', label: 'Villas' },
                  ].map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Box sx={{ position: 'relative' }}>
                <ToggleButtonGroup
                  value={tentType}
                  exclusive
                  onChange={handleTypeChange}
                  sx={{
                    gap: 1,
                    display: 'flex',
                    flexWrap: 'wrap',
                    opacity: isPending ? 0.7 : 1,
                    pointerEvents: isPending ? 'none' : 'auto',
                    '& .MuiToggleButton-root': {
                      border: '1px solid #e0e0e0',
                      borderRadius: '24px',
                      px: 3,
                      py: 0.8,
                      minWidth: '100px',
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: '#666',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'black',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        },
                      },
                    },
                  }}
                >
                  {[
                    { value: 'tents', label: 'Tents' },
                    { value: 'cottages', label: 'Cottages' },
                    { value: 'farmhouses', label: 'Farmhouses' },
                    { value: 'hotels', label: 'Hotels' },
                    { value: 'homestays', label: 'Homestays' },
                    { value: 'treehouses', label: 'Treehouses' },
                    { value: 'villas', label: 'Villas' },
                  ].map(({ value, label }) => (
                    <ToggleButton key={value} value={value}>
                      {label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                {isPending && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            )}

            {/* Sort By Button */}
            <FormControl sx={{ minWidth: 120, marginLeft: 'auto' }}>
              <Select
                value={filters.sortBy || ''}
                onChange={handleSortChange}
                displayEmpty
                sx={{
                  borderRadius: '24px',
                  height: '40px',
                  border: '1px solid #e0e0e0',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              >
                <MenuItem value="">Sort By</MenuItem>
                <MenuItem value="price_asc">Price: Low to High</MenuItem>
                <MenuItem value="price_desc">Price: High to Low</MenuItem>
                <MenuItem value="rating_desc">Highest Rated</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Replace the showFilters condition with Collapse */}
          <Collapse in={showFilters} timeout={400}>
            <Box sx={{ mt: 3 }}>
              <AccommodationFilters
                filters={filters}
                showFilters={showFilters}
                onPriceChange={handlePriceChange}
                onCapacityChange={handleCapacityChange}
                onAmenityChange={handleAmenityChange}
                onSortChange={handleSortChange}
                onAdditionalFilterChange={handleAdditionalFilterChange}
                onClearAll={handleClearAll}
                onApplyFilters={handleApplyFilters}
                onRatingChange={handleRatingChange}
              />
            </Box>
          </Collapse>

          {/* Filters Grid with Collapse */}
        </Box>
      </Box>
      <Box sx={{ pl: '2rem', pr: '2rem' }}>
        <Box sx={{ mb: 4 }}>
          {isLoading ? (
            <Grid container spacing={3}>
              {[...Array(8)].map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <CampCardSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : accommodations && accommodations.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {accommodations.map((item) => (
                  <Grid item key={item._id || item.id} xs={12} sm={6} md={4} lg={3}>
                    <CampCard
                      id={item._id || item.id}
                      type={tentType}
                      campName={item.campName}
                      location={item.address.tal}
                      price={item.prices.afterDiscount}
                      actualPrice={item.prices.actual}
                      rating={item.ratings.location}
                      images={item.about.images}
                    />
                  </Grid>
                ))}
              </Grid>
              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(e, page) => changePage(page)}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: 'black',
                    },
                    '& .Mui-selected': {
                      backgroundColor: 'black !important',
                      color: 'white !important',
                    },
                  }}
                />
              </Box>
            </>
          ) : (
            <Typography>No {tentType} available</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Tours;
