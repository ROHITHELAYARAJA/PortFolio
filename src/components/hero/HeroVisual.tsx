import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useHeroApi } from '../../hooks/useHeroApi';

export const HeroVisual: React.FC = () => {
  const { profile } = useHeroApi();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPipActive, setIsPipActive] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videoSrc = profile?.heroVideoUrl || '/assets/hero-loop.mp4';

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleEnterPip = () => setIsPipActive(true);
    const handleLeavePip = () => setIsPipActive(false);

    videoEl.addEventListener('enterpictureinpicture', handleEnterPip);
    videoEl.addEventListener('leavepictureinpicture', handleLeavePip);

    return () => {
      videoEl.removeEventListener('enterpictureinpicture', handleEnterPip);
      videoEl.removeEventListener('leavepictureinpicture', handleLeavePip);
    };
  }, []);

  const togglePiP = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (!videoRef.current) return;
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPipActive(false);
      } else {
        await videoRef.current.requestPictureInPicture();
        setIsPipActive(true);
      }
    } catch {
      if (videoRef.current) {
        if (!document.fullscreenElement) {
          videoRef.current.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      onClick={togglePlay}
      className="group relative aspect-[3/2] w-full cursor-pointer overflow-hidden rounded-[18px] border border-hairline bg-neutral-950 shadow-sm sm:aspect-[21/9] xl:aspect-[1047/278] select-none"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`size-full object-cover transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-80'
        }`}
        aria-label="Developer hero animation loop"
      />

      <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center sm:top-4 z-20">
        <button
          type="button"
          onClick={togglePiP}
          title={isPipActive ? 'Exit Picture-in-Picture' : 'Open Picture-in-Picture'}
          aria-label={isPipActive ? 'Exit Picture-in-Picture' : 'Open Picture-in-Picture'}
          className="pointer-events-auto flex size-8 sm:size-9 items-center justify-center rounded-[8px] bg-black/55 text-white/90 backdrop-blur-md transition-all hover:scale-105 hover:bg-black/75 hover:text-white border border-white/15 shadow-md active:scale-95"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <rect x="2" y="3" width="20" height="15" rx="2" />
            <rect x="13" y="9" width="7" height="6" rx="1" fill="currentColor" fillOpacity="0.25" />
            <polyline points="7 10 7 7 10 7" />
            <line x1="7" y1="7" x2="11" y2="11" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-3 right-3 z-20 flex size-7 items-center justify-center rounded-full bg-black/45 text-white/80 backdrop-blur-md transition-all hover:bg-black/75 hover:text-white opacity-0 group-hover:opacity-100"
      >
        {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
      </button>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white">
            Paused (Click to play)
          </span>
        </div>
      )}
    </div>
  );
};
