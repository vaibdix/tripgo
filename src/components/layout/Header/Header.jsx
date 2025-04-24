import boy1 from '../../../assets/images/boy1.png';
import boy2 from '../../../assets/images/boy2.png';
import boy3 from '../../../assets/images/boy3.png';
import boy4 from '../../../assets/images/boy4.png';
import boy5 from '../../../assets/images/boy5.png';
import boy6 from '../../../assets/images/boy6.png';
import boy7 from '../../../assets/images/boy7.png';
import boy8 from '../../../assets/images/boy8.png';
import boy9 from '../../../assets/images/boy9.png';
import girl1 from '../../../assets/images/girl1.png';
import girl2 from '../../../assets/images/girl2.png';
import girl3 from '../../../assets/images/girl3.png';
import girl4 from '../../../assets/images/girl4.png';
import girl5 from '../../../assets/images/girl5.png';
import logo from '../../../assets/images/logo.png';
import useAccommodationStore from '../../../store/accommodationStore';
import useAuthStore from '../../../store/authStore';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Drawer,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Search, Bookmark, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Avatars = [
  boy1,
  boy2,
  boy3,
  boy4,
  boy5,
  boy6,
  boy7,
  boy8,
  boy9,
  girl1,
  girl2,
  girl3,
  girl4,
  girl5,
];

function Header() {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { wishlist, cart } = useAccommodationStore();
  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * Avatars.length);
    return Avatars[randomIndex];
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    handleLogout();
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white' }}>
      <Toolbar sx={{ py: { xs: 2, md: 1.5 }, px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'semibold',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <img src={logo} alt="logo" style={{ width: '20px', height: '20px' }} />
            TripGo
          </Typography>
        </Link>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        >
          {/* Navigation Links */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/tours">Tours</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </Box>
        </Box>

        {/* Actions Section */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', ml: 'auto' }}>
          <IconButton sx={{ backgroundColor: '#F5F1EE' }}>
            <Search size={20} color="#875541" />
          </IconButton>

          {/* Replace this cart IconButton */}
          <IconButton onClick={() => navigate('/cart')} sx={{ backgroundColor: '#F5F1EE' }}>
            <Badge badgeContent={cart.length} color="warning" sx={{ border: '1px solid #F5F1EE' }}>
              <ShoppingBag size={20} color="#101F37" />
            </Badge>
          </IconButton>

          <IconButton onClick={() => navigate('/wishlist')} sx={{ backgroundColor: '#EEEFF8' }}>
            <Badge
              badgeContent={wishlist.length}
              color="warning"
              sx={{ border: '1px solid #F5F1EE' }}
            >
              <Bookmark size={20} color="#101F37" />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <Button
                sx={{
                  borderRadius: 28,
                  px: 2,
                  py: 0.5,
                  color: 'black',
                  backgroundColor: 'white',
                  fontWeight: 'medium',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  textTransform: 'none',
                  border: '1px solid #e0e0e0',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                onClick={handleMenuOpen}
              >
                <Typography>{user?.name || 'User'}</Typography>

                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: '#f5f5f5',
                  }}
                  alt={user?.name || 'User Avatar'}
                  src={user?.avatar || getRandomAvatar()}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate('/admin');
                  }}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  Admin Dashboard
                </MenuItem>

                <MenuItem
                  onClick={handleLogoutClick}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                borderRadius: 28,
                px: 3,
                py: 1,
                color: 'black',
                backgroundColor: '#f9f7f4',
                fontWeight: 'semibold',
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            bgcolor: 'white',
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Link
            to="/"
            onClick={handleDrawerToggle}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography sx={{ py: 1, fontWeight: 500 }}>HOME</Typography>
          </Link>
          <Link
            to="/tours"
            onClick={handleDrawerToggle}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography sx={{ py: 1, fontWeight: 500 }}>TOURS</Typography>
          </Link>
          <Link
            to="/prices"
            onClick={handleDrawerToggle}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography sx={{ py: 1, fontWeight: 500 }}>COLLECTION</Typography>
          </Link>
          <Link
            to="/about"
            onClick={handleDrawerToggle}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography sx={{ py: 1, fontWeight: 500 }}>ABOUT US</Typography>
          </Link>
          <Link
            to="/contact"
            onClick={handleDrawerToggle}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography sx={{ py: 1, fontWeight: 500 }}>CONTACT</Typography>
          </Link>
          <Button
            variant="outlined"
            component={Link}
            to="/login"
            onClick={handleDrawerToggle}
            sx={{
              mt: 2,
              borderRadius: 28,
              px: 3,
              py: 1,
              border: '1px solid #1a1a1a',
              color: 'black',
              textTransform: 'none',
            }}
          >
            Login
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;
