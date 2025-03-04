import { useTheme as useCustomTheme } from '../ThemeContext';
import UserTableBody from './UserTableBody';
import UserTableHeader from './UserTableHeader';
import { Box, Paper, Table, TableContainer, TablePagination, Alert } from '@mui/material';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserTable = ({ users, loading, error, onEdit }) => {
  const { darkMode } = useCustomTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading users: {error}
      </Alert>
    );
  }

  return (
    <>
      <UserTableHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        disabled={loading}
      />

      <Suspense
        fallback={
          <Box sx={{ mb: 2 }}>
            <Skeleton height={50} />
            <Skeleton height={400} />
          </Box>
        }
      >
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
          <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <UserTableBody
              users={users}
              page={page}
              rowsPerPage={rowsPerPage}
              searchQuery={searchQuery}
              sortConfig={sortConfig}
              onEdit={onEdit}
              loading={loading}
            />
          </Table>
        </TableContainer>
      </Suspense>

      <TablePagination
        component={Paper}
        count={loading ? 0 : users.length}
        page={loading ? 0 : page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        disabled={loading}
        sx={{
          bgcolor: darkMode ? '#121212' : '#fff',
          color: darkMode ? '#fff' : 'inherit',
          borderRadius: 2,
          '.MuiTablePagination-selectIcon': { color: darkMode ? '#aaa' : 'inherit' },
          '.MuiTablePagination-actions': { color: darkMode ? '#aaa' : 'inherit' },
          opacity: loading ? 0.7 : 1,
        }}
      />
    </>
  );
};

export default UserTable;
