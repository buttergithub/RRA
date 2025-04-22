import { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Button, 
  TextField,
  Grid,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Edit, 
  Save, 
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  Delete,
  Logout
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Settings = () => {
  const [user, setUser] = useState({
    name: "Admin User",
    role: "Super Administrator",
    email: "admin@earc.gov",
    phone: "+250788123456",
    avatar: ""
  });
  
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Settings
      </Typography>

      {/* User Profile */}
      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring" }}>
        <Card sx={{ p: 3, borderRadius: 4 }}>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80,
                bgcolor: "primary.main",
                fontSize: "2rem",
                border: "3px solid",
                borderColor: "primary.light"
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">{user.name}</Typography>
              <Typography color="text.secondary">{user.role}</Typography>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<Edit />}
                sx={{ mt: 1 }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Card>
      </motion.div>

      {/* Account Settings */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card sx={{ p: 3, mt: 3, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>Account Settings</Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Email" 
                value={user.email}
                InputProps={{
                  endAdornment: <VerifiedIcon color="success" />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Phone" 
                value={user.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Password" 
                type="password"
                value="••••••••"
                InputProps={{
                  endAdornment: (
                    <Button size="small">Change Password</Button>
                  )
                }}
              />
            </Grid>
          </Grid>

          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            startIcon={<Save />}
          >
            Save Changes
          </Button>
        </Card>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div whileHover={{ x: 5 }}>
        <Card sx={{ p: 3, mt: 3, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>Notifications</Typography>
          
          {[
            { label: "Email Alerts", enabled: true },
            { label: "SMS Notifications", enabled: false },
            { label: "System Updates", enabled: true },
            { label: "Position Assignments", enabled: true }
          ].map((item, index) => (
            <Box 
              key={index} 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center" 
              py={1}
            >
              <Typography>{item.label}</Typography>
              <Switch 
                checked={item.enabled} 
                color="primary"
                onChange={() => {}}
              />
            </Box>
          ))}
        </Card>
      </motion.div>

      {/* System Preferences */}
      <motion.div whileTap={{ scale: 0.98 }}>
        <Card sx={{ p: 3, mt: 3, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>System Preferences</Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={theme}
              label="Theme"
              onChange={(e) => setTheme(e.target.value)}
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="system">System Default</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="sw">Swahili</MenuItem>
            </Select>
          </FormControl>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div 
        whileHover={{ x: [0, -2, 2, 0] }} 
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ 
          p: 3, 
          mt: 3, 
          borderRadius: 4,
          border: "2px dashed",
          borderColor: "error.main",
          backgroundColor: "rgba(255, 0, 0, 0.05)"
        }}>
          <Typography variant="h6" gutterBottom color="error">
            <WarningIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Danger Zone
          </Typography>
          
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Button 
              variant="outlined" 
              color="error"
              startIcon={<Delete />}
            >
              Deactivate Account
            </Button>
            
            <Button 
              variant="contained" 
              color="error"
              startIcon={<Logout />}
            >
              Sign Out All Devices
            </Button>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Settings;