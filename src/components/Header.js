import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { MdNotifications, MdMessage } from 'react-icons/md'; // Notifications and messages icons
import { Link } from 'react-router-dom'; // Import Link for routing
import Logo from '../Logo.png'; // Import the logo image

function Header() {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#7788B2',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        zIndex: 1200,
        height: '60px',
        borderTop: '25px',
      }}
    >
      {/* Title */}
      <Typography variant="h6" color='white'>
        Tzaneen <span style={{ color: 'red' }}>Hotels.</span>
      </Typography>

      {/* Notification, Message Icons, and Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton component={Link} to="/notifications">
          <MdNotifications size={30} style={{ color: 'black' }} />
        </IconButton>
        <IconButton component={Link} to="/messages">
          <MdMessage size={30} style={{ color: 'black' }} />
        </IconButton>
        <img src={Logo} alt="App Logo" style={{ height: '40px', marginLeft: '20px', paddingRight:'30px'}} />
      </Box>
    </Box>
  );
}

export default Header;
