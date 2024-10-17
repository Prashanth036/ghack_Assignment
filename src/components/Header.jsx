import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, AppBar, Toolbar, Button, Container, Divider, Typography, MenuItem, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { AccountCircle, DynamicFeed } from '@mui/icons-material';

const logoStyle = {
  width: '130px',
  height: '50px',
  cursor: 'pointer',
  marginLeft: '10px',
  marginRight: '30px',
};

function AppAppBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const token = localStorage.getItem('accessToken');



  useEffect(() => {

    const storedUser = localStorage.getItem('userDetails');
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log(parsedUser)

        setUserDetails(parsedUser);

      } catch (error) {
        console.error('Error parsing userDetails:', error);
        localStorage.removeItem('userDetails');
      }
    }


  }, [token]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('accessToken');
    setUserDetails(null);
    navigate('/login');
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', ml: '-18px', px: 0 }}>
              <img src={import.meta.env.VITE_LOGOIMG} style={logoStyle} alt="logo of sitemark" />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    <Link style={{ textDecoration: 'none' }} to="/">
                      <HomeIcon sx={{ fontSize: '30px', display: 'block' }} />
                      <span style={{ fontSize: '12px', textAlign: 'center' }}>Home</span>
                    </Link>
                  </Typography>
                </MenuItem>
                {userDetails && (
                  <MenuItem sx={{ py: '6px', px: '12px' }}>
                    <Typography variant="body2" color="text.primary">
                      <Link style={{ textDecoration: 'none' }} to="/user/favourites">
                        <DynamicFeed sx={{ fontSize: '28px', display: 'block' }} />
                        <span style={{ fontSize: '12px' }}>Favourites</span>
                      </Link>
                    </Typography>
                  </MenuItem>
                )}
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              {userDetails ? (
                <>
                  <MenuItem sx={{ py: '6px', px: '12px' }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bolder' }}>
                      <AccountCircle sx={{ display: 'block', textAlign: 'center', mx: '3px' }} />
                      {userDetails.username}
                    </Typography>
                  </MenuItem>
                  <Button color="primary" variant="contained" size="small" onClick={handleLogout}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link style={{ textDecoration: 'none' }} to="/login">
                    <Button color="primary" variant="text" size="small">
                      Log In
                    </Button>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} to="/signup">
                    <Button color="primary" variant="contained" size="small">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button variant="text" color="primary" aria-label="menu" onClick={toggleDrawer(true)} sx={{ minWidth: '30px', p: '4px' }}>
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ minWidth: '60dvw', p: 2, backgroundColor: 'background.paper', flexGrow: 1 }}>
                  <MenuItem>
                    <Link style={{ textDecoration: 'none' }} to="/">Home</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link style={{ textDecoration: 'none' }} to="/posts">Posts</Link>
                  </MenuItem>
                  {userDetails && (
                    <MenuItem>
                      <Link style={{ textDecoration: 'none' }} to="/notifications">Notifications</Link>
                    </MenuItem>
                  )}
                  <MenuItem>Profile</MenuItem>
                  <Divider />
                  <MenuItem>
                    <Link style={{ textDecoration: 'none' }} to="/signup">
                      <Button color="primary" variant="contained" sx={{ width: '100%' }}>
                        Sign up
                      </Button>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link style={{ textDecoration: 'none' }} to="/login">
                      <Button color="primary" variant="outlined" sx={{ width: '100%' }}>
                        Sign in
                      </Button>
                    </Link>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
