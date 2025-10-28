import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Github } from 'lucide-react';

const navItems = [
  { id: 'hero', icon: Home, tooltip: 'Home' },
  { id: 'education', icon: User, tooltip: 'Education' },
  { id: 'tech', icon: Code, tooltip: 'Tech' },
  { id: 'projects', icon: Briefcase, tooltip: 'Projects' },
  { id: 'github', icon: Github, tooltip: 'GitHub' },
  { id: 'contact', icon: Mail, tooltip: 'Contact' },
];

// Note: isMounted is no longer needed here for animation, but isVisible is kept for the active section logic.
const Navbar = ({ isVisible }: { isVisible: boolean }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      if (isVisible) {
        const sections = navItems.map(item => document.getElementById(item.id));
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        let currentSection = 'hero';
        for (const section of sections) {
          if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            currentSection = section.id;
            break;
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar (No longer motion, positioned by Header) */}
      <nav
        className={`hidden md:flex absolute top-4 left-0 z-50 p-1 rounded-full border group transition-all duration-300 ${
          isScrolled
            ? 'bg-white/20 dark:bg-black/50 border-sage-accent/50 dark:border-cyber-lime/50 backdrop-blur-2xl shadow-lg shadow-sage-accent/10 dark:shadow-cyber-lime/10'
            : 'bg-white/5 dark:bg-black/10 border-sage-accent/20 dark:border-cyber-lime/20 backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
          {navItems.map((item) => (
            <MagneticIcon key={item.id} item={item} isActive={activeSection === item.id} isNavbarVisible={isVisible} onClick={() => scrollToSection(item.id)} />
          ))}
        </div>
      </nav>

      {/* Mobile Menu Button (No longer motion, positioned by Header) */}
      <div className="md:hidden absolute top-4 left-4 sm:top-6 z-[60]">
        <HamburgerButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + navItems.indexOf(item) * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-4 text-2xl font-bold ${activeSection === item.id ? 'text-sage-accent dark:text-cyber-lime' : 'text-gray-800 dark:text-quantum-silver'}`}
                >
                  <item.icon size={24} />
                  <span>{item.tooltip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HamburgerButton = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  const variant = isOpen ? 'opened' : 'closed';
  const top = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: 45, translateY: 5 },
  };
  const center = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };
  const bottom = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: -45, translateY: -5 },
  };

  return (
    <button onClick={() => setIsOpen(!isOpen)} className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
      <motion.span className="block h-0.5 w-6 bg-gray-800 dark:bg-quantum-silver" variants={top} animate={variant}></motion.span>
      <motion.span className="block h-0.5 w-6 bg-gray-800 dark:bg-quantum-silver" variants={center} animate={variant}></motion.span>
      <motion.span className="block h-0.5 w-6 bg-gray-800 dark:bg-quantum-silver" variants={bottom} animate={variant}></motion.span>
    </button>
  );
};

const MagneticIcon = ({ item, isActive, isNavbarVisible, onClick }: { item: any, isActive: boolean, isNavbarVisible: boolean, onClick: () => void }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative z-10 flex flex-col items-center justify-center gap-0.5 xs:gap-0.5 sm:gap-1 cursor-pointer p-0.5 xs:p-0.75 sm:p-1 rounded-lg"
    >
      <div
        className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full transition-all duration-300 relative hover:shadow-lg hover:shadow-sage-accent/40 dark:hover:shadow-cyber-lime/30 ${isActive ? 'text-void-black' : 'text-gray-800 dark:text-quantum-silver'}`}
      >
        <item.icon size={windowWidth < 480 ? 16 : windowWidth < 640 ? 18 : windowWidth < 768 ? 20 : 22} />
      </div>
      <span
        className={`hidden md:block text-[10px] sm:text-xs font-bold transition-all duration-300 ease-in-out max-h-0 opacity-0 group-hover:max-h-5 group-hover:opacity-100 overflow-hidden ${isActive ? 'text-sage-accent dark:text-cyber-lime' : 'text-gray-700 dark:text-silver-mist'}`}
      >
        {item.tooltip}
      </span>
      
      {isActive && isNavbarVisible && (
        <motion.div
          className="absolute top-0.5 xs:top-0.75 sm:top-1 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-sage-accent dark:bg-cyber-lime -z-10"
          layoutId={isNavbarVisible ? "active-pill" : undefined}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}
    </motion.div>
  );
};

export default Navbar;