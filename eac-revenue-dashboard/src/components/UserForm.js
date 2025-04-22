import { useState } from 'react';  // This is the critical fix
import { motion } from 'framer-motion';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';

const UserForm = ({ 
  onSubmit, 
  onCancel, 
  initialData = {}, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    email: initialData.email || '',
    phoneNumber: initialData.phoneNumber || '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6">
          Create Account
        </Typography>

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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default UserForm;