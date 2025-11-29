import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Github } from 'lucide-react';

// Re-add sub-components that were previously deleted by mistake
type NavItem = { id: string; icon: React.ElementType; tooltip: string };
const MagneticIcon = ({ item, isActive, isNavbarVisible, onClick }: { item: NavItem; isActive: boolean; isNavbarVisible: boolean; onClick: () => void }) => {
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

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative z-10 flex flex-col items-center justify-center gap-1 cursor-pointer p-1 rounded-lg"
    >
      <div className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 relative ${isActive ? 'text-void-black' : 'text-gray-800 dark:text-quantum-silver'}`}>
        <item.icon size={22} />
      </div>
      <span className={`hidden md:block text-xs font-bold transition-all duration-200 ease-in-out max-h-0 opacity-0 group-hover:max-h-5 group-hover:opacity-100 overflow-hidden ${isActive ? 'text-sage-accent dark:text-cyber-lime' : 'text-gray-700 dark:text-silver-mist'}`}>
        {item.tooltip}
      </span>
      {isActive && isNavbarVisible && (
        <motion.div
          className="absolute top-1 w-9 h-9 rounded-full bg-sage-accent dark:bg-cyber-lime -z-10"
          layoutId="active-pill"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}
    </motion.div>
  );
};

const HamburgerButton = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  const variant = isOpen ? 'opened' : 'closed';
  const top = { closed: { rotate: 0, translateY: 0 }, opened: { rotate: 45, translateY: 5 } };
  const center = { closed: { opacity: 1 }, opened: { opacity: 0 } };
  const bottom = { closed: { rotate: 0, translateY: 0 }, opened: { rotate: -45, translateY: -5 } };

  return (
    <button onClick={() => setIsOpen(!isOpen)} className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
      <motion.span className="block h-0.5 w-6 bg-gray-800 dark:bg-quantum-silver" variants={top} animate={variant}></motion.span>
      <motion.span className="block h-0.5 w-6 bg-gray-800 dark:bg-quantum-silver" variants={center} animate={variant}></motion.span>
      <motion.span className="block h-0.5 w-6 bg-gray-800 dark:bg-quantum-silver" variants={bottom} animate={variant}></motion.span>
    </button>
  );
};

const navItems: NavItem[] = [
  { id: 'hero', icon: Home, tooltip: 'Home' },
  { id: 'education', icon: User, tooltip: 'Education' },
  { id: 'tech', icon: Code, tooltip: 'Tech' },
  { id: 'projects', icon: Briefcase, tooltip: 'Projects' },
  { id: 'github', icon: Github, tooltip: 'GitHub' },
  { id: 'contact', icon: Mail, tooltip: 'Contact' },
];

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar: No positioning, inherits from Header */}
      <nav className={`hidden md:flex p-1 rounded-full border group shadow-inner shadow-black/10 dark:shadow-white/10 ${
          isScrolled
            ? 'bg-white/30 dark:bg-black/60 border-sage-accent/60 dark:border-cyber-lime/60 backdrop-blur-2xl'
            : 'bg-white/20 dark:bg-black/30 border-sage-accent/40 dark:border-cyber-lime/40 backdrop-blur-xl'
        }`}>
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <MagneticIcon key={item.id} item={item} isActive={activeSection === item.id} isNavbarVisible={isVisible} onClick={() => scrollToSection(item.id)} />
          ))}
        </div>
      </nav>

      {/* Mobile Menu Button: No positioning, inherits from Header */}
      <div className="md:hidden">
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

export default Navbar;
