
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
    const shootingStars: Array<{
      x: number;
      y: number;
      speed: number;
      angle: number;
      length: number;
      width: number;
      alpha: number;
      trail: Array<{ x: number; y: number }>;
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
          twinkleSpeed: Math.random() * 0.04 + 0.02, // Increased twinkle speed
          twinklePhase: Math.random() * Math.PI * 2,
          brightness: Math.random() * 0.5 + 0.5,
        });
      }
    };

    createStars();

    const createShootingStar = () => {
      const startFromTop = Math.random() > 0.5;
      const x = startFromTop ? Math.random() * canvas.width : -50;
      const y = startFromTop ? -50 : Math.random() * canvas.height;

      const baseAngle = startFromTop ? 15 : 35;
      const angleVariation = 10;
      const angle = (baseAngle + Math.random() * angleVariation) * Math.PI / 180;

      shootingStars.push({
        x,
        y,
        speed: Math.random() * 5 + 8, // Speed between 5.5 and 9
        angle,
        length: Math.random() * 80 + 100, // Length between 100 and 200
        width: Math.random() * 2 + 1, // Width between 1 and 3
        alpha: 0.8,
        trail: [],
      });
    };

    const shootingStarInterval = setInterval(() => {
      if (shootingStars.length < 3 && Math.random() > 0.80) {
        createShootingStar();
      }
    }, 1000);

    const animate = () => {
      const backgroundColor = theme === 'dark' ? '#000000' : '#f7f3e9';
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001; 

      stars.forEach((star, index) => {
        const parallaxX = Math.sin(time * 0.8 + index * 0.1) * 6; // Increased movement range
        const parallaxY = Math.cos(time * 1.0 + index * 0.15) * 4; // Increased movement range
        
        star.x = star.baseX + parallaxX;
        star.y = star.baseY + parallaxY;

        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5;
        const currentAlpha = star.alpha * star.brightness * (0.1 + twinkle * 0.9); // More dramatic alpha variation

        const starColor = theme === 'dark' ? '255, 255, 255' : '120, 120, 120';
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${currentAlpha})`;
        ctx.fill();

        if (star.brightness > 0.7 && currentAlpha > 0.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2); // Larger glow
          ctx.fillStyle = `rgba(${starColor}, ${currentAlpha * 0.25})`;
          ctx.fill();
        }

        if (star.brightness > 0.9 && currentAlpha > 0.6) {
          ctx.strokeStyle = `rgba(${starColor}, ${currentAlpha * 0.6})`; // More visible cross
          ctx.lineWidth = 0.8; // Thicker lines
          
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

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        star.trail.unshift({ x: star.x, y: star.y });
        if (star.trail.length > 35) { // Increased trail length
          star.trail.pop();
        }

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);

        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );

        const starColor = theme === 'dark' ? '255, 255, 255' : '120, 120, 120';
        gradient.addColorStop(0, `rgba(${starColor}, ${star.alpha})`);
        gradient.addColorStop(1, `rgba(${starColor}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.width;

        if (star.trail.length > 2) {
          ctx.moveTo(star.trail[0].x, star.trail[0].y);
          for (let i = 1; i < star.trail.length - 2; i++) {
            const xc = (star.trail[i].x + star.trail[i + 1].x) / 2;
            const yc = (star.trail[i].y + star.trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(star.trail[i].x, star.trail[i].y, xc, yc);
          }
        }
        ctx.stroke();

        if (star.x > canvas.width + 100 || star.y > canvas.height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(shootingStarInterval);
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
