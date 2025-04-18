import useAccommodationStore from '../../../store/accommodationStore';
import { useTheme as useCustomTheme } from './ThemeContext';
import { Edit, Delete, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  CircularProgress,
  Alert,
  TablePagination,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import { useState, useEffect, Suspense, lazy } from 'react';

const ToursTableSkeleton = lazy(() => import('./ToursTableSkeleton'));

const ToursAdmin = () => {
  const { darkMode, accentColor } = useCustomTheme();
  const { accommodations, fetchAccommodations, accommodationsLoading, accommodationsError } =
    useAccommodationStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [newTourForm, setNewTourForm] = useState({
    campName: '',
    price: '',
    location: '',
    type: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [activeTab, setActiveTab] = useState('tents');
  const accommodationTypes = [
    { value: 'tents', label: 'Tents' },
    { value: 'cottages', label: 'Cottages' },
    { value: 'farmhouses', label: 'Farmhouses' },
    { value: 'hotels', label: 'Hotels' },
    { value: 'homestays', label: 'Homestays' },
    { value: 'treehouses', label: 'Treehouses' },
    { value: 'villas', label: 'Villas' },
  ];

  useEffect(() => {
    const fetchAllAccommodationsForAdmin = async () => {
      try {
        const { fetchAccommodations } = useAccommodationStore.getState();
        let response;
        const api = await import('../../../store/Api').then((module) => module.api);

        switch (activeTab) {
          case 'tents':
            response = await api.fetchtents();
            break;
          case 'cottages':
            response = await api.fetchcottages();
            break;
          case 'farmhouses':
            response = await api.fetchfarmhouses();
            break;
          case 'hotels':
            response = await api.fetchhotels();
            break;
          case 'homestays':
            response = await api.fetchhomestays();
            break;
          case 'treehouses':
            response = await api.fetchtreehouses();
            break;
          case 'villas':
            response = await api.fetchvillas();
            break;
          default:
            response = await api.fetchtents();
        }

        // Set the full data directly to the accommodations state
        useAccommodationStore.setState({
          accommodations: response.data,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
        useAccommodationStore.setState({
          error: error.message,
          isLoading: false,
        });
      }
    };

    useAccommodationStore.setState({ isLoading: true });
    fetchAllAccommodationsForAdmin();
    setPage(0);
  }, [activeTab]);

  useEffect(() => {
    if (!accommodations) return;

    if (searchTerm.trim() === '') {
      setFilteredAccommodations(accommodations);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = accommodations.filter(
        (tour) =>
          tour.campName?.toLowerCase().includes(lowercasedSearch) ||
          tour.address?.tal?.toLowerCase().includes(lowercasedSearch) ||
          tour.type?.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredAccommodations(filtered);
    }
    setPage(0);
  }, [searchTerm, accommodations]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenNewDialog = () => {
    setNewTourForm({
      campName: '',
      price: '',
      location: '',
      type: activeTab,
    });
    setOpenNewDialog(true);
  };

  // Handle closing new tour dialog
  const handleCloseNewDialog = () => {
    setOpenNewDialog(false);
  };

  const handleSaveNewTour = () => {
    console.log('Saving new tour:', newTourForm);
    handleCloseNewDialog();
  };
  const handleDelete = (tourId) => {
    console.log('Deleting tour with ID:', tourId);
  };
  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setEditForm({
      campName: tour.campName,
      price: tour.prices.afterDiscount,
      location: tour.address.tal,
    });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedTour(null);
  };

  const handleSave = () => {
    console.log('Saving:', editForm);
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with search and add button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: darkMode ? '#fff' : 'inherit' }}>
          Tours Management
        </Typography>

        {/* Search field moved here */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flex: 1, mx: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by name, location or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.54)' }} />
                </InputAdornment>
              ),
              sx: {
                color: darkMode ? '#fff' : 'inherit',
                bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                },
              },
            }}
          />
        </Box>
      </Box>

      <Paper
        sx={{
          mb: 3,
          bgcolor: darkMode ? '#1e1e1e' : '#fff',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: accentColor,
            },
            '& .MuiTab-root': {
              color: darkMode ? '#aaa' : 'rgba(0, 0, 0, 0.6)',
              '&.Mui-selected': {
                color: accentColor,
              },
            },
          }}
        >
          {accommodationTypes.map((type) => (
            <Tab
              key={type.value}
              label={type.label}
              value={type.value}
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Paper>

      {accommodationsError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading tours: {accommodationsError}
        </Alert>
      )}

      {accommodationsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Suspense fallback={<CircularProgress sx={{ color: accentColor }} />}>
            <ToursTableSkeleton />
          </Suspense>
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              mb: 2,
              bgcolor: darkMode ? '#121212' : '#fff',
              boxShadow: darkMode ? '0 4px 8px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.1)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Table
              sx={{
                borderCollapse: 'separate',
                borderSpacing: 0,
              }}
            >
              <TableHead>
                <TableRow sx={{ bgcolor: darkMode ? '#1e1e1e' : '#f5f5f5' }}>
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                      width: '60px',
                    }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAccommodations.length > 0 ? (
                  filteredAccommodations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tour, index) => (
                      <TableRow
                        key={tour.id}
                        hover
                        sx={{
                          bgcolor: darkMode ? '#121212' : '#fff',
                          '&:hover': {
                            bgcolor: darkMode ? '#1a1a1a' : 'rgba(0,0,0,0.02)',
                          },
                          borderBottom: darkMode ? 'none' : undefined,
                        }}
                      >
                        <TableCell
                          sx={{
                            color: darkMode ? '#fff' : 'inherit',
                            borderBottom: darkMode ? '1px solid #333' : undefined,
                          }}
                        >
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: darkMode ? '#fff' : 'inherit',
                            borderBottom: darkMode ? '1px solid #333' : undefined,
                          }}
                        >
                          {tour.campName}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: darkMode ? '#fff' : 'inherit',
                            borderBottom: darkMode ? '1px solid #333' : undefined,
                          }}
                        >
                          {tour.address.tal}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: darkMode ? '#fff' : 'inherit',
                            borderBottom: darkMode ? '1px solid #333' : undefined,
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: darkMode ? 'rgba(16, 185, 129, 0.15)' : '#e8f5e9',
                              color: darkMode ? '#34d399' : '#2e7d32',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              display: 'inline-block',
                              fontWeight: 500,
                            }}
                          >
                            ₹{tour.prices.afterDiscount}
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            color: darkMode ? '#fff' : 'inherit',
                            borderBottom: darkMode ? '1px solid #333' : undefined,
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: darkMode ? 'rgba(59, 130, 246, 0.15)' : '#e3f2fd',
                              color: darkMode ? '#60a5fa' : '#1976d2',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              display: 'inline-block',
                              fontWeight: 500,
                            }}
                          >
                            {tour.type}
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: darkMode ? '1px solid #333' : undefined,
                          }}
                        >
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEdit(tour)}
                              size="small"
                              sx={{ color: darkMode ? '#aaa' : 'inherit' }}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(tour.id || tour._id)}
                              size="small"
                              sx={{ color: darkMode ? '#f87171' : '#d32f2f' }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      sx={{
                        color: darkMode ? '#aaa' : 'inherit',
                        borderBottom: darkMode ? 'none' : undefined,
                      }}
                    >
                      {searchTerm ? 'No matching tours found' : 'No tours found'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Add TablePagination component */}
          <TablePagination
            component={Paper}
            count={filteredAccommodations.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={
              filteredAccommodations.length > 100
                ? [10, 20, 50, 100]
                : filteredAccommodations.length > 50
                  ? [8, 15, 25, 50]
                  : [8, 16, 24, 32]
            }
            sx={{
              bgcolor: darkMode ? '#121212' : '#fff',
              color: darkMode ? '#fff' : 'inherit',
              borderRadius: 2,
              '.MuiTablePagination-selectIcon': {
                color: darkMode ? '#aaa' : 'inherit',
              },
              '.MuiTablePagination-actions': {
                color: darkMode ? '#aaa' : 'inherit',
              },
            }}
          />
        </>
      )}

      {/* Add New Tour Dialog */}
      <Dialog
        open={openNewDialog}
        onClose={handleCloseNewDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: darkMode ? '#1e1e1e' : '#fff',
            color: darkMode ? '#fff' : 'inherit',
          },
        }}
      >
        <DialogTitle sx={{ color: darkMode ? '#fff' : 'inherit' }}>Add New Tour</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={newTourForm.campName}
              onChange={(e) => setNewTourForm({ ...newTourForm, campName: e.target.value })}
              InputLabelProps={{
                sx: { color: darkMode ? '#aaa' : 'inherit' },
              }}
              InputProps={{
                sx: {
                  color: darkMode ? '#fff' : 'inherit',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Price"
              value={newTourForm.price}
              onChange={(e) => setNewTourForm({ ...newTourForm, price: e.target.value })}
              InputLabelProps={{
                sx: { color: darkMode ? '#aaa' : 'inherit' },
              }}
              InputProps={{
                sx: {
                  color: darkMode ? '#fff' : 'inherit',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Location"
              value={newTourForm.location}
              onChange={(e) => setNewTourForm({ ...newTourForm, location: e.target.value })}
              InputLabelProps={{
                sx: { color: darkMode ? '#aaa' : 'inherit' },
              }}
              InputProps={{
                sx: {
                  color: darkMode ? '#fff' : 'inherit',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                  },
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewDialog} sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveNewTour}
            variant="contained"
            sx={{
              bgcolor: accentColor,
              '&:hover': { bgcolor: accentColor, filter: 'brightness(0.9)' },
              textTransform: 'none',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ToursAdmin;
