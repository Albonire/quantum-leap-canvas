import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeTransition = () => {
  const { isTransitioning } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isTransitioning ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-0 bg-black z-[9999] pointer-events-none"
    />
  );
};

export default ThemeTransition;
