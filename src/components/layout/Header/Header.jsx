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
            sx={{ fontWeight: 'semibold', display: 'flex', alignItems: 'center', gap: 1 }}
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
            <Link to="/prices">Collection</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </Box>
        </Box>

        {/* Actions Section */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', ml: 'auto' }}>
          <IconButton sx={{ backgroundColor: '#F5F1EE' }}>
            <Search size={20} color="#875541" style={{}} />
          </IconButton>
          <IconButton sx={{ backgroundColor: '#EEEFF8' }}>
            <Badge badgeContent={2} color="warning" sx={{ border: '1px solid #F5F1EE' }}>
              <Bookmark size={20} color="#101F37" />
            </Badge>
          </IconButton>
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
