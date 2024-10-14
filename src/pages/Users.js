import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path as necessary
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Button, Snackbar, Alert, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'User')); // 'User' is the Firestore collection name
        const userData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        setError('Error fetching users.');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      const userDocRef = doc(db, 'User', userId);
      await updateDoc(userDocRef, { status: 'blocked' }); // Assuming 'status' is a field to indicate user status
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'blocked' } : user
      ));
    } catch (error) {
      setError('Error blocking user.');
      console.error('Error blocking user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (userToDelete) {
        await deleteDoc(doc(db, 'User', userToDelete));
        setUsers(users.filter(user => user.id !== userToDelete));
        setUserToDelete(null);
        setOpenConfirmDialog(false);
      }
    } catch (error) {
      setError('Error deleting user.');
      console.error('Error deleting user:', error);
    }
  };

  const handleOpenConfirmDialog = (userId) => {
    setUserToDelete(userId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setUserToDelete(null);
    setOpenConfirmDialog(false);
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <h1>Users List</h1>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email || 'N/A'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleBlockUser(user.id)}
                      disabled={user.status === 'blocked'}
                    >
                      {user.status === 'blocked' ? 'Blocked' : 'Block'}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenConfirmDialog(user.id)}
                    >
                      Delete
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

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Users;
