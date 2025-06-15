
import { useEffect } from 'react';
import CyberCursor from '@/components/CyberCursor';
import StarryBackground from '@/components/StarryBackground';
import ThemeToggle from '@/components/ThemeToggle';
import HeroSection from '@/components/HeroSection';
import EducationSection from '@/components/EducationSection';
import TechSection from '@/components/TechSection';
import ProjectsSection from '@/components/ProjectsSection';
import GitHubProfile from '@/components/GitHubProfile';
import ContactSection from '@/components/ContactSection';
import ParallaxSection from '@/components/ParallaxSection';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';

const Index = () => {
  const { } = useScrollAnimations();

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0s');
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-cream via-pearl-white to-cream dark:bg-void-black transition-colors duration-300">
      {/* Enhanced background effects */}
      <StarryBackground />
      <AnimatedBackground />
      <CyberCursor />
      <ThemeToggle />
      
      {/* Main content with advanced parallax sections */}
      <main className="relative z-10">
        <ParallaxSection speed={0.3} gradient>
          <HeroSection />
        </ParallaxSection>
        
        <ParallaxSection speed={0.4} gradient className="py-20">
          <EducationSection />
        </ParallaxSection>
        
        <ParallaxSection speed={0.5} gradient className="py-20">
          <TechSection />
        </ParallaxSection>
        
        <ParallaxSection speed={0.6} gradient className="py-20">
          <ProjectsSection />
        </ParallaxSection>
        
        <ParallaxSection speed={0.4} gradient className="py-20">
          <GitHubProfile />
        </ParallaxSection>
        
        <ParallaxSection speed={0.3} gradient className="py-20">
          <ContactSection />
        </ParallaxSection>
      </main>
      
      {/* Enhanced footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-sage-accent/30 dark:border-cyber-lime/20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto text-center animate-on-scroll">
          <p className="text-gray-800 dark:text-quantum-silver font-inter font-medium">
            © 2024 Anderson González. Desarrollado con{' '}
            <span className="text-sage-accent dark:text-cyber-lime animate-pulse">❤️</span>
            {' '}y tecnología del futuro.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-gray-700 dark:text-quantum-silver hover:text-sage-accent dark:hover:text-cyber-lime transition-all duration-300 transform hover:scale-110 font-medium">
              GitHub
            </a>
            <a href="#" className="text-gray-700 dark:text-quantum-silver hover:text-sage-accent dark:hover:text-cyber-lime transition-all duration-300 transform hover:scale-110 font-medium">
              LinkedIn
            </a>
            <a href="#" className="text-gray-700 dark:text-quantum-silver hover:text-sage-accent dark:hover:text-cyber-lime transition-all duration-300 transform hover:scale-110 font-medium">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
