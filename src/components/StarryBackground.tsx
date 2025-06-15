
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

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
    }> = [];

    // Create stars with more natural distribution
    const createStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) / 4000);
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
          twinkleSpeed: Math.random() * 0.015 + 0.008, // Faster twinkling
          twinklePhase: Math.random() * Math.PI * 2,
          brightness: Math.random() * 0.5 + 0.5,
        });
      }
    };

    createStars();

    // Animation loop
    const animate = () => {
      // Background color based on theme
      const backgroundColor = theme === 'dark' ? '#000000' : '#f8fafc';
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.0005; // Faster time multiplier

      // Draw and animate stars
      stars.forEach((star, index) => {
        // Faster, more noticeable movement
        const parallaxX = Math.sin(time * 0.4 + index * 0.1) * 2.5; // Increased movement
        const parallaxY = Math.cos(time * 0.5 + index * 0.15) * 1.8; // Increased movement
        
        star.x = star.baseX + parallaxX;
        star.y = star.baseY + parallaxY;

        // Natural twinkling using sine wave
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5; // 0 to 1
        const currentAlpha = star.alpha * star.brightness * (0.3 + twinkle * 0.7);

        // Star color based on theme
        const starColor = theme === 'dark' ? '255, 255, 255' : '75, 85, 99'; // white for dark, gray for light
        
        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${currentAlpha})`;
        ctx.fill();

        // Add subtle glow for brighter stars
        if (star.brightness > 0.7 && currentAlpha > 0.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${starColor}, ${currentAlpha * 0.1})`;
          ctx.fill();
        }

        // Very bright stars get a soft cross pattern
        if (star.brightness > 0.9 && currentAlpha > 0.8) {
          ctx.strokeStyle = `rgba(${starColor}, ${currentAlpha * 0.3})`;
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
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: theme === 'dark' ? '#000000' : '#f8fafc' 
      }}
    />
  );
};

export default StarryBackground;
