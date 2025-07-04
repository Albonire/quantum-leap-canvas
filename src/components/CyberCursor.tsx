
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CyberCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;

    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: () => {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        gsap.set(follower, {
          left: posX - 12,
          top: posY - 12,
        });

        gsap.set(cursor, {
          left: mouseX,
          top: mouseY,
        });
      },
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      if (follower) {
        follower.classList.add('hover');
      }
    };

    const handleMouseLeave = () => {
      if (follower) {
        follower.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', () => {
      gsap.to([cursor, follower], { autoAlpha: 1, duration: 0.3 });
    });
    document.body.addEventListener('mouseleave', () => {
      gsap.to([cursor, follower], { autoAlpha: 0, duration: 0.3 });
    });

    const interactiveElements = document.querySelectorAll(
      'a, button, .clickable'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', () => {
        gsap.to([cursor, follower], { autoAlpha: 1, duration: 0.3 });
      });
      document.body.removeEventListener('mouseleave', () => {
        gsap.to([cursor, follower], { autoAlpha: 0, duration: 0.3 });
      });
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-sage-accent dark:bg-emerald-accent rounded-full pointer-events-none z-[9999] opacity-0"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className="fixed w-6 h-6 border-2 border-sage-accent dark:border-emerald-accent rounded-full pointer-events-none z-[9999] opacity-0 transition-transform duration-300"
      />
    </>
  );
};

export default CyberCursor;
