import useAccommodationStore from '../../../../store/accommodationStore';
import { useTheme as useCustomTheme } from '../ThemeContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

const UserDialog = ({ open, onClose, selectedUser }) => {
  const { darkMode, accentColor } = useCustomTheme();
  const { addUser, updateUser } = useAccommodationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    admin: false,
    status: 'active',
  });

  useEffect(() => {
    if (selectedUser) {
      setUserForm({ ...selectedUser, admin: !!selectedUser.admin });
    } else {
      setUserForm({ name: '', email: '', admin: false, status: 'active' });
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (selectedUser) {
        const userId = selectedUser.id || selectedUser._id;
        await updateUser(userId, userForm);
      } else {
        await addUser(userForm);
      }
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: darkMode ? '#1e1e1e' : '#fff',
          color: darkMode ? '#fff' : 'inherit',
        },
      }}
    >
      <DialogTitle sx={{ color: darkMode ? '#fff' : 'inherit' }}>
        {selectedUser ? 'Edit User' : 'Add New User'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Add form fields here with disabled state when isSubmitting */}
          <TextField
            disabled={isSubmitting}
            // ... other props
          />
          {/* ... other form fields ... */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isSubmitting}
          sx={{ color: darkMode ? '#aaa' : 'inherit' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            bgcolor: accentColor,
            '&:hover': { bgcolor: accentColor, filter: 'brightness(0.9)' },
            textTransform: 'none',
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: '#fff' }} />
          ) : selectedUser ? (
            'Update'
          ) : (
            'Add'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
