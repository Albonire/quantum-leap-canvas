import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import CyberButton from './CyberButton';
import TypingTitle from './TypingTitle';
import { CV_URL } from '@/lib/utils';

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
    const link = document.createElement('a');
    link.href = CV_URL;
    link.download = 'Anderson_Gonzalez_CV.pdf';
    link.click();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects removed, now handled by Index.tsx */}

      {/* Main content with zoom in effect */}
      <div className={`relative z-10 text-center max-w-5xl mx-auto px-6 mt-24 transition-all duration-1000 ease-out ${
        isLoaded 
          ? 'scale-100 opacity-100' 
          : 'scale-95 opacity-0'
      }`}>
        {/* Professional greeting */}
        <div className="mb-8">
          <p className={`text-lg md:text-xl text-gray-700 dark:text-quantum-silver font-inter mb-4 tracking-wide font-medium transition-all duration-700 delay-200 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Hi, I'm
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
          
          <div className={`flex justify-center items-center mb-8 transition-all duration-700 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <TypingTitle titles={["FullStack Developer", "Systems Engineer", "React Specialist", "Python Expert"]} />
          </div>
        </div>

        {/* Personal Description with ultra-transparent glassmorphism and visible border */}
        <div className={`mb-12 max-w-4xl mx-auto transition-all duration-700 delay-600 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="relative rounded-2xl p-8 overflow-hidden bg-white/5 dark:bg-black/10 border-2 border-sage-accent/30 dark:border-cyber-lime/30 backdrop-blur-sm">
            {/* Content */}
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-900 dark:text-pearl-white/95 font-inter leading-relaxed mb-4 font-medium">
              I am a developer with a keen interest in creating innovative digital solutions. 
              I possess extensive experience with modern technologies such as <span className="text-sage-accent dark:text-cyber-lime font-semibold">React</span>, 
                <span className="text-sage-accent dark:text-cyber-lime font-semibold"> Node.js</span> & <span className="text-sage-accent dark:text-cyber-lime font-semibold">Python</span>, 
                allowing me to deliver scalable web applications and exceptional user experiences.
              </p>
              <p className="text-base md:text-lg text-gray-700 dark:text-silver-mist/90 font-inter leading-relaxed font-medium">
              I'm passionate about writing clean, efficient code and following the best practices in development. 
              I enjoy working with diverse teams and believe that collaborating across disciplines makes projects better. 
              I'm always eager to learn new tech and take on challenges that help me grow as a developer.

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
            <span>View my projects</span>
            <div className="w-2 h-2 bg-sage-accent dark:bg-cyber-lime rounded-full animate-pulse ml-2" />
          </CyberButton>
          
          <CyberButton 
            variant="secondary" 
            size="lg"
            onClick={downloadCV}
            className="transform hover:scale-105 transition-all duration-300"
          >
            <span>Download CV</span>
            <div className="w-2 h-2 bg-sage-accent dark:bg-cyber-lime rounded-full animate-pulse ml-2" />
          </CyberButton>
          
          <CyberButton 
            variant="secondary" 
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="transform hover:scale-105 transition-all duration-300"
          >
            Let's work together
          </CyberButton>
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