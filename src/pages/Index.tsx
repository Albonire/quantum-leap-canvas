
import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-cream via-pearl-white to-cream dark:bg-void-black transition-colors duration-300">
      {/* Background effects */}
      <StarryBackground />
      <CyberCursor />
      <ThemeToggle />
      
      {/* Main content with reduced spacing */}
      <main className="relative z-10 space-y-8">
        <HeroSection />
        <EducationSection />
        <TechSection />
        <ProjectsSection />
        <GitHubProfile />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-sage-accent/30 dark:border-cyber-lime/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-800 dark:text-quantum-silver font-inter font-medium">
            © 2024 Anderson González. Desarrollado con{' '}
            <span className="text-sage-accent dark:text-cyber-lime animate-pulse">❤️</span>
            {' '}y tecnología del futuro.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-gray-700 dark:text-quantum-silver hover:text-sage-accent dark:hover:text-cyber-lime transition-colors font-medium">
              GitHub
            </a>
            <a href="#" className="text-gray-700 dark:text-quantum-silver hover:text-sage-accent dark:hover:text-cyber-lime transition-colors font-medium">
              LinkedIn
            </a>
            <a href="#" className="text-gray-700 dark:text-quantum-silver hover:text-sage-accent dark:hover:text-cyber-lime transition-colors font-medium">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
