import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box } from '@mui/material';
import { AiFillHome } from 'react-icons/ai'; // Home icon
import { FaBook, FaPhotoVideo, FaUsers, FaEnvelope } from 'react-icons/fa'; // Added FaEnvelope for Emails
import { GiBed } from 'react-icons/gi'; // Rooms icon
import { IoSettingsSharp } from 'react-icons/io5'; // Settings icon
import { MdRateReview } from 'react-icons/md'; // Reviews icon

function Sidebar() {
  return (
    <Box
      sx={{
        width: '240px', // Width of the sidebar
        backgroundColor: '#f4f4f4',
        height: 'calc(100vh - 60px)', // Full height minus header height
        padding: '20px',
        position: 'fixed',
        top: '60px', // Position below the header
        left: 0,
        overflowY: 'auto', // Add scroll if content overflows
        zIndex: 1100, // Ensure it is below the header but above other content
      }}
    >
      <Divider sx={{ marginBottom: 2 }} />

      <List>
        {/* Home */}
        <ListItem button component={Link} to="/home">
          <ListItemIcon>
            <AiFillHome />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {/* Users */}
        <ListItem button component={Link} to="/users">
          <ListItemIcon>
            <FaUsers />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        {/* Bookings */}
        <ListItem button component={Link} to="/bookings">
          <ListItemIcon>
            <FaBook />
          </ListItemIcon>
          <ListItemText primary="Bookings" />
        </ListItem>

        {/* Rooms */}
        <ListItem button component={Link} to="/rooms">
          <ListItemIcon>
            <GiBed />
          </ListItemIcon>
          <ListItemText primary="Rooms" />
        </ListItem>

        {/* Reviews */}
        <ListItem button component={Link} to="/reviews">
          <ListItemIcon>
            <MdRateReview />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>

        {/* Gallery */}
        <ListItem button component={Link} to="/gallery">
          <ListItemIcon>
            <FaPhotoVideo />
          </ListItemIcon>
          <ListItemText primary="Gallery" />
        </ListItem>

        {/* Emails */}
        <ListItem button component={Link} to="/messages">
          <ListItemIcon>
            <FaEnvelope />
          </ListItemIcon>
          <ListItemText primary="Emails" />
        </ListItem>
      </List>

      <Divider sx={{ marginTop: 2 }} />

      {/* Settings */}
      <List>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon>
            <IoSettingsSharp />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
