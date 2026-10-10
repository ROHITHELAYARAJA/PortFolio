import React from 'react';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenCaseStudy?: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  return (
    <div className="flex flex-col gap-3.5 sm:gap-4">
      {FEATURED_PROJECTS.map((project) => (
        <article
          key={project.id}
          className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-hairline/80 bg-surface p-4 sm:p-4.5 transition-all duration-200 hover:border-btn-border hover:bg-subtle/50 hover:shadow-xs"
        >
          <div className="min-w-0 flex-1">
            <h3 className="font-sans text-[16.5px] sm:text-[17.5px] font-bold text-strong tracking-tight group-hover:text-ink transition-colors">
              {project.title}
            </h3>
            <p className="mt-1 font-sans text-[13.5px] sm:text-[14px] text-ink-soft truncate max-w-[72ch]">
              {project.summary}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-hairline/50">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub Repository for ${project.title}`}
              className="inline-flex items-center gap-1 rounded-md border border-hairline bg-subtle/60 px-3 py-1 font-mono text-[12px] font-medium text-strong hover:bg-subtle hover:border-btn-border hover:text-[#0EA5E9] transition-all"
            >
              <span>GitHub</span>
              <ArrowUpRight className="size-3.5 opacity-70 group-hover:opacity-100" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live Demo for ${project.title}`}
                className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[12px] font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                <span>Live</span>
                <ArrowUpRight className="size-3.5 opacity-70 group-hover:opacity-100" />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};
