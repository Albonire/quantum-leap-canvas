
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Github } from 'lucide-react';

const navItems = [
  { id: 'hero', icon: Home, tooltip: 'Home' },
  { id: 'education', icon: User, tooltip: 'Education' },
  { id: 'tech', icon: Code, tooltip: 'Tech' },
  { id: 'projects', icon: Briefcase, tooltip: 'Projects' },
  { id: 'github', icon: Github, tooltip: 'GitHub' },
  { id: 'contact', icon: Mail, tooltip: 'Contact' },
];

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);

    const handleScroll = () => {
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
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isMounted ? 0 : -100, opacity: isMounted ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-[20%] -translate-x-1/2 z-50 p-1 rounded-full bg-white/5 dark:bg-black/10 border border-sage-accent/20 dark:border-cyber-lime/20 backdrop-blur-xl group"
    >
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <MagneticIcon key={item.id} item={item} isActive={activeSection === item.id} onClick={() => scrollToSection(item.id)} />
        ))}
      </div>
    </motion.nav>
  );
};

const MagneticIcon = ({ item, isActive, onClick }: { item: any, isActive: boolean, onClick: () => void }) => {
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
      className="relative z-10 flex flex-col items-center justify-center gap-1 cursor-pointer p-1 rounded-lg"
    >
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300 ${isActive ? 'text-sage-accent dark:text-cyber-lime' : 'text-gray-800 dark:text-quantum-silver'}`}
      >
        <item.icon size={22} />
      </div>
      <span
        className={`text-xs font-bold transition-all duration-300 ease-in-out max-h-0 opacity-0 group-hover:max-h-5 group-hover:opacity-100 overflow-hidden ${isActive ? 'text-sage-accent dark:text-cyber-lime' : 'text-gray-700 dark:text-silver-mist'}`}
      >
        {item.tooltip}
      </span>
    </motion.div>
  );
};

export default Navbar;
