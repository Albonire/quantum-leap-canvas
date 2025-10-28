import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';

const Header = ({ isVisible, isMounted }: { isVisible: boolean, isMounted: boolean }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isMounted && isVisible ? 0 : -120, opacity: isMounted ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="relative max-w-7xl mx-auto">
        <Navbar isVisible={isVisible} isMounted={isMounted} />
        <ThemeToggle />
      </div>
    </motion.header>
  );
};

export default Header;
