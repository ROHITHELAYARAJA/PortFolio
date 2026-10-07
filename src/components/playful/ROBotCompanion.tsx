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

export const ROBotCompanion: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [facingLeft, setFacingLeft] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Direct DOM container ref for 100% hardware-accelerated 60/120fps transforms without React state lag
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Position and animation physics refs (resting at bottom right corner initially)
  const targetPos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth - 85 : 300, y: typeof window !== 'undefined' ? window.innerHeight - 85 : 500 });
  const currentPos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth - 85 : 300, y: typeof window !== 'undefined' ? window.innerHeight - 85 : 500 });
  const lastFrameTime = useRef(performance.now());
  const rafId = useRef<number | null>(null);
  const isInitialized = useRef(true);
  const isRunningRef = useRef(false);
  const facingLeftRef = useRef(false);

  // Preload all 8 high-resolution cat animation frames
  useEffect(() => {
    CAT_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(false);
      return;
    }

    // Default starting position (resting near bottom right corner)
    const initDefaultPos = () => {
      const initX = Math.max(20, window.innerWidth - 85);
      const initY = Math.max(20, window.innerHeight - 85);
      currentPos.current = { x: initX, y: initY };
      targetPos.current = { x: initX, y: initY };
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${initX}px, ${initY}px, 0)`;
      }
    };

    initDefaultPos();

    // Mouse movement listener - targets the cursor point precisely
    const handleMouseMove = (e: MouseEvent) => {
      // Center cat's base directly at the cursor position
      targetPos.current = { x: e.clientX - 16, y: e.clientY - 32 };
      if (!isInitialized.current) {
        currentPos.current = { x: e.clientX - 16, y: e.clientY - 32 };
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        }
        setIsVisible(true);
        isInitialized.current = true;
      }
    };

    // Touch event listener for mobile devices - targets the tapped point precisely
    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        targetPos.current = { x: touch.clientX - 16, y: touch.clientY - 32 };
        if (!isInitialized.current) {
          currentPos.current = { x: touch.clientX - 16, y: touch.clientY - 32 };
          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
          }
          setIsVisible(true);
          isInitialized.current = true;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    // Slow, graceful, time-based animation physics
    const WALK_FRAME_INTERVAL = 120; // 120ms per frame for a natural, relaxed walking cadence
    let lastTime = performance.now();

    const loop = (now: number) => {
      // Delta time in seconds (clamped to 0.5s to avoid huge jumps while supporting background tabs)
      const dt = Math.min(0.5, (now - lastTime) / 1000);
      lastTime = now;

      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 1.5) {
        // Slow, calm walking speed (100px/s to 240px/s with smooth easing)
        const speed = Math.min(220, Math.max(40, dist * 2.2));
        const travel = speed * dt;

        if (travel >= dist) {
          currentPos.current.x = targetPos.current.x;
          currentPos.current.y = targetPos.current.y;
        } else {
          currentPos.current.x += (dx / dist) * travel;
          currentPos.current.y += (dy / dist) * travel;
        }

        // Apply hardware-accelerated transform directly
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        }

        if (!isRunningRef.current) {
          isRunningRef.current = true;
          setIsRunning(true);
        }

        // Smooth facing direction with hysteresis
        if (Math.abs(dx) > 2.0) {
          const newFacingLeft = dx < 0;
          if (newFacingLeft !== facingLeftRef.current) {
            facingLeftRef.current = newFacingLeft;
            setFacingLeft(newFacingLeft);
          }
        }

        // Advance walking sprite frames at relaxed intervals
        if (now - lastFrameTime.current > WALK_FRAME_INTERVAL) {
          setCurrentFrame((prev) => (prev + 1) % CAT_FRAMES.length);
          lastFrameTime.current = now;
        }
      } else {
        // EXACT POINT REACHED: Snap to the indicated point and stop completely
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        }

        // Stop walking and immediately sit in resting stance
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
        className={`relative transition-transform duration-300 ease-out ${
          facingLeft ? '-scale-x-100' : 'scale-x-100'
        }`}
      >
        {/* Soft ground shadow beneath the cat */}
        <div
          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 rounded-full bg-black/15 dark:bg-black/35 blur-[1.5px] transition-all duration-300 ${
            isRunning ? 'w-8 sm:w-9 scale-x-110 opacity-70' : 'w-6 sm:w-7 scale-x-95 opacity-60'
          }`}
        />

        {/* Pixel-art Walking/Running Cat Sprite */}
        <div className="relative flex items-center justify-center">
          <img
            src={CAT_FRAMES[currentFrame]}
            alt="Cat Companion"
            style={{ imageRendering: 'pixelated' }}
            className={`h-10 sm:h-11 w-auto select-none pointer-events-none drop-shadow-md transition-transform duration-150 ${
              isRunning ? 'translate-y-[-1px]' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};

