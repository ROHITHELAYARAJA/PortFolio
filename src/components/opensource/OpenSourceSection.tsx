import React from 'react';
import { GitMerge, CheckCircle2 } from 'lucide-react';
import { OPEN_SOURCE_CONTRIBUTION } from '../../data/portfolioData';

export const OpenSourceSection: React.FC = () => {
  const oss = OPEN_SOURCE_CONTRIBUTION;

  return (
    <article className="group relative rounded-[22px] border border-hairline bg-surface p-6 sm:p-7 transition-all duration-200 hover:border-btn-border hover:shadow-sm">
      {/* Top Meta Header: Project badge & upstream status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <GitMerge className="size-3.5" />
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Open Source · Upstream Fix
          </span>
        </div>

        <div className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-purple-700 dark:text-purple-300">
          <CheckCircle2 className="size-3" />
          <span className="font-mono text-[10px] font-bold tracking-wider">
            {oss.badge}
          </span>
        </div>
      </div>

      {/* Project Name & PR Info */}
      <h3 className="mt-3.5 font-cabinet text-[21px] font-bold tracking-tight text-strong sm:text-[23px] group-hover:text-ink transition-colors">
        {oss.project} — PR #{oss.prNumber}
      </h3>

      {/* One-line description */}
      <p className="mt-2 font-cabinet text-[15px] leading-relaxed text-body sm:text-[16px] max-w-[70ch]">
        {oss.summary}
      </p>

      {/* 3–5 technology keywords */}
      <div className="mt-4 flex flex-wrap gap-2">
        {oss.primaryTech.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-hairline bg-subtle/60 px-2.5 py-0.5 font-mono text-[11px] font-medium text-ink-soft"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Upstream Repo · Live PR #70 */}
      <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-hairline/60 pt-3.5 font-cabinet text-[14px] font-semibold text-ink-soft">
        <a
          href={oss.upstreamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-strong transition-colors"
        >
          <span>Upstream Repo</span>
          <span className="text-[12px] opacity-70">↗</span>
        </a>

        <span className="text-hairline select-none">•</span>

        <a
          href={oss.prUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-strong transition-colors"
        >
          <span>Inspect Merged PR #70</span>
          <span className="text-[12px] opacity-70">↗</span>
        </a>
      </div>
    </article>
  );
};
