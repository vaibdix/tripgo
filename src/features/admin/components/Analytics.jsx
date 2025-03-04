import useAccommodationStore from '../../../store/accommodationStore';
import { useTheme } from './ThemeContext';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    bookings: [],
    revenue: [],
    accommodationTypes: {},
    userStats: {},
  });

  // Add theme context
  const { darkMode, accentColor, colors } = useTheme();

  const { fetchAccommodations, fetchUsers } = useAccommodationStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all accommodation types
        const tents = await fetchAccommodations('tents');
        const cottages = await fetchAccommodations('cottages');
        const farmhouses = await fetchAccommodations('farmhouses');
        const hotels = await fetchAccommodations('hotels');
        const homestays = await fetchAccommodations('homestays');
        const treehouses = await fetchAccommodations('treehouses');
        const villas = await fetchAccommodations('villas');

        // Fetch users
        const users = await fetchUsers();

        // Process data for analytics
        const accommodationTypes = {
          tents: tents.length,
          cottages: cottages.length,
          farmhouses: farmhouses.length,
          hotels: hotels.length,
          homestays: homestays.length,
          treehouses: treehouses.length,
          villas: villas.length,
        };

        // Generate mock booking data (in a real app, this would come from the API)
        const bookings = generateMockBookingData();
        const revenue = generateMockRevenueData();

        // User statistics
        const userStats = {
          total: users.length,
          admin: users.filter((user) => user.admin).length,
          regular: users.filter((user) => !user.admin).length,
          active: Math.floor(users.length * 0.8), // Mock active users (80%)
          new: Math.floor(users.length * 0.2), // Mock new users (20%)
        };

        setAnalyticsData({
          bookings,
          revenue,
          accommodationTypes,
          userStats,
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchAccommodations, fetchUsers]);

  // Helper function to generate mock booking data
  const generateMockBookingData = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return {
      labels: months,
      datasets: [
        {
          label: 'Bookings',
          data: months.map(() => Math.floor(Math.random() * 50) + 20),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.3,
        },
      ],
    };
  };

  // Helper function to generate mock revenue data
  const generateMockRevenueData = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return {
      labels: months,
      datasets: [
        {
          label: 'Revenue (₹)',
          data: months.map(() => Math.floor(Math.random() * 100000) + 40000),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.3,
        },
      ],
    };
  };

  // Prepare accommodation type data for chart
  const accommodationTypeData = {
    labels: Object.keys(analyticsData.accommodationTypes).map(
      (type) => type.charAt(0).toUpperCase() + type.slice(1)
    ),
    datasets: [
      {
        label: 'Number of Properties',
        data: Object.values(analyticsData.accommodationTypes),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // User statistics data for chart
  const userStatsData = {
    labels: ['Admin Users', 'Regular Users'],
    datasets: [
      {
        label: 'User Types',
        data: [analyticsData.userStats.admin || 0, analyticsData.userStats.regular || 0],
        backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Charts options with dark mode styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? colors.text : undefined,
          font: {
            family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? colors.paper : undefined,
        titleColor: darkMode ? colors.text : undefined,
        bodyColor: darkMode ? colors.textSecondary : undefined,
        borderColor: darkMode ? colors.divider : undefined,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? colors.divider : undefined,
        },
        ticks: {
          color: darkMode ? colors.textSecondary : undefined,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? colors.divider : undefined,
        },
        ticks: {
          color: darkMode ? colors.textSecondary : undefined,
        },
      },
    },
  };

  // Doughnut chart options
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: darkMode ? colors.text : undefined,
          font: {
            family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? colors.paper : undefined,
        titleColor: darkMode ? colors.text : undefined,
        bodyColor: darkMode ? colors.textSecondary : undefined,
        borderColor: darkMode ? colors.divider : undefined,
        borderWidth: 1,
      },
    },
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          bgcolor: darkMode ? colors.background : undefined,
        }}
      >
        <CircularProgress sx={{ color: accentColor }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        color: darkMode ? colors.text : undefined,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 600, color: darkMode ? colors.text : undefined }}
      >
        Analytics Overview
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              bgcolor: darkMode ? '#1e1e1e' : undefined,
              color: darkMode ? colors.text : undefined,
              boxShadow: darkMode ? colors.card.shadow : '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                color={darkMode ? colors.textSecondary : 'text.secondary'}
                gutterBottom
              >
                Total Properties
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: 'bold', color: darkMode ? colors.text : undefined }}
              >
                {Object.values(analyticsData.accommodationTypes).reduce((a, b) => a + b, 0)}
              </Typography>
              <Typography
                variant="body2"
                color={darkMode ? colors.textSecondary : 'text.secondary'}
              >
                Across all categories
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              bgcolor: darkMode ? '#1e1e1e' : undefined,
              color: darkMode ? colors.text : undefined,
              boxShadow: darkMode ? colors.card.shadow : '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                color={darkMode ? colors.textSecondary : 'text.secondary'}
                gutterBottom
              >
                Total Users
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: 'bold', color: darkMode ? colors.text : undefined }}
              >
                {analyticsData.userStats.total || 0}
              </Typography>
              <Typography
                variant="body2"
                color={darkMode ? colors.textSecondary : 'text.secondary'}
              >
                {analyticsData.userStats.new || 0} new this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              bgcolor: darkMode ? '#1e1e1e' : undefined,
              color: darkMode ? colors.text : undefined,
              boxShadow: darkMode ? colors.card.shadow : '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                color={darkMode ? colors.textSecondary : 'text.secondary'}
                gutterBottom
              >
                Monthly Bookings
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: 'bold', color: darkMode ? colors.text : undefined }}
              >
                {analyticsData.bookings.datasets?.[0]?.data?.[new Date().getMonth()] || 0}
              </Typography>
              <Typography
                variant="body2"
                color={darkMode ? colors.textSecondary : 'text.secondary'}
              >
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              bgcolor: darkMode ? '#1e1e1e' : undefined,
              color: darkMode ? colors.text : undefined,
              boxShadow: darkMode ? colors.card.shadow : '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                color={darkMode ? colors.textSecondary : 'text.secondary'}
                gutterBottom
              >
                Monthly Revenue
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: 'bold', color: darkMode ? colors.text : undefined }}
              >
                ₹
                {(
                  analyticsData.revenue.datasets?.[0]?.data?.[new Date().getMonth()] || 0
                ).toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                color={darkMode ? colors.textSecondary : 'text.secondary'}
              >
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              bgcolor: darkMode ? '#1e1e1e' : undefined,
              color: darkMode ? colors.text : undefined,
              boxShadow: darkMode ? colors.card.shadow : '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 500, color: darkMode ? colors.text : undefined }}
            >
              Booking Trends (12 Months)
            </Typography>
            <Line data={analyticsData.bookings} options={chartOptions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              bgcolor: darkMode ? '#1e1e1e' : undefined,
              color: darkMode ? colors.text : undefined,
              boxShadow: darkMode ? colors.card.shadow : '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 500, color: darkMode ? colors.text : undefined }}
            >
              Property Distribution
            </Typography>
            <Doughnut data={accommodationTypeData} options={doughnutOptions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              bgcolor: darkMode ? '#1e1e1e' : undefined,
              color: darkMode ? colors.text : undefined,
              boxShadow: darkMode ? colors.card.shadow : '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 500, color: darkMode ? colors.text : undefined }}
            >
              Revenue Trends (12 Months)
            </Typography>
            <Line data={analyticsData.revenue} options={chartOptions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              bgcolor: darkMode ? '#1e1e1e' : undefined,
              color: darkMode ? colors.text : undefined,
              boxShadow: darkMode ? colors.card.shadow : '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 500, color: darkMode ? colors.text : undefined }}
            >
              User Distribution
            </Typography>
            <Doughnut data={userStatsData} options={doughnutOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
