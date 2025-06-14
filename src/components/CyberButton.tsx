
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const CyberButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className,
  disabled = false 
}: CyberButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const baseClasses = "relative overflow-hidden font-space-grotesk font-semibold transition-all duration-300 transform clickable";
  
  const variantClasses = {
    primary: "bg-transparent border-2 border-cyber-lime text-cyber-lime hover:bg-cyber-lime hover:text-void-black hover:shadow-[0_0_30px_#a4ff00]",
    secondary: "bg-neural-gray border-2 border-quantum-silver text-quantum-silver hover:border-cyber-lime hover:text-cyber-lime",
    ghost: "bg-transparent text-cyber-lime hover:bg-cyber-lime/10"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        isHovering && "scale-105",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={disabled}
    >
      {/* Scanning line effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-lime to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Glow effect */}
      {isHovering && (
        <div className="absolute inset-0 bg-cyber-lime/20 blur-xl -z-10 animate-pulse" />
      )}
    </button>
  );
};

export default CyberButton;
