import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <Link 
        to="/home" 
        style={{ 
          color: 'red', 
          textDecoration: 'none', 
          fontSize: '16px', 
          fontWeight: 'bold' 
        }}
      >
        Sign Out
      </Link>
    </div>
  );
}

export default Settings;
