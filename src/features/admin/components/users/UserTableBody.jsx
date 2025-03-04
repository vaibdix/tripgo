import useAccommodationStore from '../../../../store/accommodationStore';
import { useTheme as useCustomTheme } from '../ThemeContext';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { TableHead, TableBody, TableRow, TableCell, IconButton, Tooltip, Box } from '@mui/material';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserTableBody = ({ users, page, rowsPerPage, searchQuery, sortConfig, onEdit, loading }) => {
  const { darkMode } = useCustomTheme();
  const { deleteUser } = useAccommodationStore();

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
    }
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
        return sortConfig.direction === 'asc' ? idA.localeCompare(idB) : idB.localeCompare(idA);
      } else if (sortConfig.key === 'number') {
        const indexA = users.findIndex((u) => (u.id || u._id) === (a.id || a._id));
        const indexB = users.findIndex((u) => (u.id || u._id) === (b.id || b._id));
        return sortConfig.direction === 'asc' ? indexA - indexB : indexB - indexA;
      } else {
        const nameA = a.name || '';
        const nameB = b.name || '';
        return sortConfig.direction === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
    });
  }, [users, searchQuery, sortConfig]);

  const LoadingRow = () => (
    <TableRow>
      <TableCell sx={{ borderBottom: darkMode ? '1px solid #333' : undefined }}>
        <Skeleton
          baseColor={darkMode ? '#333' : '#f0f0f0'}
          highlightColor={darkMode ? '#444' : '#f8f8f8'}
        />
      </TableCell>
      <TableCell sx={{ borderBottom: darkMode ? '1px solid #333' : undefined }}>
        <Skeleton
          baseColor={darkMode ? '#333' : '#f0f0f0'}
          highlightColor={darkMode ? '#444' : '#f8f8f8'}
        />
      </TableCell>
      <TableCell sx={{ borderBottom: darkMode ? '1px solid #333' : undefined }}>
        <Skeleton
          baseColor={darkMode ? '#333' : '#f0f0f0'}
          highlightColor={darkMode ? '#444' : '#f8f8f8'}
        />
      </TableCell>
      <TableCell sx={{ borderBottom: darkMode ? '1px solid #333' : undefined }}>
        <Skeleton
          width={80}
          baseColor={darkMode ? '#333' : '#f0f0f0'}
          highlightColor={darkMode ? '#444' : '#f8f8f8'}
        />
      </TableCell>
      <TableCell sx={{ borderBottom: darkMode ? '1px solid #333' : undefined }}>
        <Skeleton
          width={80}
          baseColor={darkMode ? '#333' : '#f0f0f0'}
          highlightColor={darkMode ? '#444' : '#f8f8f8'}
        />
      </TableCell>
      <TableCell align="right" sx={{ borderBottom: darkMode ? '1px solid #333' : undefined }}>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Skeleton
            circle
            width={32}
            height={32}
            baseColor={darkMode ? '#333' : '#f0f0f0'}
            highlightColor={darkMode ? '#444' : '#f8f8f8'}
          />
          <Skeleton
            circle
            width={32}
            height={32}
            baseColor={darkMode ? '#333' : '#f0f0f0'}
            highlightColor={darkMode ? '#444' : '#f8f8f8'}
          />
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <>
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
            Email
          </TableCell>
          <TableCell
            sx={{
              color: darkMode ? '#fff' : 'inherit',
              borderBottom: darkMode ? '1px solid #333' : undefined,
              fontWeight: 'bold',
            }}
          >
            Admin Status
          </TableCell>
          <TableCell
            sx={{
              color: darkMode ? '#fff' : 'inherit',
              borderBottom: darkMode ? '1px solid #333' : undefined,
              fontWeight: 'bold',
            }}
          >
            Status
          </TableCell>
          <TableCell
            align="right"
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
        {loading ? (
          Array.from({ length: rowsPerPage }).map((_, index) => <LoadingRow key={index} />)
        ) : filteredAndSortedUsers.length > 0 ? (
          filteredAndSortedUsers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => (
              <TableRow
                key={user.id || user._id}
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
                  {user.name}
                </TableCell>
                <TableCell
                  sx={{
                    color: darkMode ? '#fff' : 'inherit',
                    borderBottom: darkMode ? '1px solid #333' : undefined,
                  }}
                >
                  {user.email}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: darkMode ? '1px solid #333' : undefined,
                  }}
                >
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
                    {user.admin ? 'Admin' : 'User'}
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: darkMode ? '1px solid #333' : undefined,
                  }}
                >
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
                    {user.status || 'active'}
                  </Box>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    borderBottom: darkMode ? '1px solid #333' : undefined,
                  }}
                >
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => onEdit(user)}
                      size="small"
                      sx={{ color: darkMode ? '#aaa' : 'inherit' }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleDelete(user.id || user._id)}
                      size="small"
                      sx={{ color: darkMode ? '#f87171' : '#d32f2f' }}
                    >
                      <DeleteIcon />
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
              No users found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default UserTableBody;
