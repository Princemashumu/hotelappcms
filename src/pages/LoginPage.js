import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Firebase auth import
import { useNavigate } from 'react-router-dom'; // For redirection
import Logo from '../Logo.png';
import { GridLoader } from 'react-spinners'; // For the loader
import adminCredentials from './adminCredentials'; // Import admin credentials

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if the entered credentials match the admin credentials
    if (email === adminCredentials.email && password === adminCredentials.password) {
      try {
        // Admin credentials matched, proceed with Firebase authentication
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        navigate('/home'); // Redirect to the home page after successful login
      } catch (err) {
        setError(err.message);
      }
    } else {
      // Admin credentials do not match
      setError('Invalid admin credentials.');
    }

    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center"
        height="100vh"
        position="relative"
      >
        {loading && (
          <GridLoader
            color="#1976d2"
            size={15}
            margin={2}
            loading={loading}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        )}

        <img 
          src={Logo} 
          alt="Logo" 
          style={{
            width: '100px', 
            height: 'auto', 
            marginBottom: '20px', 
            border: '4px solid #1976d2', 
            borderRadius: '50%',
            padding: '10px',
          }}
        />

        <Typography variant="h4" align="center" gutterBottom>
          Admin Portal
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'} // Toggle between text and password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && (
            <Typography color="error" variant="body2" align="center" style={{ marginTop: '10px' }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            style={{ marginTop: '20px' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;
