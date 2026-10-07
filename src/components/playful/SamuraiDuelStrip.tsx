import React, { useEffect, useRef, useState, useCallback } from 'react';

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
  const [gameMode, setGameMode] = useState<'anime' | 'race'>('anime');

  const animationFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const pausedTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  // Spawn visual effect particles
  const spawnParticles = useCallback((x: number, y: number, count: number, color: string, speedMult = 1) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 4 + 1.5) * speedMult;
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

  // Main 10s Choreography Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CANVAS_WIDTH = 1600;
    const CANVAS_HEIGHT = 260;
    const GROUND_Y = 212;

    const render = (now: number) => {
      if (!isPlaying) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      const t = elapsed % 10.0; // 0.0s to 10.0s seamless loop

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // ==========================================
      // MODE 1: ANIME PIXEL FIGHTING DUEL (NARUTO VS ICHIGO)
      // ==========================================
      if (gameMode === 'anime') {
        // 1. Clean Minimalist Background (Matching user reference photo)
        ctx.fillStyle = '#090A0F';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Subtle ambient atmospheric fog/vignette
        const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        bgGrad.addColorStop(0, '#090A0F');
        bgGrad.addColorStop(0.7, '#0D1117');
        bgGrad.addColorStop(1, '#08090D');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Ground Baseline (Clean, minimalist ground line from user screenshot)
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y);
        ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
        ctx.stroke();

        // Subtle ground reflection / floor plane
        const floorGrad = ctx.createLinearGradient(0, GROUND_Y, 0, CANVAS_HEIGHT);
        floorGrad.addColorStop(0, 'rgba(30, 41, 59, 0.4)');
        floorGrad.addColorStop(1, 'rgba(15, 23, 42, 0.0)');
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

        // ------------------------------------------
        // Anime Duel Choreography Logic
        // ------------------------------------------
        // Left Fighter: Naruto (Shinobi)
        // Right Fighter: Ichigo (Shinigami)
        // Projectile: Cyan Crescent Getsuga Tensho Wave

        let narutoX = 420;
        let narutoY = GROUND_Y;
        let narutoPose: 'stance' | 'leap' | 'rasengan' | 'land' | 'dodge' = 'stance';
        let rasenganActive = false;

        let ichigoX = 1180;
        let ichigoY = GROUND_Y;
        let ichigoPose: 'stance' | 'slash' | 'block' | 'flashstep' = 'stance';

        let crescentWaveX = -999;
        let crescentWaveY = GROUND_Y - 45;
        let crescentWaveActive = false;

        // 0.0 - 1.2s: Standoff Ready Stance
        if (t < 1.2) {
          narutoX = 420;
          ichigoX = 1180;
          narutoPose = 'stance';
          ichigoPose = 'stance';
        }
        // 1.2 - 2.8s: Ichigo Unleashes Getsuga Tensho Crescent Slash! (Exact reference screenshot pose!)
        else if (t < 2.8) {
          const slashProgress = (t - 1.2) / 1.6;
          ichigoX = 1120;
          ichigoPose = 'slash'; // Low crouch forward-slash release pose
          crescentWaveActive = true;
          crescentWaveX = 1050 - slashProgress * 750; // Sweeps leftwards toward Naruto
          crescentWaveY = GROUND_Y - 42;

          narutoX = 420;
          narutoPose = 'stance';

          if (Math.random() < 0.4) {
            spawnParticles(crescentWaveX + 20, crescentWaveY, 2, '#00F5FF', 1.2);
          }
        }
        // 2.8 - 4.4s: Naruto Leaps High into Midair! (Exact reference screenshot leap pose!)
        else if (t < 4.4) {
          const leapProgress = (t - 2.8) / 1.6;
          // Parabolic jump arc flipping over the wave
          const jumpHeight = Math.sin(leapProgress * Math.PI) * 95;
          narutoX = 420 + leapProgress * 220;
          narutoY = GROUND_Y - jumpHeight;
          narutoPose = 'leap'; // Airborne attack descent angle

          ichigoX = 1120;
          ichigoPose = 'stance';

          // Wave continues dissipating off to the left
          if (leapProgress < 0.5) {
            crescentWaveActive = true;
            crescentWaveX = 300 - leapProgress * 300;
          }
        }
        // 4.4 - 5.8s: Naruto Summons Rasengan & Dives In!
        else if (t < 5.8) {
          const diveProgress = (t - 4.4) / 1.4;
          narutoX = 640 + diveProgress * 180;
          narutoY = (GROUND_Y - 95) + diveProgress * 95;
          narutoPose = 'rasengan';
          rasenganActive = true;

          ichigoX = 1020 - diveProgress * 120;
          ichigoPose = diveProgress > 0.6 ? 'block' : 'stance';

          if (Math.random() < 0.5) {
            spawnParticles(narutoX + 20, narutoY - 25, 3, '#38BDF8', 1.5);
          }
        }
        // 5.8 - 7.0s: Massive Energy Clash & Shockwave Explosion!
        else if (t < 7.0) {
          const clashProgress = (t - 5.8) / 1.2;
          narutoX = 820;
          narutoY = GROUND_Y;
          narutoPose = 'rasengan';
          rasenganActive = true;

          ichigoX = 880;
          ichigoY = GROUND_Y;
          ichigoPose = 'block';

          // Spawning epic clash sparks
          if (clashProgress < 0.8 && Math.random() < 0.7) {
            spawnParticles(850, GROUND_Y - 35, 4, '#00F5FF', 2.0);
            spawnParticles(850, GROUND_Y - 35, 3, '#F59E0B', 2.0);
          }

          // Expanding energy shockwave ring
          const ringRadius = clashProgress * 120;
          ctx.save();
          ctx.strokeStyle = `rgba(0, 245, 255, ${Math.max(0, 1 - clashProgress)})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(850, GROUND_Y - 35, ringRadius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = `rgba(251, 146, 60, ${Math.max(0, 1 - clashProgress)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(850, GROUND_Y - 35, ringRadius * 0.75, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
        // 7.0 - 8.6s: Ichigo Flash-Step Shunpo & Naruto Substitution Dodge
        else if (t < 8.6) {
          const stepProgress = (t - 7.0) / 1.6;
          narutoX = 820 - stepProgress * 260;
          narutoY = GROUND_Y;
          narutoPose = 'land';

          ichigoX = 880 + stepProgress * 220;
          ichigoY = GROUND_Y;
          ichigoPose = 'flashstep';

          if (Math.random() < 0.3) {
            spawnParticles(narutoX - 15, GROUND_Y - 8, 2, '#94A3B8', 0.8);
          }
        }
        // 8.6 - 10.0s: Reset back to starting standoff stances smoothly
        else {
          const resetProgress = (t - 8.6) / 1.4;
          narutoX = 560 - resetProgress * 140;
          narutoY = GROUND_Y;
          narutoPose = 'stance';

          ichigoX = 1100 + resetProgress * 80;
          ichigoY = GROUND_Y;
          ichigoPose = 'stance';
        }

        // ------------------------------------------
        // Draw Characters & Projectiles
        // ------------------------------------------

        // 1. Draw Crescent Getsuga Tensho Energy Wave (Exact match to reference photo!)
        if (crescentWaveActive && crescentWaveX > 0 && crescentWaveX < CANVAS_WIDTH) {
          ctx.save();
          ctx.translate(crescentWaveX, crescentWaveY);

          // Outer glowing cyan aura
          ctx.shadowColor = '#00F5FF';
          ctx.shadowBlur = 24;

          // Crescent Blade Arc Path
          ctx.beginPath();
          // Outer curve facing left
          ctx.ellipse(0, 0, 18, 55, 0, -Math.PI / 2, Math.PI / 2, true);
          // Inner curve hollowed out to form crescent
          ctx.ellipse(12, 0, 12, 48, 0, Math.PI / 2, -Math.PI / 2, false);
          ctx.closePath();

          const waveGrad = ctx.createLinearGradient(-18, 0, 16, 0);
          waveGrad.addColorStop(0, '#FFFFFF'); // Bright cutting edge
          waveGrad.addColorStop(0.3, '#38BDF8'); // Vivid electric cyan
          waveGrad.addColorStop(0.8, '#00F5FF'); // Neon energy
          waveGrad.addColorStop(1, 'rgba(0, 245, 255, 0.2)');
          ctx.fillStyle = waveGrad;
          ctx.fill();

          // Intense core center line
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.ellipse(2, 0, 16, 50, 0, -Math.PI * 0.42, Math.PI * 0.42, true);
          ctx.stroke();

          ctx.restore();
        }

        // 2. Draw Left Character: Naruto (Shinobi)
        ctx.save();
        ctx.translate(narutoX, narutoY);

        // Ground shadow
        const shadowScale = Math.max(0.3, 1 - (GROUND_Y - narutoY) / 120);
        ctx.fillStyle = `rgba(0, 0, 0, ${0.45 * shadowScale})`;
        ctx.beginPath();
        ctx.ellipse(0, GROUND_Y - narutoY, 20 * shadowScale, 5 * shadowScale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Naruto Airborne Leap Pose (Matching user screenshot!)
        if (narutoPose === 'leap') {
          ctx.rotate(0.28); // Dynamic forward attack angle

          // Torso & Orange Tracksuit
          ctx.fillStyle = '#EA580C'; // Vivid orange jumpsuit
          ctx.fillRect(-10, -52, 20, 24);

          // Dark blue shoulder accents
          ctx.fillStyle = '#1E3A8A';
          ctx.fillRect(-11, -53, 22, 6);

          // White neck collar
          ctx.fillStyle = '#F8FAFC';
          ctx.fillRect(-8, -48, 16, 4);

          // Arms swept back in ninja leap
          ctx.fillStyle = '#EA580C';
          ctx.fillRect(-16, -46, 8, 18);
          ctx.fillRect(8, -44, 8, 18);
          // Hands
          ctx.fillStyle = '#FDE047';
          ctx.fillRect(-15, -28, 6, 6);
          ctx.fillRect(9, -26, 6, 6);

          // Legs bent in midair jump
          ctx.fillStyle = '#EA580C'; // Orange trousers
          ctx.fillRect(-12, -28, 10, 16);
          ctx.fillRect(2, -26, 10, 16);
          // White thigh bandage wrap
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(3, -22, 8, 4);
          // Blue shinobi sandals
          ctx.fillStyle = '#1E3A8A';
          ctx.fillRect(-12, -12, 10, 8);
          ctx.fillRect(3, -10, 10, 8);

          // Head & Spiky Blond Hair
          ctx.fillStyle = '#FED7AA'; // Skin tone
          ctx.fillRect(-8, -68, 16, 16);

          // Black Headband with Silver Plate
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(-9, -65, 18, 5);
          ctx.fillStyle = '#E2E8F0'; // Metal plate
          ctx.fillRect(-4, -65, 8, 5);

          // Spiky Yellow Hair
          ctx.fillStyle = '#FACC15';
          ctx.beginPath();
          ctx.moveTo(-10, -66);
          ctx.lineTo(-6, -76);
          ctx.lineTo(-1, -68);
          ctx.lineTo(4, -77);
          ctx.lineTo(8, -69);
          ctx.lineTo(12, -74);
          ctx.lineTo(10, -64);
          ctx.closePath();
          ctx.fill();
        }
        // Naruto Ground Stance / Rasengan Pose
        else {
          // Torso
          ctx.fillStyle = '#EA580C';
          ctx.fillRect(-10, -48, 20, 24);
          ctx.fillStyle = '#1E3A8A';
          ctx.fillRect(-11, -49, 22, 6);

          // Legs in combat stance
          ctx.fillStyle = '#EA580C';
          ctx.fillRect(-14, -24, 11, 24);
          ctx.fillRect(3, -24, 11, 24);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(4, -18, 9, 4); // Thigh tape
          ctx.fillStyle = '#1E3A8A';
          ctx.fillRect(-15, 0, 13, -6);
          ctx.fillRect(3, 0, 13, -6);

          // Arms
          ctx.fillStyle = '#EA580C';
          ctx.fillRect(-16, -44, 8, 18);
          ctx.fillRect(8, -42, 10, 16);

          // Head
          ctx.fillStyle = '#FED7AA';
          ctx.fillRect(-8, -64, 16, 16);
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(-9, -61, 18, 5);
          ctx.fillStyle = '#E2E8F0';
          ctx.fillRect(-4, -61, 8, 5);

          // Spiky Blond Hair
          ctx.fillStyle = '#FACC15';
          ctx.beginPath();
          ctx.moveTo(-10, -62);
          ctx.lineTo(-6, -72);
          ctx.lineTo(-1, -64);
          ctx.lineTo(4, -73);
          ctx.lineTo(8, -65);
          ctx.lineTo(12, -70);
          ctx.lineTo(10, -60);
          ctx.closePath();
          ctx.fill();

          // Swirling Cyan Rasengan
          if (rasenganActive) {
            ctx.save();
            ctx.shadowColor = '#00F5FF';
            ctx.shadowBlur = 18;
            ctx.fillStyle = '#38BDF8';
            ctx.beginPath();
            ctx.arc(22, -32, 14, 0, Math.PI * 2);
            ctx.fill();

            // Inner white-hot core
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(22, -32, 7, 0, Math.PI * 2);
            ctx.fill();

            // Swirling orbital energy rings
            ctx.strokeStyle = '#00F5FF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(22, -32, 18, 8, (t * 8) % Math.PI, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }
        ctx.restore();

        // 3. Draw Right Character: Ichigo (Shinigami)
        ctx.save();
        ctx.translate(ichigoX, ichigoY);

        // Ground shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 24, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Afterimage trail during Flash-Step
        if (ichigoPose === 'flashstep') {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
          ctx.fillRect(35, -55, 20, 50);
          ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
          ctx.fillRect(65, -55, 20, 50);
        }

        // Ichigo Forward Slash Stance (Matching reference screenshot exactly!)
        if (ichigoPose === 'slash') {
          // Low forward crouch
          ctx.fillStyle = '#0F172A'; // Black Shihakusho robe
          ctx.beginPath();
          ctx.moveTo(-18, -44);
          ctx.lineTo(15, -42);
          ctx.lineTo(26, 0);
          ctx.lineTo(-24, 0);
          ctx.closePath();
          ctx.fill();

          // White waist sash & collar lining
          ctx.fillStyle = '#F8FAFC';
          ctx.fillRect(-10, -28, 22, 4);
          ctx.fillRect(-8, -46, 16, 3);

          // Head & Spiky Orange Hair
          ctx.fillStyle = '#FED7AA';
          ctx.fillRect(-9, -58, 16, 14);

          ctx.fillStyle = '#EA580C'; // Spiky orange hair
          ctx.beginPath();
          ctx.moveTo(-11, -56);
          ctx.lineTo(-7, -68);
          ctx.lineTo(-2, -58);
          ctx.lineTo(3, -69);
          ctx.lineTo(8, -60);
          ctx.lineTo(13, -66);
          ctx.lineTo(10, -54);
          ctx.closePath();
          ctx.fill();

          // Giant Cleaver Zangetsu Sword (Swept forward in slash release)
          ctx.save();
          ctx.translate(14, -36);
          ctx.rotate(0.38);

          // Giant silver cutting blade
          ctx.fillStyle = '#E2E8F0';
          ctx.beginPath();
          ctx.moveTo(0, -6);
          ctx.lineTo(55, -2);
          ctx.lineTo(58, 8);
          ctx.lineTo(0, 10);
          ctx.closePath();
          ctx.fill();

          // Black back spine of Zangetsu
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(0, -7, 56, 3);

          // White hilt wrapping
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(-16, -2, 16, 8);
          ctx.restore();
        }
        // Ichigo Defense Block / Combat Stance
        else {
          // Shihakusho Robe Body
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(-12, -48, 24, 26);
          ctx.fillRect(-16, -22, 32, 22);

          // White collar & belt
          ctx.fillStyle = '#F8FAFC';
          ctx.fillRect(-10, -26, 20, 4);
          ctx.fillRect(-8, -50, 16, 3);

          // Head & Spiky Orange Hair
          ctx.fillStyle = '#FED7AA';
          ctx.fillRect(-8, -64, 16, 15);

          ctx.fillStyle = '#EA580C';
          ctx.beginPath();
          ctx.moveTo(-10, -62);
          ctx.lineTo(-6, -74);
          ctx.lineTo(-1, -64);
          ctx.lineTo(4, -75);
          ctx.lineTo(9, -66);
          ctx.lineTo(14, -72);
          ctx.lineTo(11, -60);
          ctx.closePath();
          ctx.fill();

          // Zangetsu Block Position (Held defensively forward)
          ctx.save();
          ctx.translate(-8, -32);
          ctx.rotate(ichigoPose === 'block' ? -0.45 : -0.15);

          ctx.fillStyle = '#E2E8F0';
          ctx.fillRect(0, -55, 12, 60);
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(10, -55, 3, 60); // Black spine
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(2, 5, 8, 14); // Hilt
          ctx.restore();
        }
        ctx.restore();
      }

      // ==========================================
      // MODE 2: CAR VS SUPERBIKE HIGHWAY RACE
      // ==========================================
      else {
        // 1. Cyberpunk / Sunset Highway Background
        const skyGrad = ctx.createLinearGradient(0, 0, 0, 135);
        skyGrad.addColorStop(0, '#060714');
        skyGrad.addColorStop(0.5, '#1E1B4B');
        skyGrad.addColorStop(1, '#3B0764');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, CANVAS_WIDTH, 135);

        // Distant city silhouette
        ctx.fillStyle = '#090A14';
        for (let bx = 0; bx < CANVAS_WIDTH; bx += 70) {
          const bH = 30 + ((bx * 37) % 55);
          ctx.fillRect(bx, 135 - bH, 50, bH);
          // Lit windows
          ctx.fillStyle = (bx % 3 === 0) ? '#38BDF8' : '#F59E0B';
          ctx.fillRect(bx + 10, 135 - bH + 12, 4, 6);
          ctx.fillRect(bx + 25, 135 - bH + 22, 4, 6);
          ctx.fillStyle = '#090A14';
        }

        // 2. Asphalt Highway Road (y = 135 to y = 255)
        const ROAD_TOP = 135;
        const ROAD_BOTTOM = 255;
        const roadGrad = ctx.createLinearGradient(0, ROAD_TOP, 0, ROAD_BOTTOM);
        roadGrad.addColorStop(0, '#1E293B');
        roadGrad.addColorStop(0.3, '#0F172A');
        roadGrad.addColorStop(1, '#020617');
        ctx.fillStyle = roadGrad;
        ctx.fillRect(0, ROAD_TOP, CANVAS_WIDTH, ROAD_BOTTOM - ROAD_TOP);

        // Upper and lower guardrail lines
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(0, ROAD_TOP, CANVAS_WIDTH, 3);
        ctx.fillRect(0, ROAD_BOTTOM - 4, CANVAS_WIDTH, 4);

        // Moving White Dashed Centerlines (Speed: 1600px/s)
        const roadSpeed = 1800;
        const dashOffset = (elapsed * roadSpeed) % 120;
        ctx.fillStyle = '#F8FAFC';
        for (let x = -dashOffset; x < CANVAS_WIDTH + 120; x += 90) {
          ctx.fillRect(x, 192, 48, 4);
        }

        // Fast wind speedlines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          const lineY = 145 + (i * 12);
          const lineX = ((elapsed * 2400 + i * 210) % CANVAS_WIDTH);
          ctx.beginPath();
          ctx.moveTo(CANVAS_WIDTH - lineX, lineY);
          ctx.lineTo(CANVAS_WIDTH - lineX - 180, lineY);
          ctx.stroke();
        }

        // ------------------------------------------
        // Race Choreography Logic (10s Loop)
        // ------------------------------------------
        // Racer 1: Neon GT Supercar (Red / Carbon)
        // Racer 2: Aerodynamic Superbike (Cyan / White)

        let carX = 640;
        let carY = 215;
        let carBoosting = false;
        let carDrafting = false;

        let bikeX = 720;
        let bikeY = 168;
        let bikeBoosting = false;
        let bikeWheelie = false;

        // 0.0 - 2.5s: Cruising Side-by-Side at 190 MPH
        if (t < 2.5) {
          carX = 580 + Math.sin(t * 3) * 20;
          bikeX = 700 + Math.cos(t * 3) * 25;
        }
        // 2.5 - 4.5s: Superbike Hits Nitro & Pulls Massive Wheelie!
        else if (t < 4.5) {
          const surge = (t - 2.5) / 2.0;
          bikeX = 700 + surge * 320;
          bikeBoosting = true;
          bikeWheelie = surge < 0.75;

          carX = 580 - surge * 60;
          carDrafting = true;

          if (Math.random() < 0.6) {
            spawnParticles(bikeX - 45, bikeY + 12, 3, '#8B5CF6', 2.0);
          }
        }
        // 4.5 - 7.0s: Supercar Activates Twin-Turbo Boost & Overtakes!
        else if (t < 7.0) {
          const overtake = (t - 4.5) / 2.5;
          carBoosting = true;
          carX = 520 + overtake * 480; // Rocketing to 1000px
          bikeX = 1020 - overtake * 120;
          bikeBoosting = false;
          bikeWheelie = false;

          if (Math.random() < 0.7) {
            spawnParticles(carX - 85, carY + 8, 4, '#F97316', 2.5);
            spawnParticles(carX - 85, carY + 8, 3, '#00F5FF', 2.2);
          }
        }
        // 7.0 - 8.8s: Superbike Drafts into Slipstream alongside Car in High-Speed Curve!
        else if (t < 8.8) {
          const draftProgress = (t - 7.0) / 1.8;
          carX = 1000 - draftProgress * 180;
          bikeX = 900 + draftProgress * 60;
          carBoosting = true;
          bikeBoosting = true;

          // Road friction tire sparks
          if (Math.random() < 0.4) {
            spawnParticles(carX - 35, carY + 16, 2, '#F59E0B', 1.2);
            spawnParticles(bikeX - 20, bikeY + 16, 2, '#FFFFFF', 1.2);
          }
        }
        // 8.8 - 10.0s: Neck-and-Neck Photo Finish surge resetting smoothly
        else {
          const finish = (t - 8.8) / 1.2;
          carX = 820 - finish * 240;
          bikeX = 960 - finish * 260;
        }

        // ------------------------------------------
        // Draw Racer 1: Neon GT Supercar
        // ------------------------------------------
        ctx.save();
        ctx.translate(carX, carY);

        // Neon Cyan Chassis Underglow
        ctx.shadowColor = '#00F5FF';
        ctx.shadowBlur = 18;
        ctx.fillStyle = 'rgba(0, 245, 255, 0.45)';
        ctx.fillRect(-70, 14, 140, 6);
        ctx.shadowBlur = 0;

        // Ground tire shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(-75, 12, 150, 6);

        // Aerodynamic Sports Car Chassis (Cherry Crimson & Carbon Fiber)
        const carGrad = ctx.createLinearGradient(-75, -20, 75, 10);
        carGrad.addColorStop(0, '#E11D48'); // Cherry red
        carGrad.addColorStop(0.6, '#BE123C');
        carGrad.addColorStop(1, '#881337');
        ctx.fillStyle = carGrad;

        // Car Body Polygon
        ctx.beginPath();
        ctx.moveTo(-75, 12);
        ctx.lineTo(-75, -4);
        ctx.lineTo(-50, -10);
        ctx.lineTo(-20, -22); // Windshield slope
        ctx.lineTo(25, -22);  // Roofline
        ctx.lineTo(55, -6);   // Hood slope
        ctx.lineTo(75, -2);   // Front bumper
        ctx.lineTo(75, 12);
        ctx.closePath();
        ctx.fill();

        // Carbon fiber roof & black tinted windows
        ctx.fillStyle = '#0F172A';
        ctx.beginPath();
        ctx.moveTo(-18, -20);
        ctx.lineTo(22, -20);
        ctx.lineTo(46, -8);
        ctx.lineTo(-12, -8);
        ctx.closePath();
        ctx.fill();

        // Window reflection glare
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-5, -18);
        ctx.lineTo(30, -10);
        ctx.stroke();

        // Rear Racing GT Wing Spoiler
        ctx.fillStyle = '#111827';
        ctx.fillRect(-76, -18, 14, 3);
        ctx.fillRect(-72, -15, 3, 10);

        // LED Headlights casting forward beam
        ctx.fillStyle = '#E0F2FE';
        ctx.fillRect(72, -1, 4, 5);

        ctx.save();
        const beamGrad = ctx.createLinearGradient(75, 2, 240, 2);
        beamGrad.addColorStop(0, 'rgba(224, 242, 254, 0.6)');
        beamGrad.addColorStop(1, 'rgba(224, 242, 254, 0.0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(75, 0);
        ctx.lineTo(240, -15);
        ctx.lineTo(240, 25);
        ctx.lineTo(75, 6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Dual Spinning Wheels (Wheel 1: x = -48, Wheel 2: x = 48)
        [-48, 48].forEach((wx) => {
          ctx.fillStyle = '#0F172A'; // Rubber tire
          ctx.beginPath();
          ctx.arc(wx, 12, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#E2E8F0'; // Alloy rim
          ctx.beginPath();
          ctx.arc(wx, 12, 7, 0, Math.PI * 2);
          ctx.fill();

          // Spinning rim spokes
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1.5;
          const wheelAngle = (elapsed * 32) % (Math.PI * 2);
          ctx.beginPath();
          ctx.moveTo(wx - Math.cos(wheelAngle) * 6, 12 - Math.sin(wheelAngle) * 6);
          ctx.lineTo(wx + Math.cos(wheelAngle) * 6, 12 + Math.sin(wheelAngle) * 6);
          ctx.stroke();
        });

        // Nitro Exhaust Flames (When Boosting)
        if (carBoosting) {
          ctx.save();
          ctx.translate(-76, 5);

          // Outer fiery flame cone
          const flameSize = 25 + Math.sin(now * 0.05) * 8;
          ctx.fillStyle = '#F97316';
          ctx.beginPath();
          ctx.moveTo(0, -4);
          ctx.lineTo(-flameSize, 0);
          ctx.lineTo(0, 4);
          ctx.closePath();
          ctx.fill();

          // Inner blue-hot core
          ctx.fillStyle = '#38BDF8';
          ctx.beginPath();
          ctx.moveTo(0, -2);
          ctx.lineTo(-flameSize * 0.6, 0);
          ctx.lineTo(0, 2);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();

        // ------------------------------------------
        // Draw Racer 2: Aerodynamic Superbike & Rider
        // ------------------------------------------
        ctx.save();
        ctx.translate(bikeX, bikeY);

        // Power wheelie rotation angle
        if (bikeWheelie) {
          ctx.rotate(-0.28);
        }

        // Bike ground shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(-35, 14, 70, 5);

        // Bike Chassis (Pearl White & Cyan)
        ctx.fillStyle = '#06B6D4'; // Electric cyan fairings
        ctx.beginPath();
        ctx.moveTo(-30, 10);
        ctx.lineTo(-20, -4);
        ctx.lineTo(10, -12); // Tank
        ctx.lineTo(32, -4);  // Front fairing
        ctx.lineTo(25, 10);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#F8FAFC'; // White accent panels
        ctx.fillRect(-8, -8, 20, 6);

        // Spinning Wheels (Rear: x = -26, Front: x = 28)
        [-26, 28].forEach((wx) => {
          ctx.fillStyle = '#0F172A';
          ctx.beginPath();
          ctx.arc(wx, 10, 10, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#06B6D4'; // Cyan alloy rim
          ctx.beginPath();
          ctx.arc(wx, 10, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.2;
          const bAngle = (elapsed * 38) % (Math.PI * 2);
          ctx.beginPath();
          ctx.moveTo(wx - Math.cos(bAngle) * 5, 10 - Math.sin(bAngle) * 5);
          ctx.lineTo(wx + Math.cos(bAngle) * 5, 10 + Math.sin(bAngle) * 5);
          ctx.stroke();
        });

        // Rider in Aerodynamic Racing Tuck
        // Torso / Leathers
        ctx.fillStyle = '#0F172A';
        ctx.beginPath();
        ctx.moveTo(-16, -2);
        ctx.lineTo(-4, -18);
        ctx.lineTo(16, -18);
        ctx.lineTo(14, -6);
        ctx.closePath();
        ctx.fill();

        // Helmet with Gold/Cyan Visor Glare
        ctx.fillStyle = '#06B6D4';
        ctx.beginPath();
        ctx.arc(14, -22, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#F59E0B'; // Gold reflective visor
        ctx.fillRect(15, -24, 5, 4);

        // Headlight beam
        ctx.save();
        const bBeam = ctx.createLinearGradient(32, 2, 160, 2);
        bBeam.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
        bBeam.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
        ctx.fillStyle = bBeam;
        ctx.beginPath();
        ctx.moveTo(32, -4);
        ctx.lineTo(160, -12);
        ctx.lineTo(160, 16);
        ctx.lineTo(32, 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Superbike Exhaust Nitro Fire (When Boosting)
        if (bikeBoosting) {
          ctx.save();
          ctx.translate(-34, 4);
          const bFlame = 20 + Math.sin(now * 0.08) * 6;
          ctx.fillStyle = '#8B5CF6'; // Violet nitro
          ctx.beginPath();
          ctx.moveTo(0, -3);
          ctx.lineTo(-bFlame, 0);
          ctx.lineTo(0, 3);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#38BDF8';
          ctx.beginPath();
          ctx.moveTo(0, -1.5);
          ctx.lineTo(-bFlame * 0.5, 0);
          ctx.lineTo(0, 1.5);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();
      }

      // ------------------------------------------
      // 4. Update and Render Active Particles
      // ------------------------------------------
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

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, gameMode, spawnParticles]);

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
    <div className="relative w-full flex flex-col gap-2">
      {/* Sleek Minimalist Mode Switcher Bar */}
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-mono text-[11px] font-bold text-strong tracking-wide truncate">
            {gameMode === 'anime'
              ? 'Anime Duel · Naruto vs Ichigo (10s Battle Loop)'
              : 'Highway Drag · Supercar vs Superbike (Nitro Race Loop)'}
          </span>
        </div>

        {/* Clean Mode Switcher Pill */}
        <div className="flex items-center rounded-lg border border-hairline bg-subtle p-0.5 font-mono text-[11px] shrink-0">
          <button
            type="button"
            onClick={() => setGameMode('anime')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md transition-all ${
              gameMode === 'anime'
                ? 'bg-surface font-bold text-strong shadow-xs'
                : 'text-ink-soft hover:text-strong'
            }`}
          >
            <span>⚔️</span>
            <span>Anime Duel</span>
          </button>

          <button
            type="button"
            onClick={() => setGameMode('race')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md transition-all ${
              gameMode === 'race'
                ? 'bg-surface font-bold text-strong shadow-xs'
                : 'text-ink-soft hover:text-strong'
            }`}
          >
            <span>🏎️</span>
            <span>Car vs Bike</span>
          </button>
        </div>
      </div>

      {/* Pure Cinematic Game Canvas Frame */}
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
    </div>
  );
};
