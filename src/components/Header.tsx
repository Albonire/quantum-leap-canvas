import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';

const Header = ({ isVisible, isLoaded }: { isVisible: boolean, isLoaded: boolean }) => {
  return (
    <motion.header
      initial={{ y: '-120%' }}
      animate={{ y: isLoaded && isVisible ? 0 : '-120%' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="relative max-w-7xl mx-auto flex items-start justify-between p-4 sm:p-6">
        <Navbar isVisible={isVisible} />
        <ThemeToggle />
      </div>
    </motion.header>
  );
};

export default Header;
