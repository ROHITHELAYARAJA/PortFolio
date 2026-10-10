import React, { useState, useEffect, useRef } from 'react';
import { useHeroApi } from '../../hooks/useHeroApi';
import { RefreshCw, ArrowUpRight, Code2, MapPin, Phone, Globe, Clock, Mail } from 'lucide-react';
import { RdxLogo } from '../ui/RdxLogo';

interface HeroProfileProps {
  onOpenContact?: () => void;
}

export const HeroProfile: React.FC<HeroProfileProps> = () => {
  const { profile, isLive, loading, refresh } = useHeroApi();
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTime, setCurrentTime] = useState('22:30');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodeRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const istTime = now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setCurrentTime(istTime);
      } catch {
        setCurrentTime('22:30');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    if (isPlayingMusic) {
      if (oscillatorNodeRef.current) {
        try {
          oscillatorNodeRef.current.stop();
          oscillatorNodeRef.current.disconnect();
        } catch (_) {}
      }
      setIsPlayingMusic(false);
    } else {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(261.63, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscillatorNodeRef.current = osc;

        setIsPlayingMusic(true);
      } catch (e) {
        console.warn('Audio synthesis not permitted without user gesture:', e);
        setIsPlayingMusic(!isPlayingMusic);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorNodeRef.current) {
        try {
          oscillatorNodeRef.current.stop();
        } catch (_) {}
      }
    };
  }, []);

  return (
    <div className="relative mt-8 flex flex-col gap-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between xl:gap-8">
        <div className="flex items-center gap-3.5 sm:gap-5">
          <div className="relative size-[76px] sm:size-[112px] xl:size-[128px] shrink-0 flex items-center justify-center rounded-[18px] sm:rounded-[24px] border border-hairline/90 bg-surface shadow-sm p-3 sm:p-4 group transition-transform duration-300 hover:scale-105">
            <div className="absolute inset-0 rounded-[18px] sm:rounded-[24px] bg-gradient-to-tr from-[#FF4D36]/10 via-[#8B5CF6]/10 to-[#0EA5E9]/10 opacity-70 group-hover:opacity-100 transition-opacity" />
            <RdxLogo className="relative z-10 h-9 w-auto sm:h-12 xl:h-14" />
          </div>

          <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0">
            <h1 className="font-sans text-[30px] font-bold leading-tight tracking-[-0.5px] text-strong sm:text-[38px] xl:text-[42px] truncate">
              {profile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-1.5 font-sans text-[15px] sm:text-[17px] xl:text-[18px]">
              <span className="text-strong font-semibold">Software Developer</span>
              <span className="text-neutral-400 dark:text-zinc-500 font-light select-none">/</span>
              <span className="text-strong font-semibold">AI & ML Engineer</span>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FF4D36]/10 px-2 py-0.5 font-mono text-[9.5px] sm:text-[10px] font-semibold text-[#FF4D36] border border-[#FF4D36]/25 whitespace-nowrap">
                <span className="size-1 rounded-full bg-[#FF4D36]" />
                Zero Template Bloat
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#8B5CF6]/10 px-2 py-0.5 font-mono text-[9.5px] sm:text-[10px] font-semibold text-[#8B5CF6] border border-[#8B5CF6]/25 whitespace-nowrap">
                AI Automation
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#0EA5E9]/10 px-2 py-0.5 font-mono text-[9.5px] sm:text-[10px] font-semibold text-[#0EA5E9] border border-[#0EA5E9]/25 whitespace-nowrap">
                Sub-Second Speed
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-hairline/80 bg-subtle/50 p-4 sm:p-5 font-mono text-[12px] sm:text-[12.5px] text-ink-soft leading-relaxed transition-colors">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2">
          <div className="flex items-center gap-2 text-strong font-medium">
            <Code2 className="size-3.5 shrink-0 text-[#FF4D36]" />
            <span className="truncate">Software Developer · Backend & AI Systems</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="size-3.5 shrink-0 text-[#0EA5E9]" />
            <span>{currentTime} (IST)</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-ink-soft" />
            <span>Namakkal, Tamil Nadu, India</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="size-3.5 shrink-0 text-ink-soft" />
            <a
              href="mailto:e.rohit3130@gmail.com"
              className="hover:text-strong hover:underline transition-colors"
            >
              e.rohit3130@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="size-3.5 shrink-0 text-ink-soft" />
            <a href="tel:+919655483130" className="hover:text-strong hover:underline transition-colors">
              +91 96554 83130
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold select-none text-ink-soft">♂</span>
            <span>he/him</span>
          </div>

          <div className="flex items-center gap-2 sm:col-span-2">
            <Globe className="size-3.5 shrink-0 text-ink-soft" />
            <a
              href="https://github.com/ROHITHELAYARAJA"
              target="_blank"
              rel="noreferrer"
              className="text-strong hover:text-[#0EA5E9] hover:underline transition-colors"
            >
              github.com/ROHITHELAYARAJA
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        <a
          href="https://github.com/ROHITHELAYARAJA"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-xl border border-hairline/80 bg-surface p-3.5 sm:p-4 transition-all duration-200 hover:border-btn-border hover:bg-subtle/80 hover:shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-subtle text-strong">
              <svg viewBox="0 0 24 24" className="size-5 fill-current">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                />
              </svg>
            </div>
            <div>
              <div className="font-sans text-[14.5px] font-bold text-strong group-hover:text-ink transition-colors">
                GitHub
              </div>
              <div className="font-mono text-[11.5px] text-ink-soft">
                ROHITHELAYARAJA
              </div>
            </div>
          </div>
          <ArrowUpRight className="size-4 text-ink-soft group-hover:text-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>

        <a
          href="https://www.linkedin.com/in/rohith-elayaraja/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-xl border border-hairline/80 bg-surface p-3.5 sm:p-4 transition-all duration-200 hover:border-btn-border hover:bg-subtle/80 hover:shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-[#0A66C2]/10 text-[#0A66C2]">
              <svg viewBox="0 0 24 24" className="size-5 fill-current">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <div>
              <div className="font-sans text-[14.5px] font-bold text-strong group-hover:text-ink transition-colors">
                LinkedIn
              </div>
              <div className="font-mono text-[11.5px] text-ink-soft">
                Rohith Elayaraja
              </div>
            </div>
          </div>
          <ArrowUpRight className="size-4 text-ink-soft group-hover:text-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>

        <a
          href="https://x.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-xl border border-hairline/80 bg-surface p-3.5 sm:p-4 transition-all duration-200 hover:border-btn-border hover:bg-subtle/80 hover:shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-subtle text-strong">
              <svg viewBox="0 0 24 24" className="size-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div>
              <div className="font-sans text-[14.5px] font-bold text-strong group-hover:text-ink transition-colors">
                X (Twitter)
              </div>
              <div className="font-mono text-[11.5px] text-ink-soft">
                @ROHITHELAYARAJA
              </div>
            </div>
          </div>
          <ArrowUpRight className="size-4 text-ink-soft group-hover:text-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>

        <a
          href="https://leetcode.com/Shinchan_2007"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-xl border border-hairline/80 bg-surface p-3.5 sm:p-4 transition-all duration-200 hover:border-btn-border hover:bg-subtle/80 hover:shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-[#FFA116]/10 text-[#FFA116]">
              <svg viewBox="0 0 24 24" className="size-5 fill-current">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
            </div>
            <div>
              <div className="font-sans text-[14.5px] font-bold text-strong group-hover:text-ink transition-colors">
                LeetCode
              </div>
              <div className="font-mono text-[11.5px] text-ink-soft">
                Shinchan_2007 (315+ solved)
              </div>
            </div>
          </div>
          <ArrowUpRight className="size-4 text-ink-soft group-hover:text-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      </div>

      <div id="about" className="relative space-y-4 pt-1">
        <h2 className="font-sans text-[24px] sm:text-[28px] font-bold tracking-tight text-strong">
          About
        </h2>

        <div className="space-y-3 font-sans text-[15px] sm:text-[16px] leading-relaxed text-body">
          <div className="flex items-start gap-2.5">
            <span className="text-strong select-none font-bold text-[18px] leading-none mt-1">•</span>
            <p>
              <strong className="text-strong font-semibold">
                Computer Science & AI undergraduate
              </strong>{' '}
              (B.E. Artificial Intelligence & Data Science) and builder, focused on crafting reliable, scalable, and user-focused software.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-strong select-none font-bold text-[18px] leading-none mt-1">•</span>
            <p>
              <strong className="text-strong font-semibold">Skilled in</strong> Java, Spring Boot, React, Next.js, TypeScript, Python, SQL, and AWS, with hands-on experience in full-stack and cloud-native systems.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2.5">
              <span className="text-strong select-none font-bold text-[18px] leading-none mt-1">•</span>
              <p>
                <strong className="text-strong font-semibold">Active Open Source Contributor:</strong>
              </p>
            </div>
            <div className="ml-7 space-y-1.5 text-[14.5px] text-ink-soft">
              <div className="flex items-start gap-2">
                <span className="text-strong select-none">•</span>
                <p>
                  Merged upstream PR in{' '}
                  <a
                    href="https://github.com/abacusai/abacusai-bot/pull/70"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-strong hover:underline"
                  >
                    AbacusAI Bot (PR #70)
                  </a>
                  , normalizing Windows scratch paths for security guardrails.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-strong select-none">•</span>
                <p>
                  Authored regression test fixtures validating Windows 8.3 path expansion and cross-platform path equality.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-strong select-none font-bold text-[18px] leading-none mt-1">•</span>
            <p>
              <strong className="text-strong font-semibold">Competitive Programmer</strong> with{' '}
              <strong className="text-strong font-semibold">315+ solved problems on LeetCode</strong>{' '}
              (
              <a
                href="https://leetcode.com/Shinchan_2007"
                target="_blank"
                rel="noreferrer"
                className="text-[#FFA116] hover:underline font-semibold"
              >
                Shinchan_2007
              </a>
              ), experienced in algorithmic problem-solving, data structures, and optimization under constraints.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-strong select-none font-bold text-[18px] leading-none mt-1">•</span>
            <p>
              <strong className="text-strong font-semibold">Currently building</strong>{' '}
              <a
                href="https://github.com/ROHITHELAYARAJA/Virtual-Labs"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 text-[#FF4D36] hover:text-[#E63925] font-bold transition-colors"
              >
                Virtual Labs & Blast AI
              </a>{' '}
              — interactive engineering learning hub with JVM call-stack tracing & document-aware study tools.
            </p>
          </div>
        </div>

        <div className="pt-3 flex flex-wrap items-center gap-2 sm:gap-3 pr-14 sm:pr-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-subtle px-3 py-1 text-[11px] font-mono text-ink-soft">
            <span className={`size-2 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span>API Source of Truth: {isLive ? 'Live Synchronized' : 'Verified Cache'}</span>
            <button
              onClick={() => refresh()}
              disabled={loading}
              title="Refresh API Data"
              className="ml-1 text-ink-soft hover:text-strong transition-colors"
            >
              <RefreshCw className={`size-3 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10.5px]">
            <a
              href="/api/home.json"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Home Page API Endpoint (JSON)"
              className="inline-flex items-center gap-1 rounded-full border border-hairline bg-surface px-2.5 py-0.5 text-ink-soft hover:text-strong hover:border-btn-border transition-colors shadow-2xs"
            >
              <span>/api/home</span>
              <ArrowUpRight className="size-2.5 opacity-70" />
            </a>
            <a
              href="/api/all.json"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Complete Portfolio API Endpoint (JSON)"
              className="inline-flex items-center gap-1 rounded-full border border-hairline bg-surface px-2.5 py-0.5 text-ink-soft hover:text-strong hover:border-btn-border transition-colors shadow-2xs"
            >
              <span>/api/all</span>
              <ArrowUpRight className="size-2.5 opacity-70" />
            </a>
          </div>

          {profile.githubStats && (
            <span className="hidden sm:inline-block font-mono text-[11px] text-ink-soft">
              {profile.githubStats.publicRepos} public repos on GitHub
            </span>
          )}
        </div>
      </div>

      <div className="absolute right-0 bottom-0 z-30 sm:right-2 sm:bottom-1">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isPlayingMusic ? 'Mute background sound' : 'Play audio equalizer sound'}
          title={isPlayingMusic ? 'Audio Playing (Click to mute)' : 'Ambient Equalizer (Click to play)'}
          className="flex size-10 items-center justify-center rounded-full border border-hairline bg-surface/90 text-ink-soft shadow-md backdrop-blur-md transition-all hover:bg-surface hover:text-strong hover:scale-105 active:scale-95"
        >
          <div className="flex items-center justify-center gap-[3px] h-4">
            <span
              className={`w-[2.5px] rounded-full bg-current transition-all duration-300 ${
                isPlayingMusic ? 'h-4 animate-[bounce_0.6s_ease-in-out_infinite]' : 'h-3'
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full bg-current transition-all duration-300 ${
                isPlayingMusic ? 'h-3 animate-[bounce_0.8s_ease-in-out_infinite_0.15s]' : 'h-4'
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full bg-current transition-all duration-300 ${
                isPlayingMusic ? 'h-4 animate-[bounce_0.7s_ease-in-out_infinite_0.3s]' : 'h-2.5'
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full bg-current transition-all duration-300 ${
                isPlayingMusic ? 'h-3.5 animate-[bounce_0.9s_ease-in-out_infinite_0.1s]' : 'h-3.5'
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
