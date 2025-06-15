
import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      z: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      twinkleDirection: number;
      speed: number;
    }> = [];

    // Create stars
    const createStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) / 6000);
      stars.length = 0;
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          radius: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.5 + 0.1,
        });
      }
    };

    createStars();

    // Animation loop
    const animate = () => {
      // Clear canvas with deep space background
      ctx.fillStyle = '#0a0a15';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add moving nebula effect
      const time = Date.now() * 0.0001;
      const gradient = ctx.createRadialGradient(
        canvas.width * (0.3 + Math.sin(time) * 0.1),
        canvas.height * (0.3 + Math.cos(time * 0.7) * 0.1),
        0,
        canvas.width * (0.3 + Math.sin(time) * 0.1),
        canvas.height * (0.3 + Math.cos(time * 0.7) * 0.1),
        canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(75, 0, 130, 0.1)');
      gradient.addColorStop(0.5, 'rgba(25, 25, 112, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate stars
      stars.forEach((star) => {
        // Move stars towards viewer (3D effect)
        star.z -= star.speed;
        
        // Reset star position when it gets too close
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        // Calculate 3D position
        const x = (star.x - canvas.width / 2) * (1000 / star.z) + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * (1000 / star.z) + canvas.height / 2;
        const radius = star.radius * (1000 / star.z);

        // Update twinkle
        star.alpha += star.twinkleSpeed * star.twinkleDirection;
        
        if (star.alpha <= 0.2 || star.alpha >= 1) {
          star.twinkleDirection *= -1;
        }

        star.alpha = Math.max(0.2, Math.min(1, star.alpha));

        // Only draw stars that are visible
        if (x >= -radius && x <= canvas.width + radius && 
            y >= -radius && y <= canvas.height + radius) {
          
          // Draw star
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.1, radius), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * (1000 / star.z)})`;
          ctx.fill();

          // Add glow effect for larger/closer stars
          if (radius > 1) {
            ctx.beginPath();
            ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(173, 216, 230, ${star.alpha * 0.3 * (1000 / star.z)})`;
            ctx.fill();
          }

          // Add motion trails for fast-moving stars
          if (star.speed > 0.3) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            const trailX = x - (x - canvas.width / 2) * 0.1;
            const trailY = y - (y - canvas.height / 2) * 0.1;
            ctx.lineTo(trailX, trailY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha * 0.2})`;
            ctx.lineWidth = Math.max(0.1, radius * 0.5);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 50%, #16213e 100%)' }}
    />
  );
};

export default StarryBackground;
