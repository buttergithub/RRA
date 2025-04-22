import { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import CountryCard from '../components/CountryCard';

const countries = [
  { name: 'Rwanda', flag: 'https://flagcdn.com/rw.svg' },
  { name: 'Uganda', flag: 'https://flagcdn.com/ug.svg' },
  { name: 'Kenya', flag: 'https://flagcdn.com/ke.svg' },
  { name: 'Tanzania', flag: 'https://flagcdn.com/tz.svg' },
  { name: 'Zanzibar', flag: 'https://flagcdn.com/tz.svg' }, // Note: Zanzibar uses Tanzania's flag
  { name: 'Burundi', flag: 'https://flagcdn.com/bi.svg' },
  { name: 'South Sudan', flag: 'https://flagcdn.com/ss.svg' },
];

const Dashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          East Africa Revenue Authorities
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Manage positions and personnel across all revenue authorities in the East
          African Community
        </Typography>

        <Grid container spacing={3}>
          {countries.map((country, index) => (
            <Grid item xs={12} sm={6} md={4} key={country.name}>
              <CountryCard
                country={country.name}
                flag={country.flag}
                onClick={() => setSelectedCountry(country.name)}
              />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard;