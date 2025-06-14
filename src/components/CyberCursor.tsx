
'use client';

import { useEffect, useState } from 'react';

const CyberCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('clickable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className={`cyber-cursor ${isHovering ? 'scale-150' : 'scale-100'}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-8 h-8 border border-cyber-lime rounded-full opacity-30 animate-ping" />
      </div>
    </>
  );
};

export default CyberCursor;
