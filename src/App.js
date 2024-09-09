import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'; // Adjust the path as needed
import Home from './pages/Home'; // Import page components
import Users from './pages/Users';
import Bookings from './pages/Bookings';
import Rooms from './pages/Rooms';
import Reviews from './pages/Reviews';
import Gallery from './pages/Gallery';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage'; // Import your login page component

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the LoginPage */}
        <Route path="/" element={<LoginPage />} />

        {/* Other routes wrapped in Layout */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/users" element={<Layout><Users /></Layout>} />
        <Route path="/bookings" element={<Layout><Bookings /></Layout>} />
        <Route path="/rooms" element={<Layout><Rooms /></Layout>} />
        <Route path="/reviews" element={<Layout><Reviews /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
