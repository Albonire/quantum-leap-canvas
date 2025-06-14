
'use client';

import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import CyberButton from './CyberButton';

const HeroSection = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "Desarrollador Full Stack especializado en soluciones innovadoras";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Geometric floating shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-20 h-20 border border-cyber-lime rotate-45 animate-spin-slow opacity-30" />
        <div className="absolute top-40 right-32 w-16 h-16 bg-cyber-lime/10 rotate-12 animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border-2 border-matrix-green rounded-full animate-bounce opacity-20" />
        <div className="absolute bottom-20 right-20 w-32 h-1 bg-gradient-to-r from-transparent via-cyber-lime to-transparent animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Greeting with glitch effect */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-space-grotesk font-bold mb-4">
            <GlitchText trigger="auto" intensity="medium">
              Hola, soy
            </GlitchText>
          </h1>
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold cyber-text glow-text">
            Alex Cyber
          </h2>
        </div>

        {/* Typewriter description */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-quantum-silver font-inter">
            {typewriterText}
            <span className="animate-pulse text-cyber-lime">|</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <CyberButton 
            size="lg" 
            onClick={() => scrollToSection('projects')}
            className="group"
          >
            <span>Explora mi universo</span>
            <div className="w-2 h-2 bg-cyber-lime rounded-full animate-pulse ml-2" />
          </CyberButton>
          
          <CyberButton 
            variant="secondary" 
            size="lg"
            onClick={() => scrollToSection('contact')}
          >
            Iniciar transmisión
          </CyberButton>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-cyber-lime rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyber-lime rounded-full animate-bounce mt-2" />
          </div>
          <p className="text-sm text-quantum-silver mt-2 font-inter">Scroll para continuar</p>
        </div>
      </div>

      {/* Holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-lime/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
