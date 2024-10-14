import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path as necessary
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Button, Snackbar, Alert, CircularProgress } from '@mui/material';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings')); // 'bookings' is the Firestore collection name
        const bookingData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingData);
      } catch (error) {
        setError('Error fetching bookings.');
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const bookingDocRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingDocRef, { status: newStatus });
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (error) {
      setError('Error updating booking status.');
      console.error('Error updating booking status:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <h1>Bookings List</h1>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Room Details</TableCell>
                <TableCell>Check-In</TableCell>
                <TableCell>Check-Out</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.roomDetails}</TableCell>
                  <TableCell>{booking.checkIn}</TableCell>
                  <TableCell>{booking.checkOut}</TableCell>
                  <TableCell>{booking.status || 'Pending'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUpdateStatus(booking.id, 'Accepted')}
                      disabled={booking.status === 'Accepted' || booking.status === 'Declined'}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleUpdateStatus(booking.id, 'Declined')}
                      disabled={booking.status === 'Accepted' || booking.status === 'Declined'}
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Bookings;
