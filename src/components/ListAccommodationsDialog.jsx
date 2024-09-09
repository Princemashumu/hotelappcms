import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ListAccommodationsDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>List of Accommodations</DialogTitle>
      <DialogContent>
        {/* Add the content of your accommodations list here */}
        <p>This is where the list of accommodations would be displayed.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListAccommodationsDialog;
