import React from 'react';
import { ArrowUpRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { ARTICLES_DATA } from '../../data/portfolioData';

export const WritingSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      {ARTICLES_DATA.map((article) => (
        <article
          key={article.id}
          className="group relative flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-6 transition-all hover:border-btn-border hover:shadow-sm"
        >
          <div>
            {/* Meta Row: Category, Date, Read Time, Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  {article.category}
                </span>
                <span className="text-ink-soft/40">•</span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-ink-soft">
                  <Calendar className="size-3" />
                  {article.date}
                </span>
                <span className="text-ink-soft/40">•</span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-ink-soft">
                  <Clock className="size-3" />
                  {article.readTime}
                </span>
              </div>

              <span className="rounded-full bg-subtle-strong border border-hairline px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                {article.status}
              </span>
            </div>

            {/* Editorial Article Heading in Instrument Serif / Cabinet */}
            <h3 className="mt-2 font-cabinet text-[19px] font-bold text-strong group-hover:text-ink sm:text-[22px] tracking-tight transition-colors">
              {article.title}
            </h3>

            {/* Description */}
            <p className="mt-2 font-cabinet text-[14px] leading-relaxed text-ink-soft sm:text-[15px] max-w-[65ch]">
              {article.description}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3">
            <span className="font-mono text-[11px] text-ink-soft">
              Publication draft in progress
            </span>
            <span className="flex items-center gap-1 font-cabinet text-[13px] font-semibold text-strong opacity-80 group-hover:opacity-100">
              <span>Read Outline</span>
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};
