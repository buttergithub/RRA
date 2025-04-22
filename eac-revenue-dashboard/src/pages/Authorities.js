import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Card
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import CountryCard from '../components/CountryCard';
import UserForm from '../components/UserForm';

// All positions for revenue authorities
const ALL_POSITIONS = {
  main: [
    'Commissioner General',
    'Deputy Commissioner General',
    'Head of Delegation',
    'Secretary General'
  ],
  subcommittees: [
    'Domestic Revenue Sub Committee',
    'Customs Revenue Sub Committee',
    'IT and Digitalization Sub Committee',
    'HR and Administration Sub Committee',
    'Research and Planning Sub Committee',
    'Legal and Compliance Sub Committee',
    'Taxpayer Services Sub Committee'
  ]
};

// Complete list of EAC countries with their revenue authorities
const AUTHORITIES_DATA = [
  {
    country: 'Burundi',
    name: 'Office Burundais des Recettes (OBR)',
    flag: 'https://flagcdn.com/w320/bi.png',
    positions: [
      {
        title: 'Commissioner General',
        currentHolder: 'Aimé Lionel Borerwe',
        email: 'commissioner@obr.bi',
        phone: '+25722201234'
      }
    ]
  },
  {
    country: 'Kenya',
    name: 'Kenya Revenue Authority (KRA)',
    flag: 'https://flagcdn.com/w320/ke.png',
    positions: [
      {
        title: 'Commissioner General',
        currentHolder: 'Githii Mburu',
        email: 'commissioner@kra.go.ke',
        phone: '+254202880000'
      },
      {
        title: 'Customs Revenue Sub Committee',
        currentHolder: 'Kevin Safari',
        email: 'customs@kra.go.ke',
        phone: '+254202881111'
      }
    ]
  },
  {
    country: 'Rwanda',
    name: 'Rwanda Revenue Authority (RRA)',
    flag: 'https://flagcdn.com/w320/rw.png',
    positions: [
      {
        title: 'Commissioner General',
        currentHolder: 'Jean de Dieu Niyonzima',
        email: 'j.niyonzima@rra.gov.rw',
        phone: '+250788123456'
      }
    ]
  },
  {
    country: 'South Sudan',
    name: 'South Sudan Revenue Authority (SSRA)',
    flag: 'https://flagcdn.com/w320/ss.png',
    positions: [] // All positions vacant
  },
  {
    country: 'Tanzania',
    name: 'Tanzania Revenue Authority (TRA)',
    flag: 'https://flagcdn.com/w320/tz.png',
    positions: [
      {
        title: 'Commissioner General',
        currentHolder: 'Alphayo Kidata',
        email: 'commissioner@tra.go.tz',
        phone: '+255222413921'
      },
      {
        title: 'HR and Administration Sub Committee',
        currentHolder: 'Neema Kileo',
        email: 'hr@tra.go.tz',
        phone: '+255222413922'
      }
    ]
  },
  {
    country: 'Uganda',
    name: 'Uganda Revenue Authority (URA)',
    flag: 'https://flagcdn.com/w320/ug.png',
    positions: [
      {
        title: 'Commissioner General',
        currentHolder: 'John Musinguzi',
        email: 'commissioner@ura.go.ug',
        phone: '+256417112100'
      },
      {
        title: 'IT and Digitalization Sub Committee',
        currentHolder: 'Sarah Nalwoga',
        email: 'it@ura.go.ug',
        phone: '+256417112101'
      }
    ]
  },
  {
    country: 'Zanzibar',
    name: 'Zanzibar Revenue Authority (ZRA)',
    flag: 'https://flagcdn.com/w320/tz.png',
    positions: [
      {
        title: 'Commissioner General',
        currentHolder: 'Khamis Mussa Juma',
        email: 'commissioner@zra.go.tz',
        phone: '+255242230000'
      }
    ]
  }
];

const Authorities = () => {
  const [authorities, setAuthorities] = useState(AUTHORITIES_DATA);
  const [filteredAuthorities, setFilteredAuthorities] = useState(AUTHORITIES_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'country'

  // Filter authorities based on search
  useEffect(() => {
    let filtered = AUTHORITIES_DATA;
    
    if (searchTerm) {
      filtered = filtered.filter(auth =>
        auth.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auth.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredAuthorities(filtered);
  }, [searchTerm]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setViewMode('country');
  };

  const handleBackToGrid = () => {
    setViewMode('grid');
    setSelectedCountry(null);
  };

  const handleOpenPositionForm = (position) => {
    setSelectedPosition(position);
    setOpenDialog(true);
  };

  const handleSubmit = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let positionExists = false;
      const updatedAuthorities = authorities.map(auth => {
        if (auth.country === selectedCountry) {
          // Check if position already exists
          const positionIndex = auth.positions.findIndex(p => p.title === selectedPosition);
          positionExists = positionIndex !== -1;
          
          const updatedPositions = [...auth.positions];
          
          if (positionExists) {
            updatedPositions[positionIndex] = { 
              ...updatedPositions[positionIndex], 
              ...userData 
            };
          } else {
            updatedPositions.push({ 
              title: selectedPosition, 
              ...userData 
            });
          }
          
          return { ...auth, positions: updatedPositions };
        }
        return auth;
      });
  
      setAuthorities(updatedAuthorities);
      setFilteredAuthorities(updatedAuthorities);
      setSuccessMessage(
        `Successfully ${positionExists ? 'updated' : 'assigned'} ${userData.currentHolder} as ${selectedPosition} for ${selectedCountry}`
      );
      setOpenDialog(false);
    } catch (err) {
      setError(err.message || 'Failed to save assignment');
    } finally {
      setLoading(false);
    }
  };

  // Get all positions for a country with occupancy status
  const getCountryPositions = (country) => {
    const authority = authorities.find(auth => auth.country === country);
    const allPositions = [...ALL_POSITIONS.main, ...ALL_POSITIONS.subcommittees];
    
    return allPositions.map(position => {
      const existing = authority?.positions?.find(p => p.title === position);
      return {
        title: position,
        occupied: !!existing?.currentHolder,
        currentHolder: existing?.currentHolder,
        email: existing?.email,
        phone: existing?.phone
      };
    });
  };

  const renderCountryView = () => {
    const authority = authorities.find(auth => auth.country === selectedCountry);
    const positions = getCountryPositions(selectedCountry);

    return (
      <Box>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToGrid}
          sx={{ mb: 2 }}
        >
          Back to all countries
        </Button>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar 
              src={authority.flag} 
              sx={{ width: 60, height: 60 }}
              variant="rounded"
            />
            <Box>
              <Typography variant="h4">{authority.country}</Typography>
              <Typography variant="h6">{authority.name}</Typography>
            </Box>
          </Box>

          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            Main Positions
          </Typography>
          <Grid container spacing={2}>
            {positions
              .filter(pos => ALL_POSITIONS.main.includes(pos.title))
              .map((position) => (
                <Grid item xs={12} sm={6} key={position.title}>
                  <PositionCard 
                    position={position}
                    onAssign={() => handleOpenPositionForm(position.title)}
                  />
                </Grid>
            ))}
          </Grid>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Subcommittees
          </Typography>
          <Grid container spacing={2}>
            {positions
              .filter(pos => ALL_POSITIONS.subcommittees.includes(pos.title))
              .map((position) => (
                <Grid item xs={12} sm={6} key={position.title}>
                  <PositionCard 
                    position={position}
                    onAssign={() => handleOpenPositionForm(position.title)}
                  />
                </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    );
  };

  const renderGridView = () => (
    <Grid container spacing={3}>
      {filteredAuthorities.map((authority) => (
        <Grid item xs={12} sm={6} md={4} key={authority.country}>
          <CountryCard
            country={authority.country}
            flag={authority.flag}
            onClick={() => handleCountrySelect(authority.country)}
            extraContent={
              <>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 'medium' }}>
                  {authority.name}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip 
                    label={`${authority.positions.length} of ${ALL_POSITIONS.main.length + ALL_POSITIONS.subcommittees.length} positions filled`} 
                    size="small" 
                    color="info"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </>
            }
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="h4">
            {viewMode === 'country' ? selectedCountry : 'Revenue Authorities'}
          </Typography>
          
          {viewMode === 'grid' && (
            <TextField
              label="Search Authorities"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
              }}
              sx={{ width: 300 }}
            />
          )}
        </Box>

        {viewMode === 'country' ? renderCountryView() : renderGridView()}
      </motion.div>

      {/* Position Assignment Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedPosition ? `Assign to ${selectedPosition}` : 'Assign Position'}
          <Typography variant="subtitle2" color="text.secondary">
            {selectedCountry}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <UserForm
            onSubmit={handleSubmit}
            onCancel={() => setOpenDialog(false)}
            isLoading={loading}
            position={selectedPosition}
            country={selectedCountry}
            currentHolder={
              authorities
                .find(auth => auth.country === selectedCountry)
                ?.positions?.find(pos => pos.title === selectedPosition)
            }
          />
        </DialogContent>
      </Dialog>

      {/* Notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Reusable position card component
const PositionCard = ({ position, onAssign }) => {
  return (
    <Paper sx={{ 
      p: 2,
      height: '100%',
      borderLeft: `4px solid ${position.occupied ? '#4caf50' : '#ff9800'}`,
      '&:hover': {
        boxShadow: 3
      }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {position.title}
        </Typography>
        <Chip 
          label={position.occupied ? 'Filled' : 'Vacant'} 
          color={position.occupied ? 'success' : 'warning'}
          size="small"
        />
      </Box>
      
      {position.occupied ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Current Holder:</strong> {position.currentHolder}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {position.email}
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> {position.phone}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
          Position currently vacant
        </Typography>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          size="small"
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            onAssign();
          }}
          startIcon={<PersonAddIcon />}
        >
          {position.occupied ? 'Reassign' : 'Assign'}
        </Button>
      </Box>
    </Paper>
  );
};


export default Authorities;