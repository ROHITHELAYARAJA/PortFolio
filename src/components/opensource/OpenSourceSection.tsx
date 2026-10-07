import React from 'react';
import { GitMerge, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';
import { OPEN_SOURCE_CONTRIBUTION } from '../../data/portfolioData';

export const OpenSourceSection: React.FC = () => {
  const oss = OPEN_SOURCE_CONTRIBUTION;

  return (
    <div className="flex flex-col gap-6">
      {/* Upstream Contribution Hero Card */}
      <div className="relative overflow-hidden rounded-[24px] border border-hairline bg-surface p-6 sm:p-8 shadow-sm">
        {/* Top Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <GitMerge className="size-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cabinet text-[18px] font-bold text-strong sm:text-[20px]">
                  {oss.project}
                </span>
                <span className="font-mono text-[13px] text-ink-soft">
                  (PR #{oss.prNumber})
                </span>
              </div>
              <p className="font-mono text-[12px] text-ink-soft">
                Upstream: <a href={oss.upstreamUrl} target="_blank" rel="noreferrer" className="underline hover:text-strong">{oss.upstreamRepo}</a>
              </p>
            </div>
          </div>

          {/* Prominent MERGED Badge */}
          <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-purple-700 dark:text-purple-300">
            <CheckCircle2 className="size-4" />
            <span className="font-mono text-[12px] font-bold uppercase tracking-wider">
              {oss.badge}
            </span>
          </div>
        </div>

        {/* PR Title & Summary */}
        <div className="mt-6">
          <h3 className="font-cabinet text-[19px] font-bold text-strong sm:text-[22px]">
            {oss.prTitle}
          </h3>
          <p className="mt-2 font-cabinet text-[15px] leading-relaxed text-ink-soft sm:text-[16px]">
            {oss.summary}
          </p>
        </div>

        {/* VISUAL PROBLEM-SOLUTION FLOWCHART */}
        <div className="mt-8 rounded-2xl border border-hairline bg-subtle p-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
            Execution Lifecycle & Fix Verification
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5 sm:gap-2 text-center">
            {/* Step 1: Bug */}
            <div className="flex flex-col items-center justify-between rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
              <span className="font-mono text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">
                01. BUG
              </span>
              <p className="mt-1 font-cabinet text-[12px] font-semibold text-strong leading-tight">
                Legitimate Writes Blocked
              </p>
              <span className="mt-2 font-mono text-[9px] text-ink-soft">On Windows CI</span>
            </div>

            {/* Step 2: Mismatch */}
            <div className="flex flex-col items-center justify-between rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
              <span className="font-mono text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">
                02. MISMATCH
              </span>
              <p className="mt-1 font-cabinet text-[12px] font-semibold text-strong leading-tight">
                8.3 Short vs Canonical
              </p>
              <span className="mt-2 font-mono text-[9px] text-ink-soft">RUNNER~1 prefix</span>
            </div>

            {/* Step 3: Fix */}
            <div className="flex flex-col items-center justify-between rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
              <span className="font-mono text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400">
                03. FIX
              </span>
              <p className="mt-1 font-cabinet text-[12px] font-semibold text-strong leading-tight">
                Unified Normalization
              </p>
              <span className="mt-2 font-mono text-[9px] text-ink-soft">realpath canonicalizer</span>
            </div>

            {/* Step 4: Regression Tests */}
            <div className="flex flex-col items-center justify-between rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3">
              <span className="font-mono text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">
                04. VERIFY
              </span>
              <p className="mt-1 font-cabinet text-[12px] font-semibold text-strong leading-tight">
                Regression Matrix
              </p>
              <span className="mt-2 font-mono text-[9px] text-ink-soft">Short & long paths pass</span>
            </div>

            {/* Step 5: Merged */}
            <div className="flex flex-col items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
              <span className="font-mono text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                05. RESULT
              </span>
              <p className="mt-1 font-cabinet text-[12px] font-semibold text-strong leading-tight">
                Merged Upstream ✓
              </p>
              <span className="mt-2 font-mono text-[9px] text-emerald-600 dark:text-emerald-400">Production Ready</span>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 pt-2">
          <div>
            <h4 className="flex items-center gap-2 font-cabinet text-[15px] font-bold text-strong">
              <AlertTriangle className="size-4 text-amber-500" />
              <span>Root Cause Analysis</span>
            </h4>
            <p className="mt-2 font-cabinet text-[14px] leading-relaxed text-ink-soft">
              {oss.problem}
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-cabinet text-[15px] font-bold text-strong">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>Architectural Solution</span>
            </h4>
            <p className="mt-2 font-cabinet text-[14px] leading-relaxed text-ink-soft">
              {oss.solution}
            </p>
          </div>
        </div>

        {/* Action Link to Upstream PR */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-hairline pt-4">
          <span className="font-mono text-[12px] text-ink-soft">
            Verification: Windows regression test suite validated
          </span>

          <a
            href={oss.prUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-cabinet text-[14px] font-bold text-strong hover:underline hover:text-ink"
          >
            <span>Inspect Merged PR #70</span>
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
