import { useTheme as useCustomTheme } from '../ThemeContext';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  SortByAlpha as SortByAlphaIcon,
  FormatListNumbered as FormatListNumberedIcon,
} from '@mui/icons-material';
import {
  Box,
  TextField,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  InputAdornment,
} from '@mui/material';
import React from 'react';

const UserTableHeader = ({ searchQuery, setSearchQuery, sortConfig, setSortConfig, disabled }) => {
  const { darkMode } = useCustomTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
    handleSortMenuClose();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
      <TextField
        fullWidth
        placeholder="Search users by name or email..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: darkMode ? 'rgba(255,255,255,0.7)' : 'inherit' }} />
            </InputAdornment>
          ),
          sx: {
            color: darkMode ? '#fff' : 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
            },
            bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          },
        }}
        disabled={disabled}
        sx={{
          opacity: disabled ? 0.7 : 1,
        }}
      />

      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={handleSortMenuOpen}
        disabled={disabled}
        sx={{
          borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
          color: darkMode ? '#fff' : 'inherit',
          '&:hover': {
            borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
            bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          },
          minWidth: '120px',
          opacity: disabled ? 0.7 : 1,
        }}
      >
        Sort
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleSortMenuClose}
        PaperProps={{
          sx: {
            bgcolor: darkMode ? '#1e1e1e' : '#fff',
            color: darkMode ? '#fff' : 'inherit',
            boxShadow: darkMode ? '0 4px 8px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem
          onClick={() => handleSort('name', 'asc')}
          sx={{
            color: darkMode ? '#fff' : 'inherit',
            bgcolor:
              sortConfig.key === 'name' && sortConfig.direction === 'asc'
                ? darkMode
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.05)'
                : 'transparent',
          }}
        >
          <ListItemIcon sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
            <SortByAlphaIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Name (A-Z)</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => handleSort('name', 'desc')}
          sx={{
            color: darkMode ? '#fff' : 'inherit',
            bgcolor:
              sortConfig.key === 'name' && sortConfig.direction === 'desc'
                ? darkMode
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.05)'
                : 'transparent',
          }}
        >
          <ListItemIcon sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
            <SortByAlphaIcon fontSize="small" sx={{ transform: 'scaleY(-1)' }} />
          </ListItemIcon>
          <Typography variant="body2">Name (Z-A)</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => handleSort('number', 'asc')}
          sx={{
            color: darkMode ? '#fff' : 'inherit',
            bgcolor:
              sortConfig.key === 'number' && sortConfig.direction === 'asc'
                ? darkMode
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.05)'
                : 'transparent',
          }}
        >
          <ListItemIcon sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
            <FormatListNumberedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Row Number (Ascending)</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => handleSort('number', 'desc')}
          sx={{
            color: darkMode ? '#fff' : 'inherit',
            bgcolor:
              sortConfig.key === 'number' && sortConfig.direction === 'desc'
                ? darkMode
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.05)'
                : 'transparent',
          }}
        >
          <ListItemIcon sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
            <FormatListNumberedIcon fontSize="small" sx={{ transform: 'scaleY(-1)' }} />
          </ListItemIcon>
          <Typography variant="body2">Row Number (Descending)</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserTableHeader;
