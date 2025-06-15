
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

    // Star properties with movement
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      brightness: number;
      velocityX: number;
      velocityY: number;
      velocityZ: number;
    }> = [];

    // Galaxy properties
    const galaxies: Array<{
      x: number;
      y: number;
      rotation: number;
      rotationSpeed: number;
      size: number;
      alpha: number;
      arms: number;
      color: { r: number; g: number; b: number };
    }> = [];

    // Create moving stars
    const createStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) / 3000);
      stars.length = 0;
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          radius: Math.random() * 1.8 + 0.2,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.008 + 0.002,
          twinklePhase: Math.random() * Math.PI * 2,
          brightness: Math.random() * 0.6 + 0.4,
          velocityX: (Math.random() - 0.5) * 0.3,
          velocityY: (Math.random() - 0.5) * 0.3,
          velocityZ: Math.random() * 0.5 + 0.1,
        });
      }
    };

    // Create spiral galaxies
    const createGalaxies = () => {
      const numGalaxies = 3;
      galaxies.length = 0;
      
      for (let i = 0; i < numGalaxies; i++) {
        galaxies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
          size: Math.random() * 80 + 40,
          alpha: Math.random() * 0.15 + 0.05,
          arms: Math.floor(Math.random() * 3) + 2,
          color: {
            r: Math.random() * 50 + 100,
            g: Math.random() * 50 + 150,
            b: Math.random() * 100 + 200
          }
        });
      }
    };

    createStars();
    createGalaxies();

    // Animation loop
    const animate = () => {
      // Pure black space background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.0001;

      // Draw and animate galaxies
      galaxies.forEach((galaxy) => {
        galaxy.rotation += galaxy.rotationSpeed;
        
        ctx.save();
        ctx.translate(galaxy.x, galaxy.y);
        ctx.rotate(galaxy.rotation);
        
        // Draw spiral arms
        for (let arm = 0; arm < galaxy.arms; arm++) {
          const armAngle = (arm * Math.PI * 2) / galaxy.arms;
          
          ctx.beginPath();
          for (let i = 0; i < 100; i++) {
            const t = i / 100;
            const radius = t * galaxy.size;
            const angle = armAngle + t * Math.PI * 4;
            
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.3; // Flatten the spiral
            
            const alpha = galaxy.alpha * (1 - t * 0.8);
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          const gradient = ctx.createLinearGradient(-galaxy.size, 0, galaxy.size, 0);
          gradient.addColorStop(0, `rgba(${galaxy.color.r}, ${galaxy.color.g}, ${galaxy.color.b}, 0)`);
          gradient.addColorStop(0.5, `rgba(${galaxy.color.r}, ${galaxy.color.g}, ${galaxy.color.b}, ${galaxy.alpha})`);
          gradient.addColorStop(1, `rgba(${galaxy.color.r}, ${galaxy.color.g}, ${galaxy.color.b}, 0)`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Galaxy center glow
        const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.size * 0.3);
        centerGradient.addColorStop(0, `rgba(${galaxy.color.r + 50}, ${galaxy.color.g + 50}, ${galaxy.color.b}, ${galaxy.alpha * 2})`);
        centerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(0, 0, galaxy.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = centerGradient;
        ctx.fill();
        
        ctx.restore();
      });

      // Draw and animate stars
      stars.forEach((star) => {
        // Move stars through 3D space
        star.x += star.velocityX;
        star.y += star.velocityY;
        star.z -= star.velocityZ;

        // Wrap around screen edges
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
        if (star.y < -10) star.y = canvas.height + 10;
        if (star.y > canvas.height + 10) star.y = -10;
        if (star.z <= 0) star.z = 1000;

        // Calculate star size based on distance (3D effect)
        const scale = 1000 / star.z;
        const x = star.x;
        const y = star.y;
        const radius = star.radius * scale;

        // Natural twinkling
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5;
        const currentAlpha = star.alpha * star.brightness * (0.4 + twinkle * 0.6) * scale;

        // Only draw visible stars
        if (radius > 0.1 && currentAlpha > 0.01) {
          // Draw star core
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(currentAlpha, 1)})`;
          ctx.fill();

          // Add glow for closer/brighter stars
          if (star.brightness > 0.7 && currentAlpha > 0.4) {
            ctx.beginPath();
            ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(currentAlpha * 0.15, 0.3)})`;
            ctx.fill();
          }

          // Bright stars get cross pattern
          if (star.brightness > 0.9 && currentAlpha > 0.6 && radius > 0.8) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(currentAlpha * 0.4, 0.6)})`;
            ctx.lineWidth = 0.5;
            
            // Vertical line
            ctx.beginPath();
            ctx.moveTo(x, y - radius * 4);
            ctx.lineTo(x, y + radius * 4);
            ctx.stroke();
            
            // Horizontal line
            ctx.beginPath();
            ctx.moveTo(x - radius * 4, y);
            ctx.lineTo(x + radius * 4, y);
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
      style={{ background: '#000000' }}
    />
  );
};

export default StarryBackground;
