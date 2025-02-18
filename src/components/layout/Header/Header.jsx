import { AppBar, Box, Button, IconButton, Toolbar, Typography, Badge, Drawer } from '@mui/material';
import { Search, Bookmark, Menu } from 'lucide-react';
import { useState } from 'react';
import logo from '../../../assets/images/logo.png';

import { Link } from 'react-router-dom';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white' }}>
      <Toolbar sx={{ py: { xs: 2, md: 1.5 }, px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}
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
            <Link
              to="/"
              component={Button}
              color="inherit"
              sx={{
                fontWeight: 500,
                borderBottom: '2px solid transparent',
                borderRadius: 0,
                paddingBottom: '4px',
                '&:hover': {
                  borderBottom: '2px solid black',
                },
              }}
            >
              HOME
            </Link>

            <Link
              to="/tours"
              component={Button}
              color="inherit"
              sx={{
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderBottom: '2px solid transparent',
                borderRadius: 0,
                paddingBottom: '4px',
                '&:hover': {
                  borderBottom: '2px solid black',
                },
              }}
            >
              TOURS{' '}
            </Link>

            {/* Apply similar styles to Prices and About Us links */}
            <Link
              to="/prices"
              component={Button}
              color="inherit"
              sx={{
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderBottom: '2px solid transparent',
                borderRadius: 0,
                paddingBottom: '4px',
                '&:hover': {
                  borderBottom: '2px solid black',
                },
              }}
            >
              COLLECTION{' '}
            </Link>

            <Link
              to="/about"
              component={Button}
              color="inherit"
              sx={{
                fontWeight: 500,
                borderBottom: '2px solid transparent',
                borderRadius: 0,
                paddingBottom: '4px',
                '&:hover': {
                  borderBottom: '2px solid black',
                },
              }}
            >
              ABOUT US
            </Link>
            <Link
              to="/contact"
              component={Button}
              color="inherit"
              sx={{
                fontWeight: 500,
                borderBottom: '2px solid transparent',
                borderRadius: 0,
                paddingBottom: '4px',
                '&:hover': {
                  borderBottom: '2px solid black',
                },
              }}
            >
              CONTACT
            </Link>
          </Box>
        </Box>

        {/* Actions Section */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', ml: 'auto' }}>
          <IconButton sx={{ border: '1px solid #1a1a1a' }}>
            <Search size={20} color="#1a1a1a" />
          </IconButton>
          <IconButton sx={{ border: '1px solid #1a1a1a' }}>
            <Badge badgeContent={2} color="warning">
              <Bookmark size={20} color="#1a1a1a" />
            </Badge>
          </IconButton>
          <Button
            variant="outlined"
            component={Link}
            to="/login"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
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
          <IconButton
            sx={{ display: { md: 'none' }, border: '1px solid #1a1a1a' }}
            onClick={handleDrawerToggle}
          >
            <Menu size={20} color="#1a1a1a" />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Navigation Drawer */}
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
