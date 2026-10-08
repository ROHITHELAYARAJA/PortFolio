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

const CAT_HALF_SIZE = 20;

export const ROBotCompanion: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [facingLeft, setFacingLeft] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const targetPos = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth - 70 : 300,
    y: typeof window !== 'undefined' ? window.innerHeight - 70 : 500,
  });
  const currentPos = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth - 70 : 300,
    y: typeof window !== 'undefined' ? window.innerHeight - 70 : 500,
  });
  const lastFrameTime = useRef(performance.now());
  const rafId = useRef<number | null>(null);
  const isInitialized = useRef(false);
  const isRunningRef = useRef(false);
  const facingLeftRef = useRef(false);

  useEffect(() => {
    CAT_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(false);
      return;
    }

    const initDefaultPos = () => {
      const initX = Math.max(20, window.innerWidth - 70);
      const initY = Math.max(20, window.innerHeight - 70);
      currentPos.current = { x: initX, y: initY };
      targetPos.current = { x: initX, y: initY };
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${initX}px, ${initY}px, 0)`;
      }
    };

    initDefaultPos();

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = {
        x: e.clientX - CAT_HALF_SIZE,
        y: e.clientY - CAT_HALF_SIZE,
      };

      if (!isInitialized.current) {
        isInitialized.current = true;
        setIsVisible(true);
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        targetPos.current = {
          x: touch.clientX - CAT_HALF_SIZE,
          y: touch.clientY - CAT_HALF_SIZE,
        };

        if (!isInitialized.current) {
          isInitialized.current = true;
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    const FRAME_DURATION = 80;
    const STOP_DISTANCE = 4;

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > STOP_DISTANCE) {
        const speed = Math.min(320, Math.max(70, dist * 3.2));
        const travel = Math.min(dist, speed * dt);

        currentPos.current.x += (dx / dist) * travel;
        currentPos.current.y += (dy / dist) * travel;

        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        }

        if (!isRunningRef.current) {
          isRunningRef.current = true;
          setIsRunning(true);
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
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;

        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        }

        if (isRunningRef.current) {
          isRunningRef.current = false;
          setIsRunning(false);
        }

        setCurrentFrame(0);
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
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
      className="pointer-events-none fixed left-0 top-0 z-[60] select-none transition-opacity duration-300"
    >
      <div
        className={`relative transition-transform duration-200 ease-out ${
          facingLeft ? '-scale-x-100' : 'scale-x-100'
        }`}
      >
        <div
          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 rounded-full bg-black/15 dark:bg-black/35 blur-[1.5px] transition-all duration-200 ${
            isRunning ? 'w-8 sm:w-9 scale-x-110 opacity-70' : 'w-6 sm:w-7 scale-x-95 opacity-50'
          }`}
        />

        <div className="relative flex items-center justify-center">
          <img
            src={CAT_FRAMES[currentFrame]}
            alt="Cat Companion"
            style={{ imageRendering: 'pixelated' }}
            className={`h-10 sm:h-11 w-auto select-none pointer-events-none drop-shadow-md transition-transform duration-100 ${
              isRunning ? 'translate-y-[-1px]' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};
