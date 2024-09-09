import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <Box>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            marginLeft: '270px', // Offset for the sidebar
            padding: '20px',
            backgroundColor: '#eaeaea',
            minHeight: 'calc(100vh - 60px)', // Adjust height to account for header
            marginTop: '60px', // Offset for the header
            width:'100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
