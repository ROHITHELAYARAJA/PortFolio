import React, { useEffect } from 'react';
import { X, ExternalLink, Github, ShieldAlert, Cpu, Layers } from 'lucide-react';
import { FEATURED_PROJECTS } from '../../data/portfolioData';

interface CaseStudyModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ projectId, onClose }) => {
  const project = FEATURED_PROJECTS.find((p) => p.id === projectId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (projectId) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [projectId, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 my-auto flex w-full max-w-[840px] max-h-[90vh] flex-col overflow-hidden rounded-[24px] border border-hairline bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-hairline bg-surface/95 px-6 py-4 backdrop-blur-sm sticky top-0 z-20">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Case Study · {project.category}
            </span>
            <h2 className="font-cabinet text-[18px] sm:text-[22px] font-bold text-strong leading-tight">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="flex size-9 items-center justify-center rounded-full border border-hairline text-ink-soft hover:bg-subtle hover:text-strong"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="rounded-2xl border border-hairline bg-subtle p-5 sm:p-6">
            <p className="font-cabinet text-[16px] sm:text-[18px] font-medium leading-relaxed text-strong">
              {project.summary}
            </p>

            {project.stats && (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.stats.map((s, idx) => (
                  <div key={idx} className="rounded-xl border border-hairline bg-surface p-3 text-center">
                    <span className="font-mono text-[11px] text-ink-soft">{s.label}</span>
                    <p className="mt-0.5 font-cabinet text-[16px] font-bold text-strong">{s.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-2 font-cabinet text-[14px] font-semibold text-strong transition-all hover:bg-subtle hover:border-btn-border"
            >
              <Github className="size-4" />
              <span>Inspect Source Repository</span>
              <ExternalLink className="size-3.5 text-ink-soft" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-strong bg-strong px-4 py-2 font-cabinet text-[14px] font-semibold text-bg transition-opacity hover:opacity-90"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>

          <div>
            <h3 className="font-cabinet text-[17px] font-bold text-strong uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="size-4 text-rose-500" />
              <span>The Problem</span>
            </h3>
            <p className="mt-2 font-cabinet text-[15px] leading-relaxed text-body">
              {project.problem}
            </p>
          </div>

          <div>
            <h3 className="font-cabinet text-[17px] font-bold text-strong uppercase tracking-wider flex items-center gap-2">
              <Cpu className="size-4 text-emerald-500" />
              <span>System Architecture & Pipeline</span>
            </h3>
            <div className="mt-3 rounded-xl border border-hairline bg-subtle p-4 font-mono text-[13px] leading-relaxed text-strong">
              {project.architectureSummary}
            </div>

            <div className="mt-4 space-y-2">
              <p className="font-cabinet text-[14px] font-semibold text-strong">Key Architectural Invariants:</p>
              <ul className="space-y-2">
                {project.decisions.map((decision, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[14px] text-body">
                    <span className="text-emerald-500 mt-1 font-bold">✓</span>
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-cabinet text-[17px] font-bold text-strong uppercase tracking-wider flex items-center gap-2">
              <Layers className="size-4 text-sky-500" />
              <span>Core Features Built</span>
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="rounded-xl border border-hairline bg-surface p-3 font-cabinet text-[14px] text-body leading-snug"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-hairline bg-surface p-5">
              <h4 className="font-cabinet text-[15px] font-bold text-strong">
                Challenges Overcome
              </h4>
              <ul className="mt-2.5 space-y-2 text-[13px] text-ink-soft">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-hairline bg-surface p-5">
              <h4 className="font-cabinet text-[15px] font-bold text-strong">
                Verified Results
              </h4>
              <ul className="mt-2.5 space-y-2 text-[13px] text-ink-soft">
                {project.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-cabinet text-[15px] font-bold text-strong uppercase tracking-wider">
              Technology Stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.primaryTech.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-hairline bg-subtle px-3 py-1 font-mono text-[12px] font-medium text-strong"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-hairline bg-subtle/50 px-6 py-3 font-mono text-[12px] text-ink-soft">
          <span>Esc to close</span>
          <button
            type="button"
            onClick={onClose}
            className="font-cabinet text-[14px] font-bold text-strong hover:underline"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
