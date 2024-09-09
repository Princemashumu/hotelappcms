// src/pages/Home.jsx
import React from 'react';
import ChartComponent from '../components/ChartComponent';
import Box from '@mui/material/Box';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Overview</h1>
      
      {/* Row layout with smaller square boxes */}
      <div className="flex flex-row items-center space-x-6 mb-6">
        {/* Revenue Box */}
        <Box 
          sx={{ 
            backgroundColor: 'purple', 
            padding: 3, 
            boxShadow: 3, 
            borderRadius: 2, 
            width: '150px', // Reduced width for smaller boxes
            aspectRatio: '1/1', // Makes the box square
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            '&:hover': { 
              transform: 'scale(1.05)', 
              transition: 'transform 0.3s ease-in-out' 
            } 
          }}
        >
          <h2 className="text-lg font-bold mb-2">Revenue</h2>
          <p className="text-2xl font-semibold">R12,345</p>
        </Box>
      </div>
      
      {/* Chart Component */}
      <ChartComponent /> 
    </div>
  );
};

export default Home;
