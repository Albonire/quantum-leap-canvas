
import CyberCursor from '@/components/CyberCursor';
import StarryBackground from '@/components/StarryBackground';
import ThemeToggle from '@/components/ThemeToggle';
import HeroSection from '@/components/HeroSection';
import EducationSection from '@/components/EducationSection';
import TechSection from '@/components/TechSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-void-black dark:bg-void-black light:bg-slate-50 transition-colors duration-300">
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
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-cyber-lime/20 dark:border-cyber-lime/20 light:border-emerald-accent/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-quantum-silver dark:text-quantum-silver light:text-charcoal font-inter">
            © 2024 Anderson González. Desarrollado con{' '}
            <span className="text-cyber-lime dark:text-cyber-lime light:text-emerald-accent animate-pulse">❤️</span>
            {' '}y tecnología del futuro.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-quantum-silver dark:text-quantum-silver light:text-charcoal hover:text-cyber-lime dark:hover:text-cyber-lime light:hover:text-emerald-accent transition-colors">
              GitHub
            </a>
            <a href="#" className="text-quantum-silver dark:text-quantum-silver light:text-charcoal hover:text-cyber-lime dark:hover:text-cyber-lime light:hover:text-emerald-accent transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-quantum-silver dark:text-quantum-silver light:text-charcoal hover:text-cyber-lime dark:hover:text-cyber-lime light:hover:text-emerald-accent transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
