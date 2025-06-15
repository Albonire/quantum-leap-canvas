
'use client';

import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import CyberButton from './CyberButton';
import LiquidGlassCard from './LiquidGlassCard';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Liquid glass floating elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-32 h-32 morphing-glass opacity-30" />
        <div className="absolute top-1/3 right-16 w-24 h-24 liquid-blob opacity-40" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-20 liquid-glass opacity-25" />
        
        {/* Enhanced geometric floating shapes with liquid glass */}
        <div className="absolute top-20 left-20 w-20 h-20 border border-cyber-lime rotate-45 animate-spin-slow opacity-30" />
        <div className="absolute top-40 right-32 w-16 h-16 bg-cyber-lime/10 rotate-12 animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border-2 border-matrix-green rounded-full animate-bounce opacity-20" />
        <div className="absolute bottom-20 right-20 w-32 h-1 bg-gradient-to-r from-transparent via-cyber-lime to-transparent animate-pulse" />
        
        {/* New professional accents */}
        <div className="absolute top-1/2 left-10 w-2 h-40 bg-gradient-to-b from-cyber-lime/0 via-cyber-lime/50 to-cyber-lime/0 animate-pulse" />
        <div className="absolute top-1/3 right-16 w-12 h-12 border-2 border-cyber-lime rounded-full animate-ping opacity-20" />
      </div>

      {/* Main content with liquid glass background */}
      <LiquidGlassCard className="relative z-10 text-center max-w-5xl mx-auto" size="lg">
        {/* Professional greeting */}
        <div className="mb-8">
          <p className="text-lg md:text-xl text-quantum-silver font-inter mb-4 tracking-wide">
            Hola, soy
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-space-grotesk font-bold mb-4">
            <GlitchText trigger="auto" intensity="medium">
              Anderson
            </GlitchText>
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold cyber-text glow-text mb-6">
            González
          </h2>
          
          {/* Professional title with liquid glass styling */}
          <LiquidGlassCard className="inline-block" size="sm">
            <p className="text-cyber-lime font-space-grotesk font-semibold text-lg">
              Desarrollador Full Stack
            </p>
          </LiquidGlassCard>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <CyberButton 
            size="lg" 
            onClick={() => scrollToSection('projects')}
            className="group transform hover:scale-105 transition-all duration-300"
          >
            <span>Ver mis proyectos</span>
            <div className="w-2 h-2 bg-cyber-lime rounded-full animate-pulse ml-2" />
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-cyber-lime rounded-full flex justify-center animate-pulse">
            <div className="w-1 h-3 bg-cyber-lime rounded-full animate-bounce mt-2" />
          </div>
        </div>
      </LiquidGlassCard>

      {/* Enhanced holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-lime/5 to-transparent pointer-events-none" />
      
      {/* Professional grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{
             backgroundImage: `linear-gradient(rgba(164, 255, 0, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(164, 255, 0, 0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }} 
      />
    </section>
  );
};

export default HeroSection;
