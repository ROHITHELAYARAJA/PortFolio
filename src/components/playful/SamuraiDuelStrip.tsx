import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Download, Film, Swords, Volume2, VolumeX } from 'lucide-react';

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
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [bgMode, setBgMode] = useState<'island' | 'white' | 'dark'>('island');
  const [currentChoreography, setCurrentChoreography] = useState('0.0–1.5s Both fighters idle');

  const animationFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const pausedTimeRef = useRef<number>(0);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const particlesRef = useRef<Particle[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

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
      setCurrentTimeSec(t);

      // Determine active description
      let choreoText = '0.0–1.5s Both fighters idle';
      if (t >= 1.5 && t < 2.5) choreoText = '1.5–2.5s Fighter A runs forward';
      else if (t >= 2.5 && t < 3.5) choreoText = '2.5–3.5s Sword slash / punch combo';
      else if (t >= 3.5 && t < 4.2) choreoText = '3.5–4.2s Fighter B gets hit + smoke';
      else if (t >= 4.2 && t < 5.3) choreoText = '4.2–5.3s Fighter B jumps back';
      else if (t >= 5.3 && t < 6.5) choreoText = '5.3–6.5s Fighter B counter-attacks';
      else if (t >= 6.5 && t < 7.4) choreoText = '6.5–7.4s Fighter A dodges / rolls';
      else if (t >= 7.4 && t < 8.5) choreoText = '7.4–8.5s Energy slash or flying kick';
      else if (t >= 8.5 && t < 9.3) choreoText = '8.5–9.3s Both recoil';
      else if (t >= 9.3) choreoText = '9.3–10.0s Return to starting idle pose';
      setCurrentChoreography(choreoText);

      // 1. Draw Background
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (bgMode === 'white') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else if (bgMode === 'dark') {
        ctx.fillStyle = '#0F1117';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        // Parallax Zen Island Layers
        ['bg1', 'bg2', 'bg3', 'bg4', 'bg5'].forEach((layerKey, lIdx) => {
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
      }

      // 2. Compute Positions & Choreography States
      // Fighter A (Protagonist on left, facing right)
      // Fighter B (Rival on right, facing left)
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
        if (t === 3.5 || Math.random() < 0.4) {
          spawnParticles(bX, GROUND_Y - 25, 4, '#E2E8F0');
          spawnParticles(bX, GROUND_Y - 35, 3, '#EF4444');
        }
      }
      // 4.2 - 5.3s: Fighter B jumps back
      else if (t < 5.3) {
        const p = (t - 4.2) / 1.1;
        aX = 720;
        aState = 'idle';
        bX = 1020 + p * (1220 - 1020);
        bY = GROUND_Y - Math.sin(p * Math.PI) * 55;
        bState = 'jump';
      }
      // 5.3 - 6.5s: Fighter B counter-attacks
      else if (t < 6.5) {
        const p = (t - 5.3) / 1.2;
        bX = 1220 - p * (1220 - 750);
        bState = 'counter';
        aX = 720;
        aState = 'idle';
        if (Math.random() < 0.3) {
          spawnParticles(bX - 25, GROUND_Y - 30, 2, '#F43F5E');
        }
      }
      // 6.5 - 7.4s: Fighter A dodges / rolls
      else if (t < 7.4) {
        const p = (t - 6.5) / 0.9;
        aX = 720 - p * (720 - 580);
        aY = GROUND_Y - Math.sin(p * Math.PI) * 20;
        aState = 'dodge';
        bX = 750;
        bState = 'idle';
      }
      // 7.4 - 8.5s: Energy slash or flying kick
      else if (t < 8.5) {
        const p = (t - 7.4) / 1.1;
        aX = 580 + p * (840 - 580);
        aY = GROUND_Y - Math.sin(p * Math.PI) * 45;
        aState = 'energy';
        aAura = true;
        bX = 880;
        bState = 'idle';
        if (Math.random() < 0.35) {
          spawnParticles(aX, aY - 20, 3, '#00F5FF');
        }
      }
      // 8.5 - 9.3s: Both recoil
      else if (t < 9.3) {
        const p = (t - 8.5) / 0.8;
        aX = 840 - p * (840 - 520);
        bX = 880 + p * (1120 - 880);
        aState = 'hit';
        bState = 'hit';
        aFlash = t < 8.7;
        bFlash = t < 8.7;
        if (t === 8.5) {
          spawnParticles(700, GROUND_Y - 40, 15, '#F59E0B');
        }
      }
      // 9.3 - 10.0s: Return to starting idle pose
      else {
        const p = (t - 9.3) / 0.7;
        aX = 520 - p * (520 - 320);
        bX = 1120 + p * (1280 - 1120);
        aState = 'idle';
        bState = 'idle';
      }

      // 3. Render Fighter A
      const animFrame = Math.floor(now / 110);
      if (aState === 'idle') {
        const f = animFrame % 4;
        drawSprite(ctx, 'idle', f % 2, Math.floor(f / 2), 16, 16, aX, aY, SCALE, false);
      } else if (aState === 'run') {
        const f = animFrame % 6;
        drawSprite(ctx, 'run', f % 3, Math.floor(f / 3), 16, 16, aX, aY, SCALE, false);
      } else if (aState === 'attack1') {
        const f = Math.floor(((t - 2.5) / 1.0) * 19) % 19;
        drawSprite(ctx, 'attack1', f % 5, Math.floor(f / 5), 48, 48, aX, aY, SCALE * 0.9, false);
      } else if (aState === 'dodge') {
        const f = animFrame % 9;
        drawSprite(ctx, 'jump', f % 3, Math.floor(f / 3), 16, 16, aX, aY, SCALE, false);
      } else if (aState === 'energy') {
        const f = animFrame % 16;
        drawSprite(ctx, 'zen', f % 4, Math.floor(f / 4), 32, 32, aX, aY, SCALE * 0.8, false, false, true);
      } else if (aState === 'hit') {
        const f = animFrame % 2;
        drawSprite(ctx, 'hit', f, 0, 16, 16, aX, aY, SCALE, false, aFlash);
      }

      // 4. Render Fighter B (Flipped facing left)
      if (bState === 'idle') {
        const f = (animFrame + 2) % 4;
        drawSprite(ctx, 'idle', f % 2, Math.floor(f / 2), 16, 16, bX, bY, SCALE, true);
      } else if (bState === 'counter') {
        const f = animFrame % 8;
        drawSprite(ctx, 'dashAttack', f % 4, Math.floor(f / 4), 48, 48, bX, bY, SCALE * 0.9, true);
      } else if (bState === 'jump') {
        const f = animFrame % 9;
        drawSprite(ctx, 'jump', f % 3, Math.floor(f / 3), 16, 16, bX, bY, SCALE, true);
      } else if (bState === 'hit') {
        const f = animFrame % 2;
        drawSprite(ctx, 'hit', f, 0, 16, 16, bX, bY, SCALE, true, bFlash);
      }

      // 5. Update & Render Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }
        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 6. Subtle Floor Shadow Under Fighters
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
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
  }, [isPlaying, bgMode, spawnParticles]);

  // Restart choreography sequence
  const handleReset = () => {
    startTimeRef.current = performance.now();
    setCurrentTimeSec(0);
    particlesRef.current = [];
  };

  // Toggle playback
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

  // 10-Second WebM / MP4 video export recorder
  const handleExportVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      setIsExporting(true);
      setExportProgress(0);
      handleReset();

      const stream = canvas.captureStream(30); // 30 fps per user prompt
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      recordedChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `samurai_duel_10s_${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsExporting(false);
        setExportProgress(100);
      };

      recorder.start();

      // Track progress across the exact 10.0 seconds
      const startTime = performance.now();
      const progressTimer = setInterval(() => {
        const elapsed = (performance.now() - startTime) / 1000;
        setExportProgress(Math.min(100, Math.floor((elapsed / 10.0) * 100)));
        if (elapsed >= 10.0) {
          clearInterval(progressTimer);
          if (recorder.state === 'recording') {
            recorder.stop();
          }
        }
      }, 200);
    } catch (err) {
      console.error('Export failed:', err);
      setIsExporting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-hairline bg-surface p-4 sm:p-6 shadow-xl">
      {/* Header with Title and Choreography Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
            <Swords className="size-4" />
          </div>
          <div>
            <h3 className="font-cabinet text-[16px] sm:text-[18px] font-bold text-strong leading-tight">
              Samurai Duel — 10s Choreographed Battle Strip
            </h3>
            <p className="font-mono text-[11px] text-ink-soft">
              1600 × 260 · 30 FPS · Pixel Art Sprite Animation
            </p>
          </div>
        </div>

        {/* Current Choreography Beat Indicator */}
        <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-subtle px-3 py-1 font-mono text-[10.5px] sm:text-[11px] text-strong self-start sm:self-auto">
          <span className="size-2 rounded-full bg-red-500 shrink-0" />
          <span className="font-semibold truncate max-w-[200px] sm:max-w-none">{currentChoreography}</span>
          <span className="text-ink-soft shrink-0">({currentTimeSec.toFixed(1)}s / 10.0s)</span>
        </div>
      </div>

      {/* Canvas Battle Arena Strip */}
      <div className="relative mt-4 w-full overflow-hidden rounded-xl border border-hairline/80 bg-neutral-950 shadow-inner">
        <canvas
          ref={canvasRef}
          width={1600}
          height={260}
          className="w-full h-auto block select-none"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Fighter Labels HUD (Compact on mobile to prevent central collision) */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-4 flex items-center gap-1.5 sm:gap-2 rounded-md bg-black/60 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[9px] sm:text-[10px] text-sky-400 backdrop-blur-sm border border-sky-500/30">
          <span className="size-1.5 rounded-full bg-sky-400" />
          <span className="hidden sm:inline">FIGHTER A (CYAN BLADE)</span>
          <span className="sm:hidden font-bold">P1 (CYAN)</span>
        </div>

        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-4 flex items-center gap-1.5 sm:gap-2 rounded-md bg-black/60 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[9px] sm:text-[10px] text-rose-400 backdrop-blur-sm border border-rose-500/30">
          <span className="size-1.5 rounded-full bg-rose-400" />
          <span className="hidden sm:inline">FIGHTER B (CRIMSON SHADOW)</span>
          <span className="sm:hidden font-bold">P2 (RED)</span>
        </div>

        {/* 10s Loop Progress Line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500 transition-all duration-100" style={{ width: `${(currentTimeSec / 10.0) * 100}%` }} />
      </div>

      {/* Interactive Controls & Video Exporter Bar */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[12px]">
        {/* Playback Controls & BG Mode */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex items-center gap-1.5 rounded-lg border border-hairline bg-subtle px-3 py-1.5 font-bold text-strong hover:bg-subtle-strong transition-colors"
          >
            {isPlaying ? <Pause className="size-3.5 text-amber-500" /> : <Play className="size-3.5 text-emerald-500" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Restart 10s Sequence"
            className="rounded-lg border border-hairline bg-subtle p-1.5 text-ink-soft hover:text-strong transition-colors"
          >
            <RotateCcw className="size-3.5" />
          </button>

          {/* Background Mode Selector */}
          <div className="flex items-center rounded-lg border border-hairline bg-subtle p-0.5 text-[11px]">
            <button
              onClick={() => setBgMode('island')}
              className={`px-2 py-1 rounded ${bgMode === 'island' ? 'bg-surface font-bold text-strong shadow-xs' : 'text-ink-soft'}`}
            >
              Zen Island
            </button>
            <button
              onClick={() => setBgMode('white')}
              className={`px-2 py-1 rounded ${bgMode === 'white' ? 'bg-surface font-bold text-strong shadow-xs' : 'text-ink-soft'}`}
            >
              White BG
            </button>
            <button
              onClick={() => setBgMode('dark')}
              className={`px-2 py-1 rounded ${bgMode === 'dark' ? 'bg-surface font-bold text-strong shadow-xs' : 'text-ink-soft'}`}
            >
              Dark BG
            </button>
          </div>
        </div>

        {/* Export Video Button */}
        <div className="w-full sm:w-auto">
          <button
            type="button"
            onClick={handleExportVideo}
            disabled={isExporting}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 font-bold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50"
          >
            <Film className="size-3.5" />
            <span>
              {isExporting ? `Exporting 10s Loop (${exportProgress}%)` : 'Export Video (WebM / 30fps)'}
            </span>
            <Download className="size-3 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

