
import CyberCursor from '@/components/CyberCursor';
import StarryBackground from '@/components/StarryBackground';
import MatrixRain from '@/components/MatrixRain';
import HeroSection from '@/components/HeroSection';
import EducationSection from '@/components/EducationSection';
import TechSection from '@/components/TechSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starry space background */}
      <StarryBackground />
      
      {/* Reduced matrix rain opacity for space theme */}
      <div className="opacity-30">
        <MatrixRain />
      </div>
      
      <CyberCursor />
      
      {/* Main content with reduced spacing */}
      <main className="relative z-10 space-y-8">
        <HeroSection />
        <EducationSection />
        <TechSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-cyber-lime/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-quantum-silver font-inter">
            © 2024 Anderson González. Desarrollado con{' '}
            <span className="text-cyber-lime animate-pulse">❤️</span>
            {' '}y tecnología del futuro.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-quantum-silver hover:text-cyber-lime transition-colors">
              GitHub
            </a>
            <a href="#" className="text-quantum-silver hover:text-cyber-lime transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-quantum-silver hover:text-cyber-lime transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
