
'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: Math.random() * 60 + 30,
      };
    };

    const updateParticles = () => {
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        return particle.life < particle.maxLife;
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        const alpha = 1 - (particle.life / particle.maxLife);
        ctx.fillStyle = `rgba(164, 255, 0, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = '#a4ff00';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create particles at mouse position
      if (Math.random() < 0.3) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // Initialize
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      particlesRef.current.push(
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground;
