import {
  Box,
  Paper,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ToursTableSkeleton = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Skeleton width={200} height={40} />
        <Skeleton width={250} height={40} />
        <Skeleton width={150} height={40} />
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Tabs value={0} variant="scrollable" scrollButtons="auto">
          {[...Array(4)].map((_, index) => (
            <Tab key={index} label={<Skeleton width={80} height={30} />} />
          ))}
        </Tabs>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['#', 'Name', 'Location', 'Price', 'Type', 'Actions'].map((header, index) => (
                <TableCell key={index}>
                  <Skeleton width={80} height={20} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {[...Array(6)].map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton width="100%" height={30} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ToursTableSkeleton;
