import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CyberCursor from '@/components/CyberCursor';
import StarryBackground from '@/components/StarryBackground';
import ThemeToggle from '@/components/ThemeToggle';
import HeroSection from '@/components/HeroSection';
import EducationSection from '@/components/EducationSection';
import TechSection from '@/components/TechSection';
import ProjectsSection from '@/components/ProjectsSection';
import GitHubProfile from '@/components/GitHubProfile';
import ContactSection from '@/components/ContactSection';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / 500);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className={`min-h-screen relative transition-colors duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background effects */}
        <StarryBackground />
        <CyberCursor />
        <ThemeToggle />
        <Navbar />
        
        {/* Main content with reduced spacing */}
        <main className="relative z-10 space-y-8">
          <div id="hero"><HeroSection /></div>
          <div id="education"><EducationSection /></div>
          <div id="tech"><TechSection /></div>
          <div id="projects"><ProjectsSection /></div>
          <div id="github"><GitHubProfile /></div>
          <div id="contact"><ContactSection /></div>
        </main>
        
        {/* Footer */}
        <footer className="relative z-10 py-6 sm:py-8 px-4 sm:px-6 border-t border-sage-accent/30 dark:border-cyber-lime/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-800 dark:text-quantum-silver font-inter font-medium text-sm sm:text-base">
              © 2024 Anderson González. Desarrollado con{' '}
              <span className="text-sage-accent dark:text-cyber-lime animate-pulse">❤️</span>
              {' '}y tecnología del futuro.
            </p>
            <div className="mt-3 sm:mt-4 flex justify-center gap-4 sm:gap-6 flex-wrap">
              <a href="https://github.com/Albonire" className="text-gray-700 dark:text-quantum-silver hover:text-sage-accent dark:hover:text-cyber-lime transition-colors font-medium text-sm sm:text-base">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/anderson-gonzaleza21/" className="text-gray-700 dark:text-quantum-silver hover:text-sage-accent dark:hover:text-cyber-lime transition-colors font-medium text-sm sm:text-base">
                LinkedIn
              </a>
              <a href="https://x.com/anderso37646360" className="text-gray-700 dark:text-quantum-silver hover:text-sage-accent dark:hover:text-cyber-lime transition-colors font-medium text-sm sm:text-base">
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
