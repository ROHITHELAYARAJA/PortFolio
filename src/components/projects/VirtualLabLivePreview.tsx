import React, { useState, useEffect } from 'react';
import { ExternalLink, Play, Pause, RotateCcw, ChevronRight, CheckCircle2, Terminal, Cpu, Layers } from 'lucide-react';

export const VirtualLabLivePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory' | 'quiz'>('simulation');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const traceSteps = [
    {
      line: 1,
      code: 'int fib(int n = 4) // Invoked from main()',
      stack: ['main()', 'fib(n=4)'],
      heap: 'Frame #1 allocated: [n: 4, ret: pending]',
      note: 'Evaluating condition: n <= 1 (false). Initiating left recursion branch fib(n-1).',
      highlightLine: 2,
    },
    {
      line: 3,
      code: '  return fib(3) + fib(2); // Pushing fib(3)',
      stack: ['main()', 'fib(n=4)', 'fib(n=3)'],
      heap: 'Frame #2 allocated: [n: 3, ret: pending]',
      note: 'Pushed activation record for fib(3) onto JVM call stack.',
      highlightLine: 3,
    },
    {
      line: 3,
      code: '    return fib(2) + fib(1); // Pushing fib(2)',
      stack: ['main()', 'fib(n=4)', 'fib(n=3)', 'fib(n=2)'],
      heap: 'Frame #3 allocated: [n: 2, ret: pending]',
      note: 'Pushed activation record for fib(2). Depth = 3 frames.',
      highlightLine: 3,
    },
    {
      line: 2,
      code: '      if (n <= 1) return n; // Base case reached for fib(1)',
      stack: ['main()', 'fib(n=4)', 'fib(n=3)', 'fib(n=2)', 'fib(n=1) -> 1'],
      heap: 'Frame #4 returns value: 1. Pop frame from stack.',
      note: 'Base case resolved. Popping frame from stack and unwinding return value.',
      highlightLine: 2,
    },
    {
      line: 3,
      code: '    fib(2) resolves -> 1; fib(3) resolves -> 2',
      stack: ['main()', 'fib(n=4)', 'fib(n=3) -> 2'],
      heap: 'Frame #2 computed: fib(3) = 2. Accumulated subtrees.',
      note: 'Left recursion branch complete. Evaluating right branch fib(2).',
      highlightLine: 3,
    },
    {
      line: 4,
      code: 'return fib(3) + fib(2) => 2 + 1 = 3 [FINAL RESULT]',
      stack: ['main() -> Result: 3'],
      heap: 'Execution stack cleared. Heap telemetry: 4 frames cycled, 0 leaks.',
      note: 'Root frame returned 3. 4-part pedagogical verification passed.',
      highlightLine: 4,
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % traceSteps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isPlaying, traceSteps.length]);

  const activeState = traceSteps[currentStep];

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-hairline/80 bg-neutral-900 text-neutral-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] transition-all">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/80 px-3 sm:px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="size-2 rounded-full bg-rose-500/80" />
            <span className="size-2 rounded-full bg-amber-500/80" />
            <span className="size-2 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900/90 px-2.5 py-1 font-mono text-[10px] sm:text-[11px] text-neutral-300 min-w-0">
            <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-emerald-400 shrink-0">https://</span>
            <span className="truncate">virtual-labs.internal/jvm-tracer</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
          <span className="hidden sm:inline-block rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
            500–600 Students
          </span>
          <a
            href="https://github.com/ROHITHELAYARAJA/Virtual-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-neutral-700 bg-neutral-800/80 px-2 py-1 font-cabinet text-[11px] sm:text-[12px] font-bold text-white transition-all hover:bg-neutral-700 hover:border-neutral-600"
          >
            <span>Live Repo</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap border-b border-neutral-800 bg-neutral-950/40 text-[11.5px] sm:text-[12px] font-mono scroll-smooth">
        <button
          onClick={() => setActiveTab('simulation')}
          className={`flex shrink-0 items-center gap-1.5 px-3.5 sm:px-4 py-2.5 transition-colors ${
            activeTab === 'simulation'
              ? 'border-b-2 border-emerald-400 bg-neutral-900 font-bold text-emerald-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Cpu className="size-3.5 shrink-0" />
          <span>Part 3: JVM AST Tracer</span>
        </button>
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex shrink-0 items-center gap-1.5 px-3.5 sm:px-4 py-2.5 transition-colors ${
            activeTab === 'theory'
              ? 'border-b-2 border-emerald-400 bg-neutral-900 font-bold text-emerald-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Layers className="size-3.5 shrink-0" />
          <span>Part 1 & 2: Theory & Sim</span>
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex shrink-0 items-center gap-1.5 px-3.5 sm:px-4 py-2.5 transition-colors ${
            activeTab === 'quiz'
              ? 'border-b-2 border-emerald-400 bg-neutral-900 font-bold text-emerald-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <CheckCircle2 className="size-3.5 shrink-0" />
          <span>Part 4: Challenge Assessment</span>
        </button>
      </div>

      {activeTab === 'simulation' && (
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          <div className="p-4 md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Terminal className="size-3.5" />
                  <span>AST Step Engine (Spring Boot 3.3 Connected)</span>
                </span>
                <span>Step {currentStep + 1} of {traceSteps.length}</span>
              </div>

              <div className="rounded-lg bg-neutral-950 p-3 font-mono text-[12px] leading-relaxed border border-neutral-800/80">
                <div className={`px-2 py-0.5 rounded ${activeState.highlightLine === 1 ? 'bg-emerald-950/80 text-emerald-300 font-bold border-l-2 border-emerald-400' : 'text-neutral-400'}`}>
                  <span className="text-neutral-600 select-none mr-2">1</span>public int fib(int n) &#123;
                </div>
                <div className={`px-2 py-0.5 rounded ${activeState.highlightLine === 2 ? 'bg-emerald-950/80 text-emerald-300 font-bold border-l-2 border-emerald-400' : 'text-neutral-400'}`}>
                  <span className="text-neutral-600 select-none mr-2">2</span>  if (n &lt;= 1) return n;
                </div>
                <div className={`px-2 py-0.5 rounded ${activeState.highlightLine === 3 ? 'bg-emerald-950/80 text-emerald-300 font-bold border-l-2 border-emerald-400' : 'text-neutral-400'}`}>
                  <span className="text-neutral-600 select-none mr-2">3</span>  return fib(n - 1) + fib(n - 2);
                </div>
                <div className={`px-2 py-0.5 rounded ${activeState.highlightLine === 4 ? 'bg-emerald-950/80 text-emerald-300 font-bold border-l-2 border-emerald-400' : 'text-neutral-400'}`}>
                  <span className="text-neutral-600 select-none mr-2">4</span>&#125;
                </div>
              </div>

              <div className="mt-3 rounded-lg border border-neutral-800 bg-neutral-950/60 p-2.5 font-mono text-[11px] text-neutral-300">
                <span className="text-emerald-400 font-bold">JVM TRACE: </span>
                <span>{activeState.note}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 font-mono text-[11px] text-white hover:bg-neutral-700"
                >
                  {isPlaying ? <Pause className="size-3 text-amber-400" /> : <Play className="size-3 text-emerald-400" />}
                  <span>{isPlaying ? 'Pause' : 'Auto-Step'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev + 1) % traceSteps.length)}
                  className="flex items-center gap-1 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 font-mono text-[11px] text-white hover:bg-neutral-700"
                >
                  <span>Step</span>
                  <ChevronRight className="size-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  title="Reset Simulation"
                  className="rounded-md border border-neutral-700 bg-neutral-800 p-1 text-neutral-400 hover:text-white"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1">
                {traceSteps.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`size-2 rounded-full cursor-pointer transition-all ${
                      idx === currentStep ? 'bg-emerald-400 scale-125' : 'bg-neutral-700 hover:bg-neutral-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 md:col-span-5 bg-neutral-950/40 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Call Stack Frames (LIFO)
              </p>

              <div className="mt-2.5 flex flex-col-reverse gap-1.5">
                {activeState.stack.map((frame, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center justify-between rounded border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1.5 font-mono text-[11px] text-emerald-200 transition-all duration-300"
                  >
                    <span>{frame}</span>
                    <span className="text-[9px] text-emerald-400 font-semibold">Frame #{fIdx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-[11px]">
              <p className="text-neutral-400 text-[10px] uppercase tracking-wider">Heap Memory & State</p>
              <p className="mt-1 text-neutral-200">{activeState.heap}</p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400 border-t border-neutral-800 pt-1.5">
                <span>Supabase PostgreSQL Tenant</span>
                <span className="text-emerald-400 font-bold">12 Modules Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'theory' && (
        <div className="p-5 font-cabinet text-[14px] leading-relaxed text-neutral-300 space-y-3">
          <p className="text-white font-bold text-[16px]">
            Integrated 4-Part Laboratory Pedagogy
          </p>
          <p>
            Virtual Labs replaces conventional passive PDF manuals with active cognitive scaffolding:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-[12px]">
            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
              <span className="text-emerald-400 font-bold">Phase 1: Conceptual Video & Theory</span>
              <p className="text-neutral-400 mt-1">High-signal visual decomposition of algorithmic asymptotic bounds and recurrence relations.</p>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
              <span className="text-emerald-400 font-bold">Phase 2: Interactive Simulation</span>
              <p className="text-neutral-400 mt-1">Zero-install client sandbox allowing students to mutate arrays, trees, and graphs dynamically.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="p-5 font-cabinet text-[14px] leading-relaxed text-neutral-300 space-y-3">
          <p className="text-white font-bold text-[16px]">
            Automated Faculty Assessment & Certification
          </p>
          <p className="font-mono text-[12px] text-neutral-400">
            Connected to Spring Boot 3.3.2 REST API with Supabase PostgreSQL Row Level Security. Scores are compiled into institutional gradebooks for Anna University lab evaluations.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] text-emerald-300">Gradebook Sync: Active for 500–600 registered students</span>
          </div>
        </div>
      )}
    </div>
  );
};
