
'use client';

import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import CyberButton from './CyberButton';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadCV = () => {
    // Simular descarga del CV
    const link = document.createElement('a');
    link.href = '#'; // En producción, aquí iría la URL real del CV
    link.download = 'Anderson_Gonzalez_CV.pdf';
    link.click();
    
    // Mostrar mensaje de confirmación
    alert('CV descargado exitosamente!');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced geometric floating shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-20 h-20 border border-sage-accent dark:border-cyber-lime rotate-45 animate-spin-slow opacity-30" />
        <div className="absolute top-40 right-32 w-16 h-16 bg-sage-accent/10 dark:bg-cyber-lime/10 rotate-12 animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border-2 border-sage-accent dark:border-matrix-green rounded-full animate-bounce opacity-20" />
        <div className="absolute bottom-20 right-20 w-32 h-1 bg-gradient-to-r from-transparent via-sage-accent dark:via-cyber-lime to-transparent animate-pulse" />
        
        {/* New professional accents */}
        <div className="absolute top-1/2 left-10 w-2 h-40 bg-gradient-to-b from-sage-accent/0 dark:from-cyber-lime/0 via-sage-accent/50 dark:via-cyber-lime/50 to-sage-accent/0 dark:to-cyber-lime/0 animate-pulse" />
        <div className="absolute top-1/3 right-16 w-12 h-12 border-2 border-sage-accent dark:border-cyber-lime rounded-full animate-ping opacity-20" />
      </div>

      {/* Main content with zoom in effect */}
      <div className={`relative z-10 text-center max-w-5xl mx-auto px-6 transition-all duration-1000 ease-out ${
        isLoaded 
          ? 'scale-100 opacity-100' 
          : 'scale-95 opacity-0'
      }`}>
        {/* Professional greeting */}
        <div className="mb-8">
          <p className={`text-lg md:text-xl text-gray-700 dark:text-quantum-silver font-inter mb-4 tracking-wide font-medium transition-all duration-700 delay-200 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Hola, soy
          </p>
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-space-grotesk font-bold mb-4 text-gray-900 dark:text-quantum-silver transition-all duration-700 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <GlitchText trigger="auto" intensity="medium">
              Anderson
            </GlitchText>
          </h1>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-sage-accent dark:text-cyber-lime mb-6 transition-all duration-700 delay-400 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            González
          </h2>
          
          {/* Professional titles with enhanced styling */}
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 transition-all duration-700 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="inline-block bg-sage-accent/20 dark:bg-cyber-lime/10 border border-sage-accent/50 dark:border-cyber-lime/30 rounded-full px-6 py-3">
              <p className="text-sage-accent dark:text-cyber-lime font-space-grotesk font-semibold text-lg">
                Desarrollador Full Stack
              </p>
            </div>
            <div className="inline-block bg-sage-accent/20 dark:bg-cyber-lime/10 border border-sage-accent/50 dark:border-cyber-lime/30 rounded-full px-6 py-3">
              <p className="text-sage-accent dark:text-cyber-lime font-space-grotesk font-semibold text-lg">
                Ingeniero en Sistemas
              </p>
            </div>
          </div>
        </div>

        {/* Personal Description with custom liquid glass effect */}
        <div className={`mb-12 max-w-4xl mx-auto transition-all duration-700 delay-600 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div 
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: `0 8px 32px rgba(31, 38, 135, 0.2), 
                         inset 0 4px 20px rgba(255, 255, 255, 0.3)`
            }}
          >
            {/* Content */}
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-900 dark:text-pearl-white/95 font-inter leading-relaxed mb-4 font-medium">
                Soy un desarrollador apasionado por crear soluciones digitales innovadoras. 
                Con experiencia en tecnologías modernas como <span className="text-sage-accent dark:text-cyber-lime font-semibold">React</span>, 
                <span className="text-sage-accent dark:text-cyber-lime font-semibold"> Node.js</span> y <span className="text-sage-accent dark:text-cyber-lime font-semibold">Python</span>, 
                me especializo en construir aplicaciones web escalables y experiencias de usuario excepcionales.
              </p>
              <p className="text-base md:text-lg text-gray-700 dark:text-silver-mist/90 font-inter leading-relaxed font-medium">
                Mi enfoque se centra en la calidad del código, las mejores prácticas de desarrollo 
                y la colaboración efectiva en equipos multidisciplinarios. Siempre busco aprender 
                nuevas tecnologías y enfrentar desafíos que me permitan crecer profesionalmente.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 transition-all duration-700 delay-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <CyberButton 
            size="lg" 
            onClick={() => scrollToSection('projects')}
            className="group transform hover:scale-105 transition-all duration-300"
          >
            <span>Ver mis proyectos</span>
            <div className="w-2 h-2 bg-sage-accent dark:bg-cyber-lime rounded-full animate-pulse ml-2" />
          </CyberButton>
          
          <CyberButton 
            variant="secondary" 
            size="lg"
            onClick={downloadCV}
            className="transform hover:scale-105 transition-all duration-300"
          >
            <span>Descargar CV</span>
            <div className="w-2 h-2 bg-sage-accent dark:bg-cyber-lime rounded-full animate-pulse ml-2" />
          </CyberButton>
          
          <CyberButton 
            variant="secondary" 
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="transform hover:scale-105 transition-all duration-300"
          >
            Trabajemos juntos
          </CyberButton>
        </div>

        {/* Enhanced scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-800 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="w-6 h-10 border-2 border-sage-accent dark:border-cyber-lime rounded-full flex justify-center animate-pulse">
            <div className="w-1 h-3 bg-sage-accent dark:bg-cyber-lime rounded-full animate-bounce mt-2" />
          </div>
        </div>
      </div>

      {/* Enhanced holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sage-accent/5 dark:via-cyber-lime/5 to-transparent pointer-events-none" />
      
      {/* Professional grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{
             backgroundImage: `linear-gradient(rgba(107, 142, 107, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(107, 142, 107, 0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }} 
      />
    </section>
  );
};

export default HeroSection;
