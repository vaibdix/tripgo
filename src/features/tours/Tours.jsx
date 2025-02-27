import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Collapse,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { useState, useEffect, useTransition } from 'react';
import useAccommodationStore from '../../store/accommodationStore';
import AccommodationFilters from './components/AccommodationFilters';
import { useTheme, useMediaQuery } from '@mui/material';
import TourHeader from './components/TourHeader';
import TourTypeSelector from './components/TourTypeSelector';
import TourList from './components/TourList';

const Tours = () => {
  const [tentType, setTentType] = useState('tents');
  const [showFilters, setShowFilters] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isPending, startTransition] = useTransition();

  // Move filters state declaration before useEffect
  const [filters, setFilters] = useState({
    priceRange: '',
    capacity: '',
    amenities: [],
    sortBy: '',
    additionalFilters: [],
  });

  const { accommodations, fetchAccommodations, isLoading, currentPage, totalPages, changePage } =
    useAccommodationStore();

  useEffect(() => {
    fetchAccommodations(tentType, 1, filters);
  }, [tentType, filters]);

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

  // Update the handleSortChange function
  const handleSortChange = (event) => {
    setFilters({ ...filters, sortBy: event.target.value });
    fetchAccommodations(tentType, 1, { ...filters, sortBy: event.target.value });
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
        <TourHeader />
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

            <TourTypeSelector
              tentType={tentType}
              handleTypeChange={handleTypeChange}
              isMobile={isMobile}
              isPending={isPending}
            />

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
          <TourList
            isLoading={isLoading}
            accommodations={accommodations}
            tentType={tentType}
            currentPage={currentPage}
            totalPages={totalPages}
            changePage={changePage}
          />
        </Box>
      </Box>
    </>
  );
};

export default Tours;
