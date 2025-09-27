import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Box, Paper, Link
} from '@mui/material';

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/tasks');
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    if (auth.error) alert(auth.error);
  }, [auth.error]);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (isRegister) {
      dispatch(registerUser({ username: form.username, email: form.email, password: form.password }));
    } else {
      dispatch(loginUser({ email: form.email, password: form.password }));
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isRegister ? 'Register' : 'Login'}
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
          {isRegister && (
            <TextField
              fullWidth margin="normal" label="Username" name="username"
              value={form.username} onChange={onChange} required
            />
          )}
          <TextField
            fullWidth margin="normal" label="Email" name="email" type="email"
            value={form.email} onChange={onChange} required
          />
          <TextField
            fullWidth margin="normal" label="Password" name="password" type="password"
            value={form.password} onChange={onChange} required
          />
          <Button
            fullWidth variant="contained" type="submit"
            sx={{ mt: 2 }}
          >
            {auth.loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </Button>
        </Box>

        <Box textAlign="center" sx={{ mt: 2 }}>
          <Link component="button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Login' : "Don't have account? Register"}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}