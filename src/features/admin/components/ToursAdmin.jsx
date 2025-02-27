import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import useAccommodationStore from '../../../store/accommodationStore';

const ToursAdmin = () => {
  const { accommodations, fetchAccommodations } = useAccommodationStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [editForm, setEditForm] = useState({
    campName: '',
    price: '',
    location: '',
  });

  useEffect(() => {
    fetchAccommodations('all');
  }, [fetchAccommodations]);

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
    // Implement save functionality
    console.log('Saving:', editForm);
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Tours Management</Typography>
        <Button variant="contained" color="primary">
          Add New Tour
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accommodations.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell>{tour.campName}</TableCell>
                <TableCell>{tour.address.tal}</TableCell>
                <TableCell>₹{tour.prices.afterDiscount}</TableCell>
                <TableCell>{tour.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(tour)}>
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Tour</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={editForm.campName}
            onChange={(e) => setEditForm({ ...editForm, campName: e.target.value })}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            value={editForm.price}
            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Location"
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ToursAdmin;