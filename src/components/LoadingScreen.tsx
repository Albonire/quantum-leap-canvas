'use client';

import { useState, useEffect, useMemo } from 'react';
import GlitchText from './GlitchText';

const loadingSteps = [
  'Initilizing portfolio...',
  'Compiling files...',
  'Rendering information...',
  'Desploying interface...',
  'Stablished connection'
];

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const DURATION = 1200; // 1.2 segundos
  const stepDuration = DURATION / loadingSteps.length;

  // Efecto de máquina de escribir
  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const targetText = loadingSteps[currentStep];
      let i = 0;
      setTypedText(''); // Limpiar texto anterior
      const typingInterval = setInterval(() => {
        if (i < targetText.length) {
          setTypedText(prev => prev + targetText[i]);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30); // Velocidad de escritura
      return () => clearInterval(typingInterval);
    }
  }, [currentStep]);

  // Lógica principal de la animación
  useEffect(() => {
    // Progreso de la barra
    const progressTimer = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / (DURATION / 50)), 100));
    }, 50);

    // Actualización de los pasos de texto
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => Math.min(prev + 1, loadingSteps.length -1));
    }, stepDuration);
    
    // Finalizar animación
    const mainTimer = setTimeout(() => {
      setIsVisible(false);
    }, DURATION);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearTimeout(mainTimer);
    };
  }, [stepDuration]);

  // Generador de partículas de fondo
  const particles = useMemo(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 5 + 5}s`,
    })), []);

  return (
    <div className={`fixed inset-0 z-50 bg-void-black flex items-center justify-center transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Fondo animado con más partículas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute bg-cyber-lime rounded-full animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: Math.random()
            }}
          />
        ))}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{
               backgroundImage: `linear-gradient(rgba(164, 255, 0, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(164, 255, 0, 0.1) 1px, transparent 1px)`,
               backgroundSize: '30px 30px'
             }} 
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
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

        <div className="mb-6">
          <div className="w-full bg-charcoal/50 rounded-full h-2 overflow-hidden border border-cyber-lime/30">
            <div 
              className="h-full bg-gradient-to-r from-sage-accent to-cyber-lime transition-all duration-100 ease-linear relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sage-accent to-cyber-lime animate-pulse opacity-50" />
            </div>
          </div>
        </div>

        {/* Texto con efecto de máquina de escribir */}
        <div className="mb-8 h-6">
          <p className="text-quantum-silver font-mono text-lg">
            {typedText}
            <span className="animate-ping">_</span>
          </p>
        </div>

        <div className="absolute -bottom-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-lime to-transparent animate-cyber-scan" />
      </div>

      {/* Acentos de esquina */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyber-lime/50 animate-pulse" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyber-lime/50 animate-pulse" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyber-lime/50 animate-pulse" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyber-lime/50 animate-pulse" />
    </div>
  );
};

export default LoadingScreen;
