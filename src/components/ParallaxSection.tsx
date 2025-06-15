
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  gradient?: boolean;
}

const ParallaxSection = ({ 
  children, 
  className = '', 
  speed = 0.5,
  gradient = false 
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    
    if (!section || !bg) return;

    // Parallax background animation
    gsap.to(bg, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Section reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo('.parallax-content', {
      y: 80,
      opacity: 0,
      scale: 0.95,
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Gradient morphing effect
    if (gradient) {
      tl.to(bg, {
        background: 'linear-gradient(135deg, rgba(107, 142, 107, 0.1), rgba(164, 255, 0, 0.05), rgba(107, 142, 107, 0.1))',
        duration: 2,
        ease: 'power2.inOut',
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [speed, gradient]);

  return (
    <section 
      ref={sectionRef} 
      className={`scroll-section relative overflow-hidden ${className}`}
    >
      {/* Parallax background */}
      <div 
        ref={bgRef}
        className="parallax-bg absolute inset-0 -z-10"
        style={{
          background: gradient 
            ? 'linear-gradient(135deg, rgba(107, 142, 107, 0.05), rgba(164, 255, 0, 0.02), rgba(107, 142, 107, 0.05))'
            : 'transparent',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-6 h-6 border border-sage-accent/20 dark:border-cyber-lime/20 rotate-45" />
        <div className="floating-element absolute top-1/3 right-20 w-4 h-4 bg-sage-accent/10 dark:bg-cyber-lime/10 rounded-full" />
        <div className="floating-element absolute bottom-1/4 left-1/4 w-8 h-8 border-2 border-sage-accent/15 dark:border-cyber-lime/15 rounded-full" />
      </div>
      
      {/* Content */}
      <div className="parallax-content relative z-10">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
