import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';

const AssignAccount = () => {
  const { country, position } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: state?.currentHolder?.name || '',
    email: state?.currentHolder?.email || '',
    phone: state?.currentHolder?.phone || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // API call to assign/reassign account
      console.log('Submitting:', { country, position, ...formData });
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/positions', { state: { success: 'Account assigned successfully' } });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // API call to delete account
      console.log('Deleting account for:', country, position);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/positions', { state: { success: 'Account removed successfully' } });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
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
          {state?.currentHolder ? 'Reassign' : 'Assign'} {position} for {country}
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ width: 80, height: 80 }}>
              {formData.fullName.charAt(0) || '?'}
            </Avatar>
          </Box>

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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {state?.currentHolder && (
              <Button
                variant="contained"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={isLoading}
              >
                Remove Current Holder
              </Button>
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
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
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove {state?.currentHolder?.name} from this position?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleDelete} 
              color="error"
              variant="contained"
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
              disabled={isLoading}
            >
              Confirm Remove
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Box>
  );
};

export default AssignAccount;