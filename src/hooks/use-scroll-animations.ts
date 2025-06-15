
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Enhanced scroll animations
    const sections = gsap.utils.toArray('.scroll-section');
    
    sections.forEach((section: any, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        }
      });

      // Parallax background effects
      const bg = section.querySelector('.parallax-bg');
      if (bg) {
        tl.to(bg, {
          yPercent: -50,
          ease: 'none',
        }, 0);
      }

      // Staggered element animations
      const elements = section.querySelectorAll('.animate-on-scroll');
      if (elements.length > 0) {
        tl.fromTo(elements, {
          y: 100,
          opacity: 0,
          scale: 0.8,
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }, 0.3);
      }

      // Gradient morphing effects
      const gradients = section.querySelectorAll('.morph-gradient');
      gradients.forEach((gradient: any) => {
        tl.to(gradient, {
          background: `linear-gradient(45deg, 
            hsl(${120 + index * 30}, 70%, 50%), 
            hsl(${180 + index * 30}, 60%, 60%))`,
          duration: 2,
          ease: 'power2.inOut',
        }, 0);
      });
    });

    // Advanced hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
      .fromTo('.hero-title', {
        y: 100,
        opacity: 0,
        rotationX: 45,
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        ease: 'power4.out',
      })
      .fromTo('.hero-subtitle', {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1')
      .fromTo('.hero-cta', {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.5');

    // Floating elements animation
    gsap.to('.floating-element', {
      y: -20,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    });

    // Interactive cursor trail
    const cursor = document.querySelector('.cyber-cursor');
    if (cursor) {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      
      document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    }

    // Cleanup function
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return { lenis: lenisRef.current };
};
