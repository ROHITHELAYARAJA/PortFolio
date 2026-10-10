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

const CAT_WIDTH = 40;
const CAT_HEIGHT = 44;
const FRAME_DURATION = 85;
const STOP_DISTANCE = 8;
const RESUME_DISTANCE = 22;

export const ROBotCompanion: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [facingLeft, setFacingLeft] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const targetPos = useRef({ x: 300, y: 500 });
  const currentPos = useRef({ x: 300, y: 500 });
  const lastFrameTime = useRef(performance.now());
  const rafId = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const facingLeftRef = useRef(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    CAT_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(false);
      return;
    }

    const getSafeInitialPos = () => {
      const initX = Math.max(16, window.innerWidth - 80);
      const initY = Math.max(16, window.innerHeight - 80);
      return { x: initX, y: initY };
    };

    const initial = getSafeInitialPos();
    currentPos.current = { ...initial };
    targetPos.current = { ...initial };

    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(${initial.x}px, ${initial.y}px, 0)`;
    }

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.08, (now - lastTime) / 1000);
      lastTime = now;

      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const dist = Math.hypot(dx, dy);

      if (isRunningRef.current) {
        if (dist > STOP_DISTANCE) {
          const speed = Math.min(260, Math.max(60, dist * 2.4));
          const travel = Math.min(dist, speed * dt);

          currentPos.current.x += (dx / dist) * travel;
          currentPos.current.y += (dy / dist) * travel;

          currentPos.current.x = Math.max(8, Math.min(window.innerWidth - CAT_WIDTH - 8, currentPos.current.x));
          currentPos.current.y = Math.max(8, Math.min(window.innerHeight - CAT_HEIGHT - 8, currentPos.current.y));

          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
          }

          if (Math.abs(dx) > 6) {
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

          rafId.current = requestAnimationFrame(loop);
        } else {
          currentPos.current.x = targetPos.current.x;
          currentPos.current.y = targetPos.current.y;
          currentPos.current.x = Math.max(8, Math.min(window.innerWidth - CAT_WIDTH - 8, currentPos.current.x));
          currentPos.current.y = Math.max(8, Math.min(window.innerHeight - CAT_HEIGHT - 8, currentPos.current.y));

          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
          }

          isRunningRef.current = false;
          setIsRunning(false);
          setCurrentFrame(0);
          rafId.current = null;
        }
      } else {
        if (dist > RESUME_DISTANCE) {
          isRunningRef.current = true;
          setIsRunning(true);
          lastFrameTime.current = now;

          if (Math.abs(dx) > 6) {
            const newFacingLeft = dx < 0;
            if (newFacingLeft !== facingLeftRef.current) {
              facingLeftRef.current = newFacingLeft;
              setFacingLeft(newFacingLeft);
            }
          }

          rafId.current = requestAnimationFrame(loop);
        } else {
          rafId.current = null;
        }
      }
    };

    const wakeAnimation = () => {
      if (!rafId.current) {
        lastTime = performance.now();
        rafId.current = requestAnimationFrame(loop);
      }
    };

    const updateTarget = (clientX: number, clientY: number) => {
      const isRightEdge = clientX > window.innerWidth - 70;
      const isBottomEdge = clientY > window.innerHeight - 70;
      const offsetX = isRightEdge ? -36 : 18;
      const offsetY = isBottomEdge ? -36 : 16;

      targetPos.current = {
        x: Math.max(8, Math.min(window.innerWidth - CAT_WIDTH - 8, clientX + offsetX)),
        y: Math.max(8, Math.min(window.innerHeight - CAT_HEIGHT - 8, clientY + offsetY)),
      };

      if (!isInitialized.current) {
        isInitialized.current = true;
      }

      wakeAnimation();
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateTarget(e.clientX, e.clientY);
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        updateTarget(touch.clientX, touch.clientY);
      }
    };

    const handleResize = () => {
      currentPos.current.x = Math.max(8, Math.min(window.innerWidth - CAT_WIDTH - 8, currentPos.current.x));
      currentPos.current.y = Math.max(8, Math.min(window.innerHeight - CAT_HEIGHT - 8, currentPos.current.y));
      targetPos.current.x = Math.max(8, Math.min(window.innerWidth - CAT_WIDTH - 8, targetPos.current.x));
      targetPos.current.y = Math.max(8, Math.min(window.innerHeight - CAT_HEIGHT - 8, targetPos.current.y));
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('resize', handleResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
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
        className={`pointer-events-none relative transition-transform duration-200 ease-out ${
          facingLeft ? '-scale-x-100' : 'scale-x-100'
        } ${!isRunning ? 'animate-cat-idle' : ''}`}
      >
        <div
          className={`pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 rounded-full bg-black/15 dark:bg-black/35 blur-[1.5px] transition-all duration-200 ${
            isRunning ? 'w-8 sm:w-9 scale-x-110 opacity-70' : 'w-6 sm:w-7 scale-x-95 opacity-55'
          }`}
        />

        <div className="pointer-events-none relative flex items-center justify-center">
          <img
            src={CAT_FRAMES[isRunning ? currentFrame : 0]}
            alt="Cat Companion"
            style={{ imageRendering: 'pixelated' }}
            className={`pointer-events-none h-10 sm:h-11 w-auto select-none drop-shadow-md transition-transform duration-100 ${
              isRunning ? 'translate-y-[-1px]' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};
