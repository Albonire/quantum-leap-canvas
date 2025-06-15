
import React, { useEffect, useRef, useState } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Star properties
    const stars: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      brightness: number;
      disperseX: number;
      disperseY: number;
    }> = [];

    // Create more stars
    const createStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) / 2000); // Increased density
      stars.length = 0;
      
      for (let i = 0; i < numStars; i++) {
        const baseX = Math.random() * canvas.width;
        const baseY = Math.random() * canvas.height;
        
        stars.push({
          x: baseX,
          y: baseY,
          baseX: baseX,
          baseY: baseY,
          radius: Math.random() * 1.5 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          brightness: Math.random() * 0.5 + 0.5,
          disperseX: 0,
          disperseY: 0,
        });
      }
    };

    createStars();

    // Animation loop
    const animate = () => {
      // Pure black space background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.0003;

      // Draw and animate stars
      stars.forEach((star, index) => {
        // Base parallax movement
        const parallaxX = Math.sin(time * 0.3 + index * 0.1) * 1.5;
        const parallaxY = Math.cos(time * 0.4 + index * 0.15) * 1.0;
        
        // Calculate distance from mouse
        const dx = mousePosition.x - star.baseX;
        const dy = mousePosition.y - star.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Dispersion effect
        const maxDispersionDistance = 150; // Range of mouse effect
        const maxDispersionForce = 60; // How far stars move away
        
        if (distance < maxDispersionDistance && mousePosition.x > -500) {
          const force = (maxDispersionDistance - distance) / maxDispersionDistance;
          const angle = Math.atan2(dy, dx);
          
          // Calculate dispersion with smooth transition
          const targetDispersX = -Math.cos(angle) * force * maxDispersionForce;
          const targetDispersY = -Math.sin(angle) * force * maxDispersionForce;
          
          // Smooth transition to dispersion position
          star.disperseX += (targetDispersX - star.disperseX) * 0.1;
          star.disperseY += (targetDispersY - star.disperseY) * 0.1;
        } else {
          // Return to original position gradually
          star.disperseX *= 0.95;
          star.disperseY *= 0.95;
        }
        
        // Apply all movements
        star.x = star.baseX + parallaxX + star.disperseX;
        star.y = star.baseY + parallaxY + star.disperseY;

        // Natural twinkling
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5;
        const currentAlpha = star.alpha * star.brightness * (0.3 + twinkle * 0.7);

        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();

        // Add subtle glow for brighter stars
        if (star.brightness > 0.7 && currentAlpha > 0.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.1})`;
          ctx.fill();
        }

        // Very bright stars get a soft cross pattern
        if (star.brightness > 0.9 && currentAlpha > 0.8) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.3})`;
          ctx.lineWidth = 0.5;
          
          // Vertical line
          ctx.beginPath();
          ctx.moveTo(star.x, star.y - star.radius * 3);
          ctx.lineTo(star.x, star.y + star.radius * 3);
          ctx.stroke();
          
          // Horizontal line
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 3, star.y);
          ctx.lineTo(star.x + star.radius * 3, star.y);
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#000000' }}
    />
  );
};

export default StarryBackground;
