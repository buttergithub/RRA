import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Box, 
  Chip,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const PositionCard = ({ position, currentHolder, onEdit, onRemove, onAssign }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleMenuClose();
    onEdit(position);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await onRemove(position);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StyledCard>
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2 
          }}>
            <Box>
              <Typography variant="h6" component="div">
                {position.title}
              </Typography>
              <Chip 
                label={position.country} 
                size="small" 
                sx={{ mt: 1 }}
              />
            </Box>
            
            <Box>
              <IconButton
                aria-label="more"
                aria-controls="position-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <MoreIcon />
              </IconButton>
              <Menu
                id="position-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEditClick}>
                  <EditIcon sx={{ mr: 1 }} /> Edit Position
                </MenuItem>
                {currentHolder && (
                  <MenuItem onClick={handleDeleteClick}>
                    <DeleteIcon sx={{ mr: 1 }} /> Remove Account
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {position.description}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: currentHolder ? 'action.hover' : 'error.light',
            p: 1.5,
            borderRadius: 1,
            mb: 2
          }}>
            <Avatar sx={{ 
              width: 40, 
              height: 40, 
              mr: 2,
              bgcolor: currentHolder ? 'primary.main' : 'error.main'
            }}>
              {currentHolder ? currentHolder.name.charAt(0) : <PersonIcon />}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">
                {currentHolder?.name || 'Position Vacant'}
              </Typography>
              {currentHolder && (
                <Typography variant="caption" color="text.secondary">
                  {currentHolder.email}
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => onAssign(position)}
              color={currentHolder ? 'warning' : 'success'}
              sx={{ 
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              {currentHolder ? 'Reassign' : 'Assign'}
            </Button>
          </Box>
        </CardContent>
      </StyledCard>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove {currentHolder?.name} from this position?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Removing...' : 'Confirm Remove'}
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default PositionCard;