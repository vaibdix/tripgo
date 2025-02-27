import React, { useState, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Avatar,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Home as HomeIcon,
  BarChart as BarChartIcon,
  People as PeopleIcon,
  ShoppingBag as ShoppingBagIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

import UsersAdmin from './components/UsersAdmin';
import Analytics from './components/Analytics';
import ToursAdmin from './components/ToursAdmin';

const drawerWidth = 240;

const staticUser = { username: 'Admin', role: 'admin', picture: null };
const staticUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'inactive' },
];

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/admin/signin', { replace: true });
  };

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#161616', color: 'white' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #424242',
        }}
      >
        <Typography
          variant="h6"
          component={RouterLink}
          to="/admin"
          sx={{ ml: 2, textDecoration: 'none', color: 'inherit' }}
        >
          GreenCorner
        </Typography>
        <IconButton sx={{ display: { lg: 'none' } }} onClick={handleDrawerToggle} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItemButton
          component={RouterLink}
          to="/admin"
          selected={location.pathname === '/admin'}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: 'inherit' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          to="/admin/analytics"
          selected={location.pathname === '/admin/analytics'}
        >
          <ListItemIcon>
            <BarChartIcon sx={{ color: 'inherit' }} />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          to="/admin/tours"
          selected={location.pathname === '/admin/tours'}
        >
          <ListItemIcon>
            <ShoppingBagIcon sx={{ color: 'inherit' }} />
          </ListItemIcon>
          <ListItemText primary="Tours" />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          to="/admin/users"
          selected={location.pathname === '/admin/users'}
        >
          <ListItemIcon>
            <PeopleIcon sx={{ color: 'inherit' }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </List>
      <Divider sx={{ bgcolor: '#424242' }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#B0BEC5' }}>
          Tools
        </Typography>
        <List>
          <ListItemButton
            component={RouterLink}
            to="/admin/settings"
            selected={location.pathname === '/admin/settings'}
          >
            <ListItemIcon>
              <SettingsIcon sx={{ color: 'inherit' }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'inherit' }} />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'rgba(202, 204, 226, 0.4)' }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, ml: { lg: `${drawerWidth}px` } }}>
        <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Welcome Back, {staticUser.username}!
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ display: { xs: 'none', sm: 'block' } }}
              />
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                <Avatar>{staticUser.username.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2 }}>
          <Routes>
            <Route path="" element={<Analytics />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="tours" element={<ToursAdmin />} />
            <Route path="users" element={<UsersAdmin initialUsers={staticUsers} />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
