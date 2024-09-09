import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  Rating,
  FormControlLabel, // Import FormControlLabel
  Checkbox // Import Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path to your firebase config

const amenitiesOptions = [
  { value: 'wifi', label: 'WiFi', icon: '📶' },
  { value: 'parking', label: 'Parking', icon: '🚗' },
  { value: 'pool', label: 'Pool', icon: '🏊' },
  { value: 'gym', label: 'Gym', icon: '💪' },
];

const availabilityOptions = [
  { value: 'available', label: 'Available' },
  { value: 'booked', label: 'Booked' },
  { value: 'maintenance', label: 'Under Maintenance' },
];

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    roomName: '',
    availability: '',
    images: [],
    rating: 0,
    amenities: [],
    price: '' // Add price field
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const q = query(collection(db, 'accommodation'));
      const querySnapshot = await getDocs(q);
      const fetchedRooms = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRooms(fetchedRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleDialogOpen = (room = null) => {
    setEditingRoom(room);
    setRoomDetails({
      roomName: room ? room.roomName : '',
      availability: room ? room.availability : '',
      images: room ? room.images : [],
      rating: room ? room.rating : 0,
      amenities: room ? room.amenities : [],
      price: room ? room.price : '' // Initialize price
    });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingRoom(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUrlChange = (e) => {
    setRoomDetails((prev) => ({
      ...prev,
      images: e.target.value.split(',').map((url) => url.trim())
    }));
  };

  const handleRatingChange = (e, newValue) => {
    setRoomDetails((prev) => ({
      ...prev,
      rating: newValue
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setRoomDetails((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((amenity) => amenity !== value)
    }));
  };

  const handleAddOrUpdateRoom = async () => {
    try {
      if (editingRoom) {
        // Update existing room
        const roomRef = doc(db, 'accommodation', editingRoom.id);
        await updateDoc(roomRef, roomDetails);
        setRooms((prev) =>
          prev.map((room) =>
            room.id === editingRoom.id ? { ...room, ...roomDetails } : room
          )
        );
      } else {
        // Add new room
        const docRef = await addDoc(collection(db, 'accommodation'), roomDetails);
        setRooms((prev) => [
          ...prev,
          { id: docRef.id, ...roomDetails }
        ]);
      }
      handleDialogClose();
    } catch (error) {
      console.error('Error adding/updating room:', error);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await deleteDoc(doc(db, 'accommodation', id));
      setRooms((prev) => prev.filter((room) => room.id !== id));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: 'purple',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          width: '150px',
          aspectRatio: '1/1',
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
        <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
          Add Room
        </Button>
      </Box>

      <Grid container spacing={3} mt={3}>
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card>
                <CardContent>
                  {room.images && room.images.length > 0 && (
                    <div>
                      {room.images.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Room ${index}`}
                          style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                        />
                      ))}
                    </div>
                  )}
                  <Typography variant="h5">{room.roomName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Availability: {room.availability}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ZAR {room.price}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography component="legend">Rating:</Typography>
                    <Rating
                      name={`rating-${room.id}`}
                      value={room.rating || 0}
                      readOnly
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    {room.amenities && room.amenities.map((amenity) => (
                      <Box key={amenity} sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                        {amenitiesOptions.find(opt => opt.value === amenity)?.icon}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="delete" onClick={() => handleDeleteRoom(room.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button variant="outlined" color="primary" onClick={() => handleDialogOpen(room)}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No rooms available</Typography>
        )}
      </Grid>

      {/* Dialog for adding/editing room */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editingRoom ? 'Edit Room' : 'Add Room'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="images"
            label="Image URLs (comma-separated)"
            type="text"
            fullWidth
            value={roomDetails.images.join(', ')}
            onChange={handleImageUrlChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="roomName"
            label="Room Name"
            type="text"
            fullWidth
            value={roomDetails.roomName}
            onChange={handleInputChange}
          />
          <TextField
            select
            margin="dense"
            name="availability"
            label="Availability"
            fullWidth
            value={roomDetails.availability}
            onChange={handleInputChange}
          >
            {availabilityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            name="price"
            label="Price (ZAR)"
            type="number"
            fullWidth
            value={roomDetails.price}
            onChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography component="legend">Rating:</Typography>
            <Rating
              name="rating"
              value={roomDetails.rating}
              onChange={handleRatingChange}
            />
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>Amenities:</Typography>
          {amenitiesOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={roomDetails.amenities.includes(option.value)}
                  value={option.value}
                  onChange={handleAmenitiesChange}
                />
              }
              label={option.label}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddOrUpdateRoom}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Rooms;
