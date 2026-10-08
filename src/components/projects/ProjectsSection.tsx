import React from 'react';
import { FEATURED_PROJECTS } from '../../data/portfolioData';

interface ProjectsSectionProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenCaseStudy }) => {
  return (
    <div className="flex flex-col gap-6">
      {FEATURED_PROJECTS.map((project, index) => (
        <article
          key={project.id}
          className="group relative rounded-[22px] border border-hairline bg-surface p-6 sm:p-7 transition-all duration-200 hover:border-btn-border hover:shadow-sm"
        >
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-hairline/60">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              {project.category}
            </span>
            <span className="font-mono text-[11px] text-ink-soft select-none">
              0{index + 1}
            </span>
          </div>

          <h3 className="mt-3.5 font-cabinet text-[21px] font-bold tracking-tight text-strong sm:text-[23px] group-hover:text-ink transition-colors">
            {project.title}
          </h3>

          <p className="mt-2 font-cabinet text-[15px] leading-relaxed text-body sm:text-[16px] max-w-[70ch]">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.primaryTech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-hairline bg-subtle/60 px-2.5 py-0.5 font-mono text-[11px] font-medium text-ink-soft"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-hairline/60 pt-3.5 font-cabinet text-[14px] font-semibold text-ink-soft">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-strong transition-colors"
            >
              <span>GitHub</span>
              <span className="text-[12px] opacity-70">↗</span>
            </a>

            {project.liveUrl && (
              <>
                <span className="text-hairline select-none">•</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-strong transition-colors"
                >
                  <span>Live Demo</span>
                  <span className="text-[12px] opacity-70">↗</span>
                </a>
              </>
            )}

            <span className="text-hairline select-none">•</span>
            <button
              type="button"
              onClick={() => onOpenCaseStudy(project.id)}
              className="inline-flex items-center gap-1 hover:text-strong transition-colors"
            >
              <span>Read More</span>
              <span className="text-[12px] opacity-70">→</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
