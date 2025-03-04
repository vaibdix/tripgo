import useAccommodationStore from '../../../store/accommodationStore';
import { useTheme as useCustomTheme } from './ThemeContext';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  SortByAlpha as SortByAlphaIcon,
  FormatListNumbered as FormatListNumberedIcon,
} from '@mui/icons-material';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Tooltip,
  CircularProgress,
  Alert,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

const UsersAdmin = () => {
  const { darkMode, accentColor } = useCustomTheme();
  const { users, usersLoading, usersError, fetchUsers, addUser, updateUser, deleteUser } =
    useAccommodationStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', admin: false, status: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
    handleSortMenuClose();
    setPage(0);
  };
  const filteredAndSortedUsers = React.useMemo(() => {
    const filtered = users.filter((user) => {
      const query = searchQuery.toLowerCase();
      return user.name?.toLowerCase().includes(query) || user.email?.toLowerCase().includes(query);
    });
    return [...filtered].sort((a, b) => {
      if (sortConfig.key === 'id') {
        const idA = a.id || a._id || '';
        const idB = b.id || b._id || '';
        if (sortConfig.direction === 'asc') {
          return idA.localeCompare(idB);
        } else {
          return idB.localeCompare(idA);
        }
      } else if (sortConfig.key === 'number') {
        const indexA = users.findIndex((u) => (u.id || u._id) === (a.id || a._id));
        const indexB = users.findIndex((u) => (u.id || u._id) === (b.id || b._id));
        if (sortConfig.direction === 'asc') {
          return indexA - indexB;
        } else {
          return indexB - indexA;
        }
      } else {
        const nameA = a.name || '';
        const nameB = b.name || '';
        if (sortConfig.direction === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      }
    });
  }, [users, searchQuery, sortConfig]);
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return user.name?.toLowerCase().includes(query) || user.email?.toLowerCase().includes(query);
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpenDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setUserForm({ ...user, admin: !!user.admin });
    } else {
      setSelectedUser(null);
      setUserForm({ name: '', email: '', admin: false, status: 'active' });
    }
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSubmit = async () => {
    if (selectedUser) {
      const userId = selectedUser.id || selectedUser._id;
      await updateUser(userId, userForm);
    } else {
      await addUser(userForm);
    }
    handleCloseDialog();
  };
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
    }
  };
  return (
    <Box sx={{ p: 3 }}>
      {' '}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        {' '}
        <Typography variant="h4" sx={{ fontWeight: 600, color: darkMode ? '#fff' : 'inherit' }}>
          {' '}
          Users Management{' '}
        </Typography>{' '}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            bgcolor: accentColor,
            '&:hover': { bgcolor: accentColor, filter: 'brightness(0.9)' },
            textTransform: 'none',
          }}
        >
          {' '}
          Add New User{' '}
        </Button>{' '}
      </Box>{' '}
      {}{' '}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        {' '}
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
                {' '}
                <SearchIcon sx={{ color: darkMode ? 'rgba(255,255,255,0.7)' : 'inherit' }} />{' '}
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
        />{' '}
        {}{' '}
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleSortMenuOpen}
          sx={{
            borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
            color: darkMode ? '#fff' : 'inherit',
            '&:hover': {
              borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
              bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            },
            minWidth: '120px',
          }}
        >
          {' '}
          Sort{' '}
        </Button>{' '}
        {}{' '}
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
          {' '}
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
            {' '}
            <ListItemIcon sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
              {' '}
              <SortByAlphaIcon fontSize="small" />{' '}
            </ListItemIcon>{' '}
            <Typography variant="body2">Name (A-Z)</Typography>{' '}
          </MenuItem>{' '}
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
            {' '}
            <ListItemIcon sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
              {' '}
              <SortByAlphaIcon fontSize="small" sx={{ transform: 'scaleY(-1)' }} />{' '}
            </ListItemIcon>{' '}
            <Typography variant="body2">Name (Z-A)</Typography>{' '}
          </MenuItem>{' '}
          {}{' '}
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
            {' '}
            <ListItemIcon sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
              {' '}
              <FormatListNumberedIcon fontSize="small" />{' '}
            </ListItemIcon>{' '}
            <Typography variant="body2">Row Number (Ascending)</Typography>{' '}
          </MenuItem>{' '}
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
            {' '}
            <ListItemIcon sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
              {' '}
              <FormatListNumberedIcon fontSize="small" sx={{ transform: 'scaleY(-1)' }} />{' '}
            </ListItemIcon>{' '}
            <Typography variant="body2">Row Number (Descending)</Typography>{' '}
          </MenuItem>{' '}
        </Menu>{' '}
      </Box>{' '}
      {usersError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {' '}
          Error loading users: {usersError}{' '}
        </Alert>
      )}{' '}
      {usersLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          {' '}
          <CircularProgress sx={{ color: accentColor }} />{' '}
        </Box>
      ) : (
        <>
          {' '}
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
            {' '}
            <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              {' '}
              <TableHead>
                {' '}
                <TableRow sx={{ bgcolor: darkMode ? '#1e1e1e' : '#f5f5f5' }}>
                  {' '}
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                      width: '60px',
                    }}
                  >
                    {' '}
                    #{' '}
                  </TableCell>{' '}
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    Name{' '}
                  </TableCell>{' '}
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    Email{' '}
                  </TableCell>{' '}
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    Admin Status{' '}
                  </TableCell>{' '}
                  <TableCell
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    Status{' '}
                  </TableCell>{' '}
                  <TableCell
                    align="right"
                    sx={{
                      color: darkMode ? '#fff' : 'inherit',
                      borderBottom: darkMode ? '1px solid #333' : undefined,
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    Actions{' '}
                  </TableCell>{' '}
                </TableRow>{' '}
              </TableHead>{' '}
              <TableBody>
                {' '}
                {filteredAndSortedUsers.length > 0 ? (
                  filteredAndSortedUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => (
                      <TableRow
                        key={user.id || user._id}
                        hover
                        sx={{
                          bgcolor: darkMode ? '#121212' : '#fff',
                          '&:hover': { bgcolor: darkMode ? '#1a1a1a' : 'rgba(0,0,0,0.02)' },
                          borderBottom: darkMode ? 'none' : undefined,
                        }}
                      >
                        {' '}
                        <TableCell
                          sx={{
                            color: darkMode ? '#fff' : 'inherit',
                            borderBottom: darkMode ? '1px solid #333' : undefined,
                          }}
                        >
                          {' '}
                          {page * rowsPerPage + index + 1}{' '}
                        </TableCell>{' '}
                        <TableCell
                          sx={{
                            color: darkMode ? '#fff' : 'inherit',
                            borderBottom: darkMode ? '1px solid #333' : undefined,
                          }}
                        >
                          {' '}
                          {user.name}{' '}
                        </TableCell>{' '}
                        <TableCell
                          sx={{
                            color: darkMode ? '#fff' : 'inherit',
                            borderBottom: darkMode ? '1px solid #333' : undefined,
                          }}
                        >
                          {' '}
                          {user.email}{' '}
                        </TableCell>{' '}
                        <TableCell sx={{ borderBottom: darkMode ? '1px solid #333' : undefined }}>
                          {' '}
                          <Box
                            sx={{
                              bgcolor: user.admin
                                ? darkMode
                                  ? 'rgba(59, 130, 246, 0.15)'
                                  : '#e3f2fd'
                                : darkMode
                                  ? 'rgba(107, 114, 128, 0.15)'
                                  : '#f5f5f5',
                              color: user.admin
                                ? darkMode
                                  ? '#60a5fa'
                                  : '#1976d2'
                                : darkMode
                                  ? '#9ca3af'
                                  : 'text.secondary',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              display: 'inline-block',
                              fontWeight: 500,
                            }}
                          >
                            {' '}
                            {user.admin ? 'Admin' : 'User'}{' '}
                          </Box>{' '}
                        </TableCell>{' '}
                        <TableCell sx={{ borderBottom: darkMode ? '1px solid #333' : undefined }}>
                          {' '}
                          <Box
                            sx={{
                              bgcolor:
                                user.status === 'active'
                                  ? darkMode
                                    ? 'rgba(239, 68, 68, 0.15)'
                                    : '#ffebee'
                                  : darkMode
                                    ? 'rgba(239, 68, 68, 0.15)'
                                    : '#ffebee',
                              color:
                                user.status === 'active'
                                  ? darkMode
                                    ? '#f87171'
                                    : '#c62828'
                                  : darkMode
                                    ? '#f87171'
                                    : '#c62828',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              display: 'inline-block',
                              fontWeight: 500,
                            }}
                          >
                            {' '}
                            {user.status || 'active'}{' '}
                          </Box>{' '}
                        </TableCell>{' '}
                        <TableCell
                          align="right"
                          sx={{ borderBottom: darkMode ? '1px solid #333' : undefined }}
                        >
                          {' '}
                          <Tooltip title="Edit">
                            {' '}
                            <IconButton
                              onClick={() => handleOpenDialog(user)}
                              size="small"
                              sx={{ color: darkMode ? '#aaa' : 'inherit' }}
                            >
                              {' '}
                              <EditIcon />{' '}
                            </IconButton>{' '}
                          </Tooltip>{' '}
                          <Tooltip title="Delete">
                            {' '}
                            <IconButton
                              onClick={() => handleDelete(user.id || user._id)}
                              size="small"
                              sx={{ color: darkMode ? '#f87171' : '#d32f2f' }}
                            >
                              {' '}
                              <DeleteIcon />{' '}
                            </IconButton>{' '}
                          </Tooltip>{' '}
                        </TableCell>{' '}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    {' '}
                    <TableCell
                      colSpan={6}
                      align="center"
                      sx={{
                        color: darkMode ? '#aaa' : 'inherit',
                        borderBottom: darkMode ? 'none' : undefined,
                      }}
                    >
                      {' '}
                      No users found{' '}
                    </TableCell>{' '}
                  </TableRow>
                )}{' '}
              </TableBody>{' '}
            </Table>{' '}
          </TableContainer>{' '}
          <TablePagination
            component={Paper}
            count={filteredAndSortedUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              bgcolor: darkMode ? '#121212' : '#fff',
              color: darkMode ? '#fff' : 'inherit',
              borderRadius: 2,
              '.MuiTablePagination-selectIcon': { color: darkMode ? '#aaa' : 'inherit' },
              '.MuiTablePagination-actions': { color: darkMode ? '#aaa' : 'inherit' },
            }}
          />{' '}
        </>
      )}{' '}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { bgcolor: darkMode ? '#1e1e1e' : '#fff', color: darkMode ? '#fff' : 'inherit' },
        }}
      >
        {' '}
        <DialogTitle sx={{ color: darkMode ? '#fff' : 'inherit' }}>
          {' '}
          {selectedUser ? 'Edit User' : 'Add New User'}{' '}
        </DialogTitle>{' '}
        <DialogContent>
          {' '}
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {' '}
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={userForm.name}
              onChange={handleInputChange}
              InputLabelProps={{ sx: { color: darkMode ? '#aaa' : 'inherit' } }}
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
            />{' '}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userForm.email}
              onChange={handleInputChange}
              InputLabelProps={{ sx: { color: darkMode ? '#aaa' : 'inherit' } }}
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
            />{' '}
            <FormControlLabel
              control={
                <Checkbox
                  name="admin"
                  checked={!!userForm.admin}
                  onChange={handleInputChange}
                  sx={{
                    color: darkMode ? '#aaa' : 'inherit',
                    '&.Mui-checked': { color: accentColor },
                  }}
                />
              }
              label="Admin Privileges"
              sx={{ color: darkMode ? '#fff' : 'inherit' }}
            />{' '}
            <TextField
              fullWidth
              label="Status"
              name="status"
              select
              value={userForm.status || 'active'}
              onChange={handleInputChange}
              SelectProps={{ native: true, sx: { color: darkMode ? '#fff' : 'inherit' } }}
              InputLabelProps={{ sx: { color: darkMode ? '#aaa' : 'inherit' } }}
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
            >
              {' '}
              <option value="active">Active</option> <option value="inactive">Inactive</option>{' '}
            </TextField>{' '}
          </Box>{' '}
        </DialogContent>{' '}
        <DialogActions>
          {' '}
          <Button onClick={handleCloseDialog} sx={{ color: darkMode ? '#aaa' : 'inherit' }}>
            {' '}
            Cancel{' '}
          </Button>{' '}
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: accentColor,
              '&:hover': { bgcolor: accentColor, filter: 'brightness(0.9)' },
              textTransform: 'none',
            }}
          >
            {' '}
            {selectedUser ? 'Update' : 'Add'}{' '}
          </Button>{' '}
        </DialogActions>{' '}
      </Dialog>{' '}
    </Box>
  );
};
export default UsersAdmin;
