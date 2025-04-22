import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const CountryCard = ({ country, flag, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StyledCard onClick={onClick} sx={{ cursor: 'pointer' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar src={flag} sx={{ width: 40, height: 40, mr: 2 }} />
            <Typography variant="h6" component="div">
              {country}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Click to view positions
          </Typography>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default CountryCard;