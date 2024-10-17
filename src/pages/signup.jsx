import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import ApiEndpoints from '../api/api';

const defaultTheme = createTheme();

export default function SignUp() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError('');

    if (!name || !email || !password) {
      setValidationError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (name.length < 4) {
      setValidationError('User name must be at least 6 characters.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await ApiEndpoints.register({
        email:email,
        password:password,
        userName: name,
      });
      const decodedPayload = JSON.parse(atob(response.data.data.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      localStorage.setItem('accessToken', response.data.data.token);
      localStorage.setItem('userDetails', JSON.stringify(decodedPayload)); 
      
      navigate('/');
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="userName"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  error={(name.length < 6 && validationError !== '') || !name}
                  helperText={
                    name.length < 6 && validationError
                      ? validationError
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  placeholder='john@mail.com'
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  error={!validateEmail(email) && validationError !== ''}
                  helperText={
                    !validateEmail(email) && validationError
                      ? validationError
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  error={(password.length < 6 && validationError !== '') || !password}
                  helperText={
                    password.length < 6 && validationError
                      ? validationError
                      : ''
                  }
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!name || !email || !password || password.length < 6 || name.length < 4}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
