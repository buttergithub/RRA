import { useAuth } from '../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  Box,
  Button,
  Typography,
  Avatar,
  styled
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Groups as AuthoritiesIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main
    }
  }
}));

const Sidebar = ({ open, setOpen, showDevControls }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Only show Secretary link if user is a secretary
  const showSecretaryLink = user?.role === 'secretary';

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 56,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 56,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2,
          minHeight: 64
        }}>
          {open ? (
            <>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                {user?.name?.charAt(0) || 'A'}
              </Avatar>
              <Box sx={{ overflow: 'hidden' }}>
                <Typography noWrap variant="subtitle1">
                  {user?.name || 'Admin'}
                </Typography>
                <Typography noWrap variant="caption" color="text.secondary">
                  {user?.role || 'Role'}
                </Typography>
              </Box>
              <IconButton 
                onClick={() => setOpen(false)} 
                sx={{ ml: 'auto' }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={() => setOpen(true)}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </Box>
        
        <Divider />
        
        {/* Navigation Items */}
        <List sx={{ flexGrow: 1 }}>
          <StyledNavLink to="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </StyledNavLink>
          
          <StyledNavLink to="/authorities">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AuthoritiesIcon />
                </ListItemIcon>
                <ListItemText primary="Authorities" />
              </ListItemButton>
            </ListItem>
          </StyledNavLink>
          
          {showSecretaryLink && (
            <StyledNavLink to="/secretary">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Secretary" />
                </ListItemButton>
              </ListItem>
            </StyledNavLink>
          )}
          
          <StyledNavLink to="/settings">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </StyledNavLink>
        </List>
        
        <Divider />
        
        {/* Footer with Logout */}
        <Box sx={{ p: 2 }}>
          {showDevControls && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" display="block">
                DEVELOPMENT MODE
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                size="small"
                startIcon={<AdminIcon />}
                onClick={() => navigate('/login')}
                sx={{ mt: 1 }}
              >
                Switch User
              </Button>
            </Box>
          )}
          
          <Tooltip title="Logout" placement="right" arrow>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                justifyContent: open ? 'flex-start' : 'center',
                px: open ? 2 : 1.5
              }}
            >
              {open && 'Logout'}
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;