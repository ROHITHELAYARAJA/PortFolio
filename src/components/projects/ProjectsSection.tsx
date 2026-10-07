import React from 'react';
import { ArrowUpRight, BookOpen, ExternalLink, Github } from 'lucide-react';
import { FEATURED_PROJECTS, type ProjectItem } from '../../data/portfolioData';
import { VirtualLabLivePreview } from './VirtualLabLivePreview';

interface ProjectsSectionProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenCaseStudy }) => {
  return (
    <div className="flex flex-col gap-6">
      {FEATURED_PROJECTS.map((project, index) => {
        const isFlagship = project.id === 'virtual-labs';

        return (
          <div
            key={project.id}
            className={`group relative overflow-hidden rounded-[24px] border bg-surface p-6 sm:p-8 transition-all hover:shadow-lg ${
              isFlagship
                ? 'border-[#FF4D36]/40 dark:border-[#FF4D36]/30 ring-1 ring-[#FF4D36]/20 shadow-[0_4px_30px_-8px_rgba(255,77,54,0.12)]'
                : 'border-hairline hover:border-btn-border'
            }`}
          >
            {/* Top Category and Status Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-hairline/60">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                  project.id === 'virtual-labs'
                    ? 'text-[#FF4D36]'
                    : project.id === 'student-ai-assistant'
                    ? 'text-[#0EA5E9]'
                    : project.id === 'bank-management-system'
                    ? 'text-amber-500'
                    : 'text-[#8B5CF6]'
                }`}>
                  {project.category}
                </span>
                {isFlagship && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF4D36]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#FF4D36] border border-[#FF4D36]/25 whitespace-nowrap">
                    <span className="size-1.5 rounded-full bg-[#FF4D36]" />
                    FLAGSHIP
                  </span>
                )}
                {project.id === 'student-ai-assistant' && (
                  <span className="inline-flex items-center rounded-full bg-[#0EA5E9]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0EA5E9] border border-[#0EA5E9]/25 whitespace-nowrap">
                    GENAI WORKSPACE
                  </span>
                )}
              </div>

              <div className="flex items-center shrink-0 font-mono text-[11px] text-ink-soft">
                <span>0{index + 1}</span>
              </div>
            </div>

            {/* Title & Summary */}
            <div className="mt-4">
              <h3 className={`font-cabinet text-[22px] font-bold sm:text-[26px] tracking-tight ${
                isFlagship ? 'text-metallic-bronze' : 'text-strong'
              }`}>
                {project.title}
              </h3>
              <p className="mt-2.5 max-w-[70ch] font-cabinet text-[15px] leading-relaxed text-body sm:text-[16px]">
                {project.summary}
              </p>
            </div>

            {/* Metrics Chips */}
            {project.stats && (
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {project.stats.map((stat, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-1.5 rounded-lg border border-hairline bg-subtle px-3 py-1 font-mono text-[11px]"
                  >
                    <span className="text-ink-soft">{stat.label}:</span>
                    <span className={`font-bold ${
                      sIdx === 0 && isFlagship ? 'text-[#FF4D36]' : 'text-strong'
                    }`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlighted Key Capabilities */}
            <div className="mt-5 rounded-xl border border-hairline/80 bg-subtle/50 p-4">
              <ul className="space-y-2">
                {project.highlights.slice(0, 3).map((hl, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2 text-[14px] text-body leading-snug">
                    <span className="text-strong select-none">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live Interactive Preview for Flagship Virtual Labs */}
            {isFlagship && <VirtualLabLivePreview />}

            {/* Tech Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.primaryTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-hairline bg-surface px-2.5 py-0.5 font-mono text-[11px] font-medium text-ink-soft"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Footer Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-hairline/60 pt-4">
              <div className="flex items-center gap-3">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-cabinet text-[14px] font-semibold text-ink-soft hover:text-strong transition-colors"
                >
                  <Github className="size-4" />
                  <span>GitHub</span>
                  <ExternalLink className="size-3 text-ink-soft/70" />
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-cabinet text-[14px] font-semibold text-ink-soft hover:text-strong transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>

              {/* Case Study Button */}
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project.id)}
                className="flex items-center gap-1.5 rounded-lg border border-hairline bg-subtle px-3.5 py-1.5 font-cabinet text-[13px] font-bold text-strong transition-all hover:bg-subtle-strong hover:border-btn-border"
              >
                <BookOpen className="size-3.5" />
                <span>Read Case Study</span>
                <ArrowUpRight className="size-3.5 text-ink-soft" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
