import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  Chip,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  IconButton,
  Badge
} from '@mui/material';
import { 
  Send as SendIcon,
  CalendarToday as DateIcon,
  Place as PlaceIcon,
  Description as ResolutionIcon,
  Person as PersonIcon,
  Flag as FlagIcon,
  Close as CloseIcon,
  Public as WorldIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const SecretaryDashboard = () => {
  // Form state
  const [formData, setFormData] = useState({
    meetingDate: '',
    meetingPlace: '',
    resolution: ''
  });

  // Selected recipients state (now can be from any country)
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [currentCountry, setCurrentCountry] = useState('');

  // Mock data structure
  const countriesData = [
    {
      name: 'Uganda',
      code: 'UG',
      flag: 'https://flagcdn.com/ug.svg',
      authorities: [
        {
          id: 'UG-1',
          name: 'John Musinguzi',
          position: 'Commissioner General',
          authority: 'URA',
          email: 'commissioner@ura.go.ug'
        },
        {
          id: 'UG-2',
          name: 'Sarah Nalwoga',
          position: 'IT and Digitalization Sub Committee',
          authority: 'URA',
          email: 'it@ura.go.ug'
        }
      ]
    },
    {
      name: 'Kenya',
      code: 'KE',
      flag: 'https://flagcdn.com/ke.svg',
      authorities: [
        {
          id: 'KE-1',
          name: 'Githii Mburu',
          position: 'Commissioner General',
          authority: 'KRA',
          email: 'commissioner@kra.go.ke'
        },
        {
          id: 'KE-2',
          name: 'Mary Wambui',
          position: 'HR and Administration Sub Committee',
          authority: 'KRA',
          email: 'hr@kra.go.ke'
        }
      ]
    },
    {
      name: 'Rwanda',
      code: 'RW',
      flag: 'https://flagcdn.com/rw.svg',
      authorities: [
        {
          id: 'RW-1',
          name: 'Jean de Dieu Niyonzima',
          position: 'Commissioner General',
          authority: 'RRA',
          email: 'j.niyonzima@rra.gov.rw'
        }
      ]
    },
    {
      name: 'Tanzania',
      code: 'TZ',
      flag: 'https://flagcdn.com/tz.svg',
      authorities: [
        {
          id: 'TZ-1',
          name: 'Alphayo Kidata',
          position: 'Commissioner General',
          authority: 'TRA',
          email: 'commissioner@tra.go.tz'
        }
      ]
    }
  ];

  // Get all recipients grouped by country
  const getAllRecipients = () => {
    return countriesData.flatMap(country => 
      country.authorities.map(recipient => ({
        ...recipient,
        countryCode: country.code,
        countryName: country.name,
        countryFlag: country.flag
      }))
    );
  };

  // Handle country filter change
  const handleCountryChange = (e) => {
    setCurrentCountry(e.target.value);
  };

  // Handle recipient selection
  const handleRecipientSelect = (recipient) => {
    setSelectedRecipients(prev => {
      const isSelected = prev.some(r => r.id === recipient.id);
      if (isSelected) {
        return prev.filter(r => r.id !== recipient.id);
      } else {
        return [...prev, recipient];
      }
    });
  };

  // Remove selected recipient
  const handleRemoveRecipient = (recipientId) => {
    setSelectedRecipients(prev => prev.filter(r => r.id !== recipientId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      recipients: selectedRecipients
    };
    console.log('Resolution submitted:', submissionData);
    alert(`Resolution sent to ${selectedRecipients.length} recipient(s) across ${new Set(selectedRecipients.map(r => r.countryName)).size} countries!`);
    setFormData({
      meetingDate: '',
      meetingPlace: '',
      resolution: ''
    });
    setSelectedRecipients([]);
    setCurrentCountry('');
  };

  // Filter recipients based on current country filter
  const filteredRecipients = currentCountry 
    ? getAllRecipients().filter(r => r.countryCode === currentCountry)
    : getAllRecipients();

  // Get unique countries from selected recipients
  const selectedCountries = [...new Set(selectedRecipients.map(r => r.countryCode))];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Secretary Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Resolution Form */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Send New Resolution
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {/* Meeting Date */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Meeting Date"
                        type="date"
                        name="meetingDate"
                        value={formData.meetingDate}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: <DateIcon color="action" sx={{ mr: 1 }} />
                        }}
                      />
                    </Grid>
                    
                    {/* Meeting Place */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Meeting Place"
                        name="meetingPlace"
                        value={formData.meetingPlace}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: <PlaceIcon color="action" sx={{ mr: 1 }} />
                        }}
                      />
                    </Grid>
                    
                    {/* Country Filter (optional) */}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Filter by Country</InputLabel>
                        <Select
                          value={currentCountry}
                          onChange={handleCountryChange}
                          label="Filter by Country"
                        >
                          <MenuItem value="">
                            <em>All Countries</em>
                          </MenuItem>
                          {countriesData.map((country) => (
                            <MenuItem key={country.code} value={country.code}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img 
                                  src={country.flag} 
                                  alt={country.name} 
                                  style={{ width: 20, marginRight: 8 }} 
                                />
                                {country.name}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    {/* Recipient Selection */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Select Recipients ({selectedRecipients.length} selected)
                      </Typography>
                      <Paper elevation={2} sx={{ maxHeight: 300, overflow: 'auto', p: 1 }}>
                        <List dense>
                          {filteredRecipients.map((recipient) => {
                            const isSelected = selectedRecipients.some(r => r.id === recipient.id);
                            return (
                              <ListItem 
                                key={recipient.id}
                                secondaryAction={
                                  <Checkbox
                                    edge="end"
                                    checked={isSelected}
                                    onChange={() => handleRecipientSelect(recipient)}
                                  />
                                }
                                sx={{
                                  backgroundColor: isSelected ? 'action.selected' : 'inherit',
                                  borderLeft: `4px solid ${isSelected ? 'primary.main' : 'transparent'}`
                                }}
                              >
                                <ListItemAvatar>
                                  <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                      <img 
                                        src={recipient.countryFlag} 
                                        alt={recipient.countryName}
                                        style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid white' }}
                                      />
                                    }
                                  >
                                    <Avatar>{recipient.name.charAt(0)}</Avatar>
                                  </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={recipient.name}
                                  secondary={
                                    <>
                                      <Typography component="span" variant="body2" display="block">
                                        {recipient.position}
                                      </Typography>
                                      <Typography component="span" variant="body2" display="block">
                                        {recipient.authority} • {recipient.countryName}
                                      </Typography>
                                    </>
                                  }
                                />
                              </ListItem>
                            );
                          })}
                        </List>
                      </Paper>
                    </Grid>
                    
                    {/* Selected Recipients Preview */}
                    {selectedRecipients.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                          Selected Recipients ({selectedRecipients.length})
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {selectedRecipients.map(recipient => (
                            <Chip
                              key={recipient.id}
                              label={`${recipient.name} (${recipient.countryName})`}
                              onDelete={() => handleRemoveRecipient(recipient.id)}
                              avatar={
                                <Avatar src={recipient.countryFlag}>
                                  {recipient.name.charAt(0)}
                                </Avatar>
                              }
                              variant="outlined"
                              deleteIcon={<CloseIcon />}
                            />
                          ))}
                        </Box>
                      </Grid>
                    )}
                    
                    {/* Resolution Text */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Resolution"
                        name="resolution"
                        value={formData.resolution}
                        onChange={handleChange}
                        required
                        multiline
                        rows={6}
                        InputProps={{
                          startAdornment: <ResolutionIcon color="action" sx={{ mr: 1, mt: 1, alignSelf: 'flex-start' }} />
                        }}
                      />
                    </Grid>
                    
                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SendIcon />}
                        fullWidth
                        sx={{ mt: 1 }}
                        disabled={selectedRecipients.length === 0}
                      >
                        Send to {selectedRecipients.length} Recipient(s)
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        
        {/* Selected Recipient Info */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recipient Information
                </Typography>
                
                {selectedRecipients.length > 0 ? (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <WorldIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
                      <Typography variant="h6">
                        {selectedCountries.length} Countries Selected
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                      {selectedCountries.map(countryCode => {
                        const country = countriesData.find(c => c.code === countryCode);
                        const countryRecipients = selectedRecipients.filter(r => r.countryCode === countryCode);
                        
                        return (
                          <Box key={countryCode} sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <img 
                                src={country.flag} 
                                alt={country.name} 
                                style={{ width: 20, marginRight: 8 }} 
                              />
                              <Typography variant="subtitle1">
                                {country.name} ({countryRecipients.length})
                              </Typography>
                            </Box>
                            
                            <List dense>
                              {countryRecipients.map(recipient => (
                                <ListItem key={recipient.id}>
                                  <ListItemAvatar>
                                    <Avatar>{recipient.name.charAt(0)}</Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={recipient.name}
                                    secondary={
                                      <>
                                        <Typography component="span" variant="body2" display="block">
                                          {recipient.position}
                                        </Typography>
                                        <Typography component="span" variant="body2" display="block">
                                          {recipient.email}
                                        </Typography>
                                      </>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                ) : (
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    backgroundColor: 'action.hover'
                  }}>
                    <PersonIcon color="disabled" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      Select recipients from any country
                    </Typography>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SecretaryDashboard;