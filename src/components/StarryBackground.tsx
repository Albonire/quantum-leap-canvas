import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars(); // Re-create stars on resize
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    interface Star {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      brightness: number;
    }
    const stars: Star[] = [];

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
          vx: 0,
          vy: 0,
          radius: Math.random() * 1.9 + 0.32,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.04 + 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          brightness: Math.random() * 0.5 + 0.5,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;
    const animate = () => {
      const backgroundColor = theme === 'dark' ? '#000000' : '#f7f3e9';
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Mouse repulsion logic
        const dxMouse = star.x - mouseRef.current.x;
        const dyMouse = star.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        const repulsionRadius = 100;
        const repulsionForce = Math.max(0, (repulsionRadius - distMouse) / repulsionRadius) * 0.5;

        if (distMouse < repulsionRadius) {
          star.vx += (dxMouse / distMouse) * repulsionForce;
          star.vy += (dyMouse / distMouse) * repulsionForce;
        }

        // Damping (friction)
        star.vx *= 0.95;
        star.vy *= 0.95;

        // Return to base position force
        const dxBase = star.baseX - star.x;
        const dyBase = star.baseY - star.y;
        star.vx += dxBase * 0.01;
        star.vy += dyBase * 0.01;

        star.x += star.vx;
        star.y += star.vy;

        // Original twinkle and visual effects
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5;
        const currentAlpha = star.alpha * star.brightness * (0.1 + twinkle * 0.9);
        const starColor = theme === 'dark' ? '255, 255, 255' : '120, 120, 120';

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${currentAlpha})`;
        ctx.fill();

        if (star.brightness > 0.7 && currentAlpha > 0.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${starColor}, ${currentAlpha * 0.25})`;
          ctx.fill();
        }

        if (star.brightness > 0.9 && currentAlpha > 0.6) {
          ctx.strokeStyle = `rgba(${starColor}, ${currentAlpha * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y - star.radius * 4);
          ctx.lineTo(star.x, star.y + star.radius * 4);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 4, star.y);
          ctx.lineTo(star.x + star.radius * 4, star.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-2]"
    />
  );
};

export default StarryBackground;
