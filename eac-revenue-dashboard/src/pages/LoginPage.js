import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Divider, 
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  AdminPanelSettings as AdminIcon,
  Person as SecretaryIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock API function - replace with real API calls
const mockLoginApi = (email, password, role) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation for demo purposes
      if (email && password) {
        resolve({
          id: '12345',
          name: role === 'admin' ? 'Admin User' : 'Secretary User',
          email,
          role,
          avatar: '',
          token: 'mock-token-123'
        });
      } else {
        reject(new Error('Email and password are required'));
      }
    }, 1000);
  });
};

const LoginPage = () => {
  const [accountType, setAccountType] = useState('admin');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAccountTypeChange = (event, newType) => {
    if (newType) {
      setAccountType(newType);
      setError('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call mock API (replace with real API call)
      const userData = await mockLoginApi(
        credentials.email, 
        credentials.password, 
        accountType
      );
      
      // Store user data in context and localStorage
      await login(userData);
      
      // Redirect based on role
      navigate(accountType === 'admin' ? '/' : '/secretary');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        p: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ width: 400, maxWidth: '100%', borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: 'primary.main',
                mx: 'auto',
                mb: 2
              }}>
                <LockIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5" component="h1" gutterBottom>
                EARA Portal Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to access your account
              </Typography>
            </Box>

            <ToggleButtonGroup
              value={accountType}
              exclusive
              onChange={handleAccountTypeChange}
              fullWidth
              sx={{ mb: 3 }}
              color="primary"
            >
              <ToggleButton value="admin" disabled={isLoading}>
                <AdminIcon sx={{ mr: 1 }} />
                Admin
              </ToggleButton>
              <ToggleButton value="secretary" disabled={isLoading}>
                <SecretaryIcon sx={{ mr: 1 }} />
                Secretary
              </ToggleButton>
            </ToggleButtonGroup>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                sx={{ mb: 2 }}
              />

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `Sign In as ${accountType === 'admin' ? 'Admin' : 'Secretary'}`
                )}
              </Button>
            </form>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" color="text.secondary" align="center">
              Forgot password? Contact system administrator
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default LoginPage;