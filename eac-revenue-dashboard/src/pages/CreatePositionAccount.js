import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const CreatePositionAccount = () => {
  const { country, position } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: decodeURIComponent(country),
    position: decodeURIComponent(position)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would call your API to create the account
      console.log('Creating account:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful creation, navigate back
      navigate('/positions');
    } catch (error) {
      console.error('Error creating account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Create {decodeURIComponent(position)} Account for {decodeURIComponent(country)}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{
              pattern: "[0-9]{10,15}",
              title: "Phone number should be 10-15 digits"
            }}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/positions')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default CreatePositionAccount;