import useAccommodationStore from '../../../../store/accommodationStore';
import { useTheme as useCustomTheme } from '../ThemeContext';
import { Add as AddIcon } from '@mui/icons-material';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import React, { useState, useEffect, Suspense } from 'react';

// Lazy load components
const UserTable = React.lazy(() => import('./UserTable'));
const UserDialog = React.lazy(() => import('./UserDialog'));

const LoadingFallback = () => (
  <Box sx={{ p: 3 }}>
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
      <Skeleton width={200} height={40} />
      <Skeleton width={120} height={40} />
    </Box>
    <Skeleton height={50} />
    <Skeleton height={400} />
  </Box>
);

const UsersAdmin = () => {
  const { darkMode, accentColor } = useCustomTheme();
  const { users, usersLoading, usersError, fetchUsers } = useAccommodationStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenDialog = (user = null) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: darkMode ? '#fff' : 'inherit' }}>
          Users Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          disabled={usersLoading}
          sx={{
            bgcolor: accentColor,
            '&:hover': { bgcolor: accentColor, filter: 'brightness(0.9)' },
            textTransform: 'none',
            opacity: usersLoading ? 0.7 : 1,
          }}
        >
          Add New User
        </Button>
      </Box>

      <Suspense fallback={<LoadingFallback />}>
        <UserTable
          users={users}
          loading={usersLoading}
          error={usersError}
          onEdit={handleOpenDialog}
        />
      </Suspense>

      <Suspense fallback={null}>
        <UserDialog open={openDialog} onClose={handleCloseDialog} selectedUser={selectedUser} />
      </Suspense>
    </Box>
  );
};

export default UsersAdmin;
