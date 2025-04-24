import useAuthStore from '../../store/authStore';
import Analytics from './components/Analytics';
import SettingsAdmin from './components/SettingsAdmin';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import ToursAdmin from './components/ToursAdmin';
import UsersAdmin from './components/UsersAdmin';
import {
  BarChart as BarChartIcon,
  People as PeopleIcon,
  ShoppingBag as ShoppingBagIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
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
  Tooltip,
} from '@mui/material';
import { PersonStandingIcon } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { PanelLeft } from 'lucide-react';
import { PanelRight } from 'lucide-react';
import React, { useState, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';

const expandedDrawerWidth = 240;
const collapsedDrawerWidth = 70;

const DashboardContent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const { darkMode, accentColor, toggleDarkMode } = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerCollapse = () => {
    setIsDrawerCollapsed(!isDrawerCollapsed);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={handleProfileMenuClose}>
        <ListItemIcon>
          <PersonStandingIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider sx={{ bgcolor: darkMode ? '#482a17' : 'rgba(0, 0, 0, 0.12)' }} />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <Box
      sx={{
        height: '100%',
        bgcolor: darkMode ? '#1e1e1e' : '#f8f8f8',
        color: darkMode ? '#fff' : '#333',
        width: isDrawerCollapsed ? collapsedDrawerWidth : expandedDrawerWidth,
        transition: 'width 0.2s ease-in-out',
        overflow: 'hidden',
        // borderRadius: '0 15px 15px 0',
        // boxShadow: darkMode ? '0 0 10px rgba(0,0,0,0.3)' : '0 0 10px rgba(0,0,0,0.05)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: `1px solid ${darkMode ? '#424242' : '#eaeaea'}`,
        }}
      >
        {!isDrawerCollapsed && (
          <Typography
            variant="h6"
            component={RouterLink}
            to="/admin"
            sx={{
              ml: 2,
              textDecoration: 'none',
              color: darkMode ? '#fff' : '#333',
              fontWeight: 600,
            }}
          >
            TripGo
          </Typography>
        )}
        <IconButton
          sx={{
            display: { xs: 'none', lg: 'flex' },
            ml: isDrawerCollapsed ? 'auto' : 0,
            mr: isDrawerCollapsed ? 'auto' : 0,
            color: '#666', // Darker icon color
          }}
          onClick={handleDrawerCollapse}
        >
          {isDrawerCollapsed ? <PanelRight /> : <PanelLeft />}
        </IconButton>
        <IconButton sx={{ display: { lg: 'none' }, color: '#666' }} onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ mt: 2 }}>
        {/* Dashboard menu item */}
        <Tooltip title="Dashboard" placement="right" disableHoverListener={!isDrawerCollapsed}>
          <ListItemButton
            component={RouterLink}
            to="/admin"
            selected={location.pathname === '/admin'}
            sx={{
              justifyContent: isDrawerCollapsed ? 'center' : 'flex-start',
              px: isDrawerCollapsed ? 2 : 3,
              py: 1,
              mx: 2,
              borderRadius: '8px',
              '&.Mui-selected': {
                bgcolor: darkMode ? `${accentColor}20` : `${accentColor}10`,
                color: accentColor,
              },
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: isDrawerCollapsed ? 0 : 40,
                color: location.pathname === '/admin' ? accentColor : darkMode ? '#aaa' : '#666',
              }}
            >
              <LayoutDashboard />
            </ListItemIcon>
            {!isDrawerCollapsed && (
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontWeight: location.pathname === '/admin' ? 600 : 400,
                  fontSize: '0.95rem',
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>

        {/* Analytics menu item */}
        <Tooltip title="Analytics" placement="right" disableHoverListener={!isDrawerCollapsed}>
          <ListItemButton
            component={RouterLink}
            to="/admin/analytics"
            selected={location.pathname === '/admin/analytics'}
            sx={{
              justifyContent: isDrawerCollapsed ? 'center' : 'flex-start',
              px: isDrawerCollapsed ? 2 : 3,
              py: 1,
              mx: 2,
              borderRadius: '8px',
              '&.Mui-selected': {
                bgcolor: darkMode ? `${accentColor}20` : `${accentColor}10`,
                color: accentColor,
              },
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: isDrawerCollapsed ? 0 : 40,
                color:
                  location.pathname === '/admin/analytics'
                    ? accentColor
                    : darkMode
                      ? '#aaa'
                      : '#666',
              }}
            >
              <BarChartIcon />
            </ListItemIcon>
            {!isDrawerCollapsed && (
              <ListItemText
                primary="Analytics"
                primaryTypographyProps={{
                  fontWeight: location.pathname === '/admin/analytics' ? 600 : 400,
                  fontSize: '0.95rem',
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>

        {/* Tours menu item */}
        <Tooltip title="Tours" placement="right" disableHoverListener={!isDrawerCollapsed}>
          <ListItemButton
            component={RouterLink}
            to="/admin/tours"
            selected={location.pathname === '/admin/tours'}
            sx={{
              justifyContent: isDrawerCollapsed ? 'center' : 'flex-start',
              px: isDrawerCollapsed ? 2 : 3,
              py: 1,
              mx: 2,
              borderRadius: '8px',
              '&.Mui-selected': {
                bgcolor: darkMode ? `${accentColor}20` : `${accentColor}10`,
                color: accentColor,
              },
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: isDrawerCollapsed ? 0 : 40,
                color:
                  location.pathname === '/admin/tours' ? accentColor : darkMode ? '#aaa' : '#666',
              }}
            >
              <ShoppingBagIcon />
            </ListItemIcon>
            {!isDrawerCollapsed && (
              <ListItemText
                primary="Tours"
                primaryTypographyProps={{
                  fontWeight: location.pathname === '/admin/tours' ? 600 : 400,
                  fontSize: '0.95rem',
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>

        {/* Users menu item */}
        <Tooltip title="Users" placement="right" disableHoverListener={!isDrawerCollapsed}>
          <ListItemButton
            component={RouterLink}
            to="/admin/users"
            selected={location.pathname === '/admin/users'}
            sx={{
              justifyContent: isDrawerCollapsed ? 'center' : 'flex-start',
              px: isDrawerCollapsed ? 2 : 3,
              py: 1,
              mx: 2,
              borderRadius: '8px',
              '&.Mui-selected': {
                bgcolor: darkMode ? `${accentColor}20` : `${accentColor}10`,
                color: accentColor,
              },
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: isDrawerCollapsed ? 0 : 40,
                color:
                  location.pathname === '/admin/users' ? accentColor : darkMode ? '#aaa' : '#666',
              }}
            >
              <PeopleIcon />
            </ListItemIcon>
            {!isDrawerCollapsed && (
              <ListItemText
                primary="Users"
                primaryTypographyProps={{
                  fontWeight: location.pathname === '/admin/users' ? 600 : 400,
                  fontSize: '0.95rem',
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </List>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          borderTop: `1px solid ${darkMode ? '#424242' : '#eaeaea'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: accentColor,
              width: 32,
              height: 32,
              fontSize: '0.875rem',
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </Avatar>
          {!isDrawerCollapsed && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {user?.name || 'Admin'}
              </Typography>
              <Typography variant="caption" sx={{ color: darkMode ? '#aaa' : '#666' }}>
                Administrator
              </Typography>
            </Box>
          )}
        </Box>

        {/* Settings and Logout icons */}
        {!isDrawerCollapsed && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              component={RouterLink}
              to="/admin/settings"
              sx={{
                color: darkMode ? '#aaa' : '#666',
                '&:hover': { color: accentColor },
              }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleLogout}
              sx={{
                color: darkMode ? '#aaa' : '#666',
                '&:hover': { color: '#f44336' },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* Only show logout icon when drawer is collapsed */}
        {isDrawerCollapsed && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <IconButton
              size="small"
              component={RouterLink}
              to="/admin/settings"
              sx={{
                color: darkMode ? '#aaa' : '#666',
                '&:hover': { color: accentColor },
              }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleLogout}
              sx={{
                color: darkMode ? '#aaa' : '#666',
                '&:hover': { color: '#f44336' },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );

  // Update the Drawer component styles to match
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'rgba(202, 204, 226, 0.4)' }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: expandedDrawerWidth,
            bgcolor: darkMode ? '#1e1e1e' : '#f8f8f8',
            // borderRadius: '0 15px 15px 0',
            overflow: 'hidden',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isDrawerCollapsed ? collapsedDrawerWidth : expandedDrawerWidth,
            transition: 'width 0.2s ease-in-out',
            overflowX: 'hidden',
            bgcolor: darkMode ? '#1e1e1e' : '#f8f8f8',
            // borderRadius: '0 15px 15px 0',
            overflow: 'hidden',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: {
            lg: isDrawerCollapsed ? `${collapsedDrawerWidth}px` : `${expandedDrawerWidth}px`,
          },
          transition: 'margin-left 0.2s ease-in-out',
          bgcolor: darkMode ? '#121212' : 'rgba(202, 204, 226, 0.4)',
          color: darkMode ? '#fff' : 'inherit',
        }}
      >
        <AppBar
          position="sticky"
          sx={{
            bgcolor: darkMode ? '#1e1e1e' : 'white',
            color: darkMode ? '#fff' : 'black',
            boxShadow: 1,
          }}
        >
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
              Welcome Back, {user?.name || 'Admin'}!
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
                  sx: { color: darkMode ? '#fff' : 'inherit' },
                }}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: darkMode ? '#fff' : 'inherit',
                  },
                  '& .MuiSvgIcon-root': {
                    color: darkMode ? 'rgba(255,255,255,0.7)' : 'inherit',
                  },
                }}
              />
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>

              {/* Dark/Light mode toggle */}
              <IconButton
                color="inherit"
                onClick={toggleDarkMode}
                sx={{
                  bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    bgcolor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
              <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                <Avatar sx={{ bgcolor: accentColor }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {profileMenu}

        <Box sx={{ p: 2 }}>
          <Routes>
            <Route path="" element={<Analytics />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="tours" element={<ToursAdmin />} />
            <Route path="users" element={<UsersAdmin />} />
            {/* Add the settings route */}
            <Route path="settings" element={<SettingsAdmin />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

// Main Dashboard component that wraps DashboardContent with ThemeProvider
const Dashboard = () => {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
};

export default Dashboard;
