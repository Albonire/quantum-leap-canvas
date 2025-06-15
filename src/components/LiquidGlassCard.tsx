
'use client';

import { cn } from '@/lib/utils';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'morphing' | 'floating';
  size?: 'sm' | 'md' | 'lg';
}

const LiquidGlassCard = ({ 
  children, 
  className,
  variant = 'default',
  size = 'md'
}: LiquidGlassCardProps) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'liquid-glass-card',
    morphing: 'morphing-glass',
    floating: 'liquid-glass-card liquid-blob'
  };

  return (
    <div className={cn(
      variantClasses[variant],
      sizeClasses[size],
      'relative group',
      className
    )}>
      {/* Liquid blob background effect */}
      {variant === 'floating' && (
        <div className="absolute -inset-4 liquid-blob opacity-20 -z-10" />
      )}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
      </div>
      
      {children}
    </div>
  );
};

export default LiquidGlassCard;
