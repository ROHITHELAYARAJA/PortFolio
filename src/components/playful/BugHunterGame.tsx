import React, { useState, useEffect, useRef } from 'react';
import { Bug, CheckCircle2, RefreshCw } from 'lucide-react';

export const BugHunterGame: React.FC = () => {
  const [bugsFixed, setBugsFixed] = useState(0);
  const [regressions, setRegressions] = useState(0);
  const [bugPosition, setBugPosition] = useState(25); // percentage 10% - 90%
  const [isBugActive, setIsBugActive] = useState(true);
  const [isBuildPassed, setIsBuildPassed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Global Spacebar listener to fix bug when nearby
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        // If bug is active and not finished
        if (isBugActive && !isBuildPassed) {
          handleSquashBug();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBugActive, isBuildPassed, bugsFixed]);

  // Bug scurrying behavior
  useEffect(() => {
    if (isBuildPassed || !isBugActive) return;

    const interval = setInterval(() => {
      // Randomly crawl along track
      setBugPosition((prev) => {
        const delta = (Math.random() - 0.5) * 20;
        return Math.max(10, Math.min(85, prev + delta));
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isBuildPassed, isBugActive]);

  const handleSquashBug = () => {
    setHasInteracted(true);
    setIsBugActive(false);

    const nextCount = bugsFixed + 1;
    setBugsFixed(nextCount);

    if (nextCount >= 3) {
      setIsBuildPassed(true);
    } else {
      // Spawn new bug after short delay at new spot
      setTimeout(() => {
        setBugPosition(Math.floor(Math.random() * 70) + 15);
        setIsBugActive(true);
      }, 600);
    }
  };

  const handleReset = () => {
    setBugsFixed(0);
    setRegressions(0);
    setIsBuildPassed(false);
    setIsBugActive(true);
    setBugPosition(30);
  };

  return (
    <div className="w-full rounded-2xl border border-hairline bg-surface p-4 sm:p-5 shadow-sm transition-all select-none">
      {/* Top Header / Scoreboard */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <Bug className="size-4 text-ink-soft" />
          <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-strong">
            Bug Hunter // QA Sandbox
          </span>
          <span className="hidden sm:inline-block text-ink-soft/40">•</span>
          <span className="hidden sm:inline-block font-mono text-[11px] text-ink-soft">
            Click bug or tap [Space]
          </span>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="rounded bg-subtle px-2 py-0.5 text-strong">
            BUGS FIXED: {String(bugsFixed).padStart(2, '0')}
          </span>
          <span className="rounded bg-subtle px-2 py-0.5 text-ink-soft">
            REGRESSIONS: {String(regressions).padStart(2, '0')}
          </span>
          {hasInteracted && (
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset mini-game"
              className="text-ink-soft hover:text-strong"
            >
              <RefreshCw className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Crawl Track */}
      <div className="relative mt-4 h-12 w-full rounded-xl border border-dashed border-hairline bg-subtle/50 flex items-center overflow-hidden">
        {/* Track Line */}
        <div className="absolute inset-x-4 h-px bg-hairline" />

        {isBuildPassed ? (
          <div className="mx-auto flex items-center gap-2 font-mono text-[12px] font-bold text-emerald-600 dark:text-emerald-400 animate-fade-in">
            <CheckCircle2 className="size-4" />
            <span>ALL REGRESSION TESTS PASSED // BUILD READY ✓</span>
          </div>
        ) : isBugActive ? (
          <button
            type="button"
            onClick={handleSquashBug}
            style={{ left: `${bugPosition}%` }}
            aria-label="Fix bug"
            className="absolute -translate-x-1/2 p-2 transition-all duration-500 hover:scale-125 focus-visible:outline-none"
          >
            {/* Pixel Bug Icon */}
            <div className="relative flex items-center justify-center size-7 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 cursor-pointer shadow-sm">
              <Bug className="size-4 animate-bounce" />
            </div>
          </button>
        ) : (
          <div
            style={{ left: `${bugPosition}%` }}
            className="absolute -translate-x-1/2 font-mono text-[10px] text-emerald-500 animate-ping"
          >
            FIXED!
          </div>
        )}
      </div>

      {/* Status Label */}
      <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-ink-soft/70">
        <span>Unit Tests: 48/48 Passing</span>
        <span>Target: 03 bugs to verify build</span>
      </div>
    </div>
  );
};
