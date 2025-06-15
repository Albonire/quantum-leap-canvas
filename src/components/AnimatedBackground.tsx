
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create dynamic particles
    const particleCount = 50;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full pointer-events-none';
      particle.style.width = Math.random() * 4 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = Math.random() > 0.5 
        ? 'rgba(107, 142, 107, 0.3)' 
        : 'rgba(164, 255, 0, 0.2)';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    particles.forEach((particle, index) => {
      const duration = 10 + Math.random() * 20;
      const delay = Math.random() * 5;
      
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: Math.random() * 0.8 + 0.2,
        scale: Math.random() * 1.5 + 0.5,
        duration: duration,
        delay: delay,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });

      // Rotation animation
      gsap.to(particle, {
        rotation: 360,
        duration: duration * 0.5,
        ease: 'none',
        repeat: -1,
      });
    });

    // Dynamic gradient background
    const gradientAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    
    gradientAnimation.to(container, {
      background: 'radial-gradient(ellipse at 20% 80%, rgba(107, 142, 107, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(164, 255, 0, 0.06) 0%, transparent 50%)',
      duration: 8,
      ease: 'power2.inOut',
    }).to(container, {
      background: 'radial-gradient(ellipse at 70% 30%, rgba(107, 142, 107, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(164, 255, 0, 0.08) 0%, transparent 50%)',
      duration: 8,
      ease: 'power2.inOut',
    });

    return () => {
      particles.forEach(particle => particle.remove());
      gsap.killTweensOf(container);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(107, 142, 107, 0.05) 0%, transparent 50%)',
      }}
    />
  );
};

export default AnimatedBackground;
