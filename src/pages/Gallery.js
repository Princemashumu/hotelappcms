import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path as necessary
import { Button, TextField, Typography, Snackbar, Alert, Grid, Card, CardMedia, CardContent } from '@mui/material';

function Gallery() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [images, setImages] = useState([]);

  // Fetch images from Firestore
  const fetchImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery'));
      const fetchedImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setImages(fetchedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images when the component mounts
  }, []);

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUpload = async () => {
    if (!imageUrl) {
      alert('Please enter an image URL.');
      return;
    }

    setLoading(true);

    try {
      // Save the image URL to Firestore
      await addDoc(collection(db, 'gallery'), {
        url: imageUrl,
        createdAt: new Date(),
      });

      setSuccess('Image URL uploaded successfully!');
      setImageUrl(''); // Reset input field

      // Refresh images
      fetchImages();
    } catch (error) {
      setError('Failed to upload image URL.');
      console.error('Error uploading image URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
      setSuccess('Image deleted successfully!');
      // Refresh images
      fetchImages();
    } catch (error) {
      setError('Failed to delete image.');
      console.error('Error deleting image:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Gallery</Typography>
      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        value={imageUrl}
        onChange={handleImageUrlChange}
        style={{ marginBottom: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading || !imageUrl}
      >
        {loading ? 'Uploading...' : 'Upload Image URL'}
      </Button>

      <Snackbar
        open={!!error || !!success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
          {error || success}
        </Alert>
      </Snackbar>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="h5">Gallery</Typography>
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={image.url}
                  alt="Gallery Image"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Uploaded on {new Date(image.createdAt.seconds * 1000).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(image.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Gallery;
