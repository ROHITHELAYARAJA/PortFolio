import React, { useEffect, useRef, useState, useCallback } from 'react';

interface FighterPose {
  state: 'idle' | 'run' | 'attack1' | 'hit' | 'jump' | 'counter' | 'dodge' | 'energy';
  x: number;
  y: number;
  frameIndex: number;
  flipped: boolean;
  flash: boolean;
  aura: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export const SamuraiDuelStrip: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const animationFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const pausedTimeRef = useRef<number>(0);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const particlesRef = useRef<Particle[]>([]);

  // Asset paths
  const ASSETS = {
    idle: '/assets/samurai/Samurai/Idle/Idle_1.png',
    run: '/assets/samurai/Samurai/Run/Samurai_Run.png',
    attack1: '/assets/samurai/Samurai/Attack/Attack_1/Samurai_Attack_1.png',
    dashAttack: '/assets/samurai/Samurai/Attack/Attack_2/Samurai_Dash_Attack.png',
    counter: '/assets/samurai/Samurai/Attack/Counter/Samurai_Counter.png',
    hit: '/assets/samurai/Samurai/Hit/Samurai_Hit.png',
    jump: '/assets/samurai/Samurai/Jump/Samurai_Full_Jump.png',
    zen: '/assets/samurai/Samurai/Zen-Status/Zen_Mode_Lock_In.png',
    bg1: '/assets/samurai/Map/Zen_Island/Background_1.png',
    bg2: '/assets/samurai/Map/Zen_Island/Background_2.png',
    bg3: '/assets/samurai/Map/Zen_Island/Background_3.png',
    bg4: '/assets/samurai/Map/Zen_Island/Background_4.png',
    bg5: '/assets/samurai/Map/Zen_Island/Background_5.png',
    tileset: '/assets/samurai/Map/Zen_Island/Tileset_1.png',
  };

  // Preload all sprites
  useEffect(() => {
    Object.entries(ASSETS).forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      imagesRef.current[key] = img;
    });
  }, []);

  // Helper to spawn impact and slash particles
  const spawnParticles = useCallback((x: number, y: number, count: number, color: string) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 0,
        maxLife: Math.random() * 20 + 15,
        color,
        size: Math.random() * 3 + 1.5,
      });
    }
  }, []);

  // Draw sprite frame onto canvas
  const drawSprite = (
    ctx: CanvasRenderingContext2D,
    imgKey: string,
    col: number,
    row: number,
    frameW: number,
    frameH: number,
    dx: number,
    dy: number,
    scale: number,
    flipped: boolean,
    flash = false,
    aura = false
  ) => {
    const img = imagesRef.current[imgKey];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    const drawW = frameW * scale;
    const drawH = frameH * scale;

    ctx.translate(dx, dy);
    if (flipped) {
      ctx.scale(-1, 1);
    }

    if (aura) {
      ctx.shadowColor = '#00F5FF';
      ctx.shadowBlur = 15;
    }

    if (flash) {
      ctx.filter = 'brightness(2.5) contrast(1.5)';
    }

    ctx.drawImage(
      img,
      col * frameW,
      row * frameH,
      frameW,
      frameH,
      -drawW / 2,
      -drawH,
      drawW,
      drawH
    );

    ctx.restore();
  };

  // Main 10s Choreography Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CANVAS_WIDTH = 1600;
    const CANVAS_HEIGHT = 260;
    const GROUND_Y = 210;
    const SCALE = 4.2;

    const render = (now: number) => {
      if (!isPlaying) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      const t = elapsed % 10.0; // 0.0s to 10.0s seamless loop

      // 1. Draw Background (Zen Island parallax layers)
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ['bg1', 'bg2', 'bg3', 'bg4', 'bg5'].forEach((layerKey) => {
        const bgImg = imagesRef.current[layerKey];
        if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
          ctx.drawImage(bgImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
      });

      // Floor Platform
      const tileImg = imagesRef.current.tileset;
      if (tileImg && tileImg.complete && tileImg.naturalWidth > 0) {
        ctx.drawImage(tileImg, 0, GROUND_Y - 4, CANVAS_WIDTH, 56);
      } else {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 50);
      }

      // 2. Compute Positions & Choreography States
      let aX = 320;
      let aY = GROUND_Y;
      let aState: FighterPose['state'] = 'idle';
      let aFlash = false;
      let aAura = false;

      let bX = 1280;
      let bY = GROUND_Y;
      let bState: FighterPose['state'] = 'idle';
      let bFlash = false;
      let bAura = false;

      // 0.0 - 1.5s: Both fighters idle
      if (t < 1.5) {
        aX = 320;
        bX = 1280;
        aState = 'idle';
        bState = 'idle';
      }
      // 1.5 - 2.5s: Fighter A runs forward
      else if (t < 2.5) {
        const p = (t - 1.5) / 1.0;
        aX = 320 + p * (720 - 320);
        aState = 'run';
        bX = 1280;
        bState = 'idle';
      }
      // 2.5 - 3.5s: Sword slash / punch combo
      else if (t < 3.5) {
        aX = 720;
        bX = 860;
        aState = 'attack1';
        bState = 'idle';
        if (Math.random() < 0.25) {
          spawnParticles(aX + 35, GROUND_Y - 30, 2, '#38BDF8');
        }
      }
      // 3.5 - 4.2s: Fighter B gets hit + smoke
      else if (t < 4.2) {
        const p = (t - 3.5) / 0.7;
        aX = 720;
        aState = 'idle';
        bX = 860 + p * (1020 - 860);
        bState = 'hit';
        bFlash = t < 3.8;
        if (Math.random() < 0.35) {
          spawnParticles(bX, GROUND_Y - 25, 3, '#F43F5E');
        }
      }
      // 4.2 - 5.3s: Fighter B jumps back into stance
      else if (t < 5.3) {
        const p = (t - 4.2) / 1.1;
        aX = 720;
        aState = 'idle';
        bX = 1020 + p * 80;
        bY = GROUND_Y - Math.sin(p * Math.PI) * 45;
        bState = 'jump';
      }
      // 5.3 - 6.5s: Fighter B counter-attacks with dash
      else if (t < 6.5) {
        const p = (t - 5.3) / 1.2;
        bX = 1100 - p * (1100 - 640);
        bState = 'counter';
        aX = 720;
        aState = 'idle';
        if (Math.random() < 0.3) {
          spawnParticles(bX - 25, GROUND_Y - 28, 2, '#FB7185');
        }
      }
      // 6.5 - 7.4s: Fighter A dodges / rolls
      else if (t < 7.4) {
        const p = (t - 6.5) / 0.9;
        aX = 720 - p * 220;
        aY = GROUND_Y - Math.sin(p * Math.PI) * 20;
        aState = 'dodge';
        bX = 640;
        bState = 'idle';
      }
      // 7.4 - 8.5s: Fighter A Zen Mode / energy slash
      else if (t < 8.5) {
        aX = 500;
        aState = 'energy';
        aAura = true;
        bX = 640;
        bState = 'idle';
        if (Math.random() < 0.4) {
          spawnParticles(aX + 20, GROUND_Y - 35, 3, '#00F5FF');
        }
      }
      // 8.5 - 9.3s: Both recoil back to reset distance
      else if (t < 9.3) {
        const p = (t - 8.5) / 0.8;
        aX = 500 - p * (500 - 320);
        aState = 'run';
        bX = 640 + p * (1280 - 640);
        bState = 'run';
      }
      // 9.3 - 10.0s: Return to starting idle pose
      else {
        aX = 320;
        aState = 'idle';
        bX = 1280;
        bState = 'idle';
      }

      // 3. Render Fighters
      // Draw Fighter A (Facing right, cyan tint)
      const aFrameIndex = Math.floor((t * 8) % 6);
      if (aState === 'idle') {
        drawSprite(ctx, 'idle', aFrameIndex % 6, 0, 128, 128, aX, aY, SCALE, false, aFlash, aAura);
      } else if (aState === 'run') {
        drawSprite(ctx, 'run', aFrameIndex % 8, 0, 128, 128, aX, aY, SCALE, false, aFlash, aAura);
      } else if (aState === 'attack1') {
        const atkFrame = Math.floor(((t - 2.5) / 1.0) * 4) % 4;
        drawSprite(ctx, 'attack1', atkFrame, 0, 128, 128, aX, aY, SCALE, false, aFlash, aAura);
      } else if (aState === 'dodge') {
        drawSprite(ctx, 'run', (aFrameIndex + 2) % 8, 0, 128, 128, aX, aY, SCALE, true, aFlash, aAura);
      } else if (aState === 'energy') {
        const zenFrame = Math.floor(((t - 7.4) / 1.1) * 5) % 5;
        drawSprite(ctx, 'zen', zenFrame, 0, 128, 128, aX, aY, SCALE, false, aFlash, true);
      }

      // Draw Fighter B (Facing left, crimson tint)
      const bFrameIndex = Math.floor((t * 8) % 6);
      if (bState === 'idle') {
        drawSprite(ctx, 'idle', bFrameIndex % 6, 0, 128, 128, bX, bY, SCALE, true, bFlash, bAura);
      } else if (bState === 'hit') {
        const hitFrame = Math.floor(((t - 3.5) / 0.7) * 3) % 3;
        drawSprite(ctx, 'hit', hitFrame, 0, 128, 128, bX, bY, SCALE, true, true, false);
      } else if (bState === 'jump') {
        const jmpFrame = Math.floor(((t - 4.2) / 1.1) * 8) % 8;
        drawSprite(ctx, 'jump', jmpFrame, 0, 128, 128, bX, bY, SCALE, true, bFlash, false);
      } else if (bState === 'counter') {
        const cntFrame = Math.floor(((t - 5.3) / 1.2) * 5) % 5;
        drawSprite(ctx, 'counter', cntFrame, 0, 128, 128, bX, bY, SCALE, true, bFlash, true);
      } else if (bState === 'run') {
        drawSprite(ctx, 'run', bFrameIndex % 8, 0, 128, 128, bX, bY, SCALE, false, bFlash, false);
      }

      // 4. Update and Draw Particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return p.life < p.maxLife;
      });

      // 5. Floor Shadows
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.beginPath();
      ctx.ellipse(aX, GROUND_Y - 2, 24, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(bX, GROUND_Y - 2, 24, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, spawnParticles]);

  // Toggle playback on canvas click
  const togglePlay = () => {
    if (isPlaying) {
      pausedTimeRef.current = performance.now();
      setIsPlaying(false);
    } else {
      const pausedDuration = performance.now() - pausedTimeRef.current;
      startTimeRef.current += pausedDuration;
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[20px] border border-hairline/80 bg-neutral-950 shadow-2xl">
      <canvas
        ref={canvasRef}
        width={1600}
        height={260}
        className="w-full h-auto block select-none cursor-pointer"
        style={{ imageRendering: 'pixelated' }}
        onClick={togglePlay}
        title={isPlaying ? 'Click to Pause' : 'Click to Play'}
      />
    </div>
  );
};
