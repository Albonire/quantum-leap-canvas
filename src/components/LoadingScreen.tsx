
'use client';

import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Inicializando...');

  const loadingSteps = [
    'Inicializando sistemas...',
    'Cargando arsenal tecnológico...',
    'Preparando proyectos...',
    'Configurando interfaz...',
    'Activando modo cyberpunk...',
    'Sistemas listos!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update loading text based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-void-black flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyber-lime rounded-full animate-ping opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-sage-accent rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyber-lime/30 rounded-full animate-bounce" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-sage-accent/50 rounded-full animate-ping" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{
               backgroundImage: `linear-gradient(rgba(164, 255, 0, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(164, 255, 0, 0.1) 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold text-quantum-silver mb-2">
            <GlitchText trigger="auto" intensity="low">
              Anderson
            </GlitchText>
          </h1>
          <p className="text-cyber-lime font-space-grotesk font-semibold text-lg">
            González
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-charcoal/50 rounded-full h-2 overflow-hidden border border-cyber-lime/30">
            <div 
              className="h-full bg-gradient-to-r from-sage-accent to-cyber-lime transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-sage-accent to-cyber-lime animate-pulse opacity-50" />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-quantum-silver/70">
            <span>0%</span>
            <span className="text-cyber-lime font-semibold">{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-8">
          <p className="text-quantum-silver font-inter text-lg animate-pulse">
            {loadingText}
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-cyber-lime rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-sage-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-cyber-lime rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        {/* Scanning line effect */}
        <div className="absolute -bottom-20 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-lime to-transparent animate-pulse" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-cyber-lime opacity-30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-cyber-lime opacity-30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-cyber-lime opacity-30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-cyber-lime opacity-30" />
    </div>
  );
};

export default LoadingScreen;
