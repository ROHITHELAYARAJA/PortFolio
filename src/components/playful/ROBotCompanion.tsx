import React, { useEffect, useState, useRef } from 'react';

const CAT_FRAMES = [
  '/assets/cat/frame-0.png',
  '/assets/cat/frame-1.png',
  '/assets/cat/frame-2.png',
  '/assets/cat/frame-3.png',
  '/assets/cat/frame-4.png',
  '/assets/cat/frame-5.png',
  '/assets/cat/frame-6.png',
  '/assets/cat/frame-7.png',
];

const CAT_HALF_WIDTH = 18;
const CAT_HALF_HEIGHT = 20;
const STOP_DISTANCE = 42;
const RESUME_DISTANCE = 64;
const FRAME_DURATION = 100;

export const ROBotCompanion: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [facingLeft, setFacingLeft] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: 300, y: 500 });
  const currentPos = useRef({ x: 300, y: 500 });
  const lastFrameTime = useRef(performance.now());
  const rafId = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const facingLeftRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.innerWidth < 768) {
      setIsVisible(false);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    CAT_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const initX = Math.max(20, window.innerWidth - 80);
    const initY = Math.max(20, window.innerHeight - 80);
    currentPos.current = { x: initX, y: initY };
    mousePos.current = { x: initX, y: initY };

    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(${initX}px, ${initY}px, 0)`;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
      currentPos.current.x = Math.max(4, Math.min(window.innerWidth - 44, currentPos.current.x));
      currentPos.current.y = Math.max(4, Math.min(window.innerHeight - 44, currentPos.current.y));
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.08, (now - lastTime) / 1000);
      lastTime = now;

      const catCenterX = currentPos.current.x + CAT_HALF_WIDTH;
      const catCenterY = currentPos.current.y + CAT_HALF_HEIGHT;

      const dx = mousePos.current.x - catCenterX;
      const dy = mousePos.current.y - catCenterY;
      const dist = Math.hypot(dx, dy);

      if (isRunningRef.current) {
        if (dist > STOP_DISTANCE) {
          const speed = Math.min(180, Math.max(60, (dist - STOP_DISTANCE) * 1.5));
          const travel = Math.min(dist - STOP_DISTANCE, speed * dt);

          currentPos.current.x += (dx / dist) * travel;
          currentPos.current.y += (dy / dist) * travel;

          currentPos.current.x = Math.max(4, Math.min(window.innerWidth - 44, currentPos.current.x));
          currentPos.current.y = Math.max(4, Math.min(window.innerHeight - 44, currentPos.current.y));

          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
          }

          if (Math.abs(dx) > 1.5) {
            const newFacingLeft = dx < 0;
            if (newFacingLeft !== facingLeftRef.current) {
              facingLeftRef.current = newFacingLeft;
              setFacingLeft(newFacingLeft);
            }
          }

          if (now - lastFrameTime.current > FRAME_DURATION) {
            setCurrentFrame((prev) => (prev + 1) % CAT_FRAMES.length);
            lastFrameTime.current = now;
          }
        } else {
          isRunningRef.current = false;
          setIsRunning(false);
          setCurrentFrame(0);

          if (Math.abs(dx) > 1.5) {
            const newFacingLeft = dx < 0;
            if (newFacingLeft !== facingLeftRef.current) {
              facingLeftRef.current = newFacingLeft;
              setFacingLeft(newFacingLeft);
            }
          }
        }
      } else {
        if (Math.abs(dx) > 2) {
          const newFacingLeft = dx < 0;
          if (newFacingLeft !== facingLeftRef.current) {
            facingLeftRef.current = newFacingLeft;
            setFacingLeft(newFacingLeft);
          }
        }

        if (dist > RESUME_DISTANCE) {
          isRunningRef.current = true;
          setIsRunning(true);
          lastFrameTime.current = now;
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="rob-cat-companion"
      ref={containerRef}
      aria-hidden="true"
      style={{
        transform: `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`,
        willChange: 'transform',
      }}
      className="pointer-events-none fixed left-0 top-0 z-[60] select-none transition-opacity duration-300 hidden md:block"
    >
      <div
        className={`pointer-events-none relative transition-transform duration-200 ease-out ${
          facingLeft ? '-scale-x-100' : 'scale-x-100'
        }`}
      >
        <div
          className={`pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 rounded-full bg-black/15 dark:bg-black/35 blur-[1.5px] transition-all duration-200 ${
            isRunning ? 'w-8 sm:w-9 scale-x-110 opacity-70' : 'w-7 sm:w-8 scale-x-100 opacity-60'
          }`}
        />

        <div className="pointer-events-none relative flex items-center justify-center">
          <img
            src={CAT_FRAMES[isRunning ? currentFrame : 0]}
            alt="Cat Companion"
            style={{ imageRendering: 'pixelated' }}
            className={`pointer-events-none h-10 w-auto select-none drop-shadow-md transition-transform duration-100 ${
              isRunning ? 'translate-y-[-1px]' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};
