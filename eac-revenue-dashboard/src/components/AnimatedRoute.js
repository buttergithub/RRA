import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AnimatedRoute = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedRoute;