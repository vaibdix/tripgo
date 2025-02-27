import { Box, FormControl, Select, MenuItem, ToggleButtonGroup, ToggleButton, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const accommodationTypes = [
  { value: 'tents', label: 'Tents' },
  { value: 'cottages', label: 'Cottages' },
  { value: 'farmhouses', label: 'Farmhouses' },
  { value: 'hotels', label: 'Hotels' },
  { value: 'homestays', label: 'Homestays' },
  { value: 'treehouses', label: 'Treehouses' },
  { value: 'villas', label: 'Villas' },
];

const TourTypeSelector = ({ tentType, handleTypeChange, isMobile, isPending }) => {
  return isMobile ? (
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
        {accommodationTypes.map(({ value, label }) => (
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
        {accommodationTypes.map(({ value, label }) => (
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
  );
};

export default TourTypeSelector;