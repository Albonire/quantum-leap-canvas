
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'hover' | 'auto' | 'none';
}

const GlitchText = ({ 
  children, 
  className,
  intensity = 'medium',
  trigger = 'hover'
}: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (trigger === 'auto') {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [trigger]);

  const intensityClasses = {
    low: 'animate-pulse',
    medium: 'animate-glitch',
    high: 'animate-glitch'
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsGlitching(false);
    }
  };

  return (
    <span
      className={cn(
        "relative inline-block font-space-grotesk font-bold cyber-text",
        isGlitching && intensityClasses[intensity],
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-text={children}
    >
      {children}
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 w-full h-full text-red-500 opacity-70 animate-glitch"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translateX(-2px)'
            }}
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 w-full h-full text-cyan-400 opacity-70 animate-glitch"
            style={{ 
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translateX(2px)'
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
