import React, { useState, useEffect, useRef } from 'react';
import { useHeroApi } from '../../hooks/useHeroApi';
import { RefreshCw, ArrowUpRight } from 'lucide-react';
import { RdxLogo } from '../ui/RdxLogo';

interface HeroProfileProps {
  onOpenContact?: () => void;
}

export const HeroProfile: React.FC<HeroProfileProps> = () => {
  const { profile, isLive, loading, refresh } = useHeroApi();
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodeRef = useRef<OscillatorNode | null>(null);

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
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    <div className="relative mt-8 flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between xl:gap-8">
        <div className="flex items-center gap-3.5 sm:gap-5">
          <div className="relative size-[76px] sm:size-[116px] xl:size-[136px] shrink-0 flex items-center justify-center rounded-[18px] sm:rounded-[26px] xl:rounded-[28px] border border-hairline/90 bg-surface shadow-sm p-3 sm:p-4 group transition-transform duration-300 hover:scale-105">
            <div className="absolute inset-0 rounded-[18px] sm:rounded-[26px] xl:rounded-[28px] bg-gradient-to-tr from-[#FF4D36]/10 via-[#8B5CF6]/10 to-[#0EA5E9]/10 opacity-70 group-hover:opacity-100 transition-opacity" />
            <RdxLogo className="relative z-10 h-9 w-auto sm:h-14 xl:h-16" />
          </div>

          <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0">
            <h1 className="font-sans text-[30px] font-bold leading-tight tracking-[-0.5px] text-strong sm:text-[38px] xl:text-[44px] truncate">
              {profile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-1.5 font-sans text-[15px] sm:text-[17px] xl:text-[19px]">
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

        <div className="w-fit">
          <div className="flex h-[50px] w-fit items-center gap-[14px] rounded-[47px] border border-[#595959]/50 dark:border-zinc-700 bg-surface px-[18px] shadow-sm transition-all hover:border-btn-border">
            <a
              href="https://www.linkedin.com/in/rohith-elayaraja/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
              className="group text-[#0A66C2] transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="size-[20px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </a>

            <a
              href="https://github.com/ROHITHELAYARAJA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub"
              className="group text-[#181717] dark:text-[#EAEAEA] transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 496 512"
                className="size-[20px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
              </svg>
            </a>

            <a
              href="https://leetcode.com/Shinchan_2007"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile (Shinchan_2007)"
              title="LeetCode (Shinchan_2007)"
              className="group text-[#FFA116] transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="size-[20px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              title="Instagram"
              className="group text-[#E4405F] transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="size-[20px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              title="YouTube"
              className="group text-[#FF0000] transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="size-[20px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
              </svg>
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Profile"
              title="X (Twitter)"
              className="group text-[#000000] dark:text-[#EAEAEA] transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="size-[19px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div id="about" className="relative mt-2 max-w-[62ch] space-y-4 font-cabinet text-[16px] leading-relaxed text-body sm:text-[18px] xl:text-[19px]">
        <p className="font-normal text-strong">
          {profile.bioIntro}
        </p>

        <div className="space-y-1 text-[15px] sm:text-[16px] text-ink-soft">
          {profile.bioBullets
            .filter((bullet) => !bullet.toLowerCase().includes('currently building'))
            .map((bullet, idx) => (
              <p key={idx} className="flex items-start gap-2">
                <span className="text-strong select-none font-bold">•</span>
                <span>{bullet}</span>
              </p>
            ))}
          <p className="flex items-start gap-2">
            <span className="text-strong select-none font-bold">•</span>
            <span>
              Currently building{' '}
              <a
                href={profile.currentlyBuilding?.url || 'https://github.com/ROHITHELAYARAJA/Virtual-Labs'}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 text-[#FF4D36] hover:text-[#E63925] font-bold transition-colors"
              >
                {profile.currentlyBuilding?.name || 'Virtual Labs & Blast AI'}
              </a>
            </span>
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 pr-14 sm:pr-0">
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
