
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
  const [isClicked, setIsClicked] = useState(false);

  const baseClasses = "relative overflow-hidden font-space-grotesk font-semibold transition-all duration-300 transform clickable group";
  
  const variantClasses = {
    primary: "bg-transparent border-2 border-sage-accent dark:border-cyber-lime text-sage-accent dark:text-cyber-lime hover:bg-sage-accent dark:hover:bg-cyber-lime hover:text-charcoal dark:hover:text-void-black hover:shadow-[0_0_30px_rgba(107,142,107,0.5)] dark:hover:shadow-[0_0_30px_#a4ff00]",
    secondary: "bg-white/20 dark:bg-neural-gray/50 border-2 border-steel-gray/50 dark:border-quantum-silver/50 text-charcoal dark:text-quantum-silver hover:border-sage-accent dark:hover:border-cyber-lime hover:text-sage-accent dark:hover:text-cyber-lime hover:bg-sage-accent/10 dark:hover:bg-cyber-lime/10",
    ghost: "bg-transparent text-sage-accent dark:text-cyber-lime hover:bg-sage-accent/10 dark:hover:bg-cyber-lime/10 border-2 border-transparent hover:border-sage-accent/30 dark:hover:border-cyber-lime/30"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-lg"
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
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
        isClicked && "scale-95",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={disabled}
    >
      {/* Enhanced scanning line effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-sage-accent dark:via-cyber-lime to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-sage-accent dark:border-cyber-lime opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-sage-accent dark:border-cyber-lime opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-sage-accent dark:border-cyber-lime opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-sage-accent dark:border-cyber-lime opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
      
      {/* Button content with enhanced animations */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-all duration-300 group-hover:text-shadow-glow">
        {children}
      </span>
      
      {/* Enhanced glow effect */}
      {isHovering && (
        <div className="absolute inset-0 bg-sage-accent/20 dark:bg-cyber-lime/20 blur-xl -z-10 animate-pulse" />
      )}
      
      {/* Ripple effect on click */}
      {isClicked && (
        <div className="absolute inset-0 bg-sage-accent/30 dark:bg-cyber-lime/30 rounded-full animate-ping -z-10" />
      )}
    </button>
  );
};

export default CyberButton;
