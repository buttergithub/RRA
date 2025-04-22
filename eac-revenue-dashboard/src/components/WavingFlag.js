import { motion } from 'framer-motion';
import { Box, Typography, Tooltip } from '@mui/material';

const WavingFlag = ({ country, flagUrl, onClick }) => {
  return (
    <Tooltip title={`Select ${country}`} arrow>
      <Box
        component={motion.div}
        sx={{
          position: 'relative',
          width: 140,
          height: 100,
          cursor: 'pointer',
          m: 2,
          overflow: 'hidden',
          borderRadius: 1,
          boxShadow: 3,
        }}
        onClick={onClick}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { type: 'spring', stiffness: 100 }
        }}
      >
        {/* Flag Image with Wave Effect */}
        <Box
          component={motion.div}
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${flagUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          animate={{
            rotate: [0, 3, -3, 0],
            transition: {
              repeat: Infinity,
              duration: 8,
              ease: 'linear'
            }
          }}
        />
        
        {/* Country Name Overlay */}
        <Box
          component={motion.div}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            p: 1,
            textAlign: 'center'
          }}
          initial={{ y: 20 }}
          animate={{ 
            y: 0,
            transition: { delay: 0.3 }
          }}
        >
          <Typography variant="subtitle2">{country}</Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default WavingFlag;