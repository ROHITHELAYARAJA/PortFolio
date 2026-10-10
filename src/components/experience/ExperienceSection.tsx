import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  EXPERIENCE_ITEMS,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
} from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(EXPERIENCE_ITEMS[0]?.id || null);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col divide-y divide-hairline">
        {EXPERIENCE_ITEMS.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="py-6 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                aria-expanded={isOpen}
                className="flex w-full flex-col gap-2 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strong rounded-lg"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-cabinet text-[20px] font-bold tracking-[-1px] text-strong sm:text-[22px] sm:tracking-[-1.1px]">
                      {item.company}
                    </span>
                    {item.status === 'Ongoing' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-cabinet text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Ongoing
                      </span>
                    )}
                    <ChevronDown
                      className={`size-5 text-ink-soft transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-strong' : ''
                      }`}
                    />
                  </div>
                  <p className="mt-1 font-cabinet text-[15px] tracking-[-0.15px] text-ink-soft">
                    {item.role}
                  </p>
                </div>

                <div className="shrink-0 sm:text-right">
                  <p className="font-mono text-[13px] text-ink-soft sm:text-[14px]">
                    {item.period}
                  </p>
                  <p className="mt-0.5 font-cabinet text-[13px] text-ink-soft/80 sm:text-[14px]">
                    {item.location}
                  </p>
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-hairline pt-5">
                    <h4 className="font-cabinet text-[15px] font-semibold text-strong">
                      Technologies & Tools
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <div
                          key={tech.name}
                          className="group flex h-9 items-center rounded-lg border border-hairline bg-surface px-2.5 transition-all hover:border-btn-border"
                        >
                          <span className="size-2 rounded-full mr-2" style={{ backgroundColor: tech.color || '#666' }} />
                          <span className="font-cabinet text-[14px] font-medium text-strong">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <h4 className="mt-6 font-cabinet text-[15px] font-semibold text-strong">
                      What I've done
                    </h4>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {item.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2.5 font-cabinet text-[15px] leading-relaxed text-body"
                        >
                          <span aria-hidden="true" className="mt-1.5 shrink-0 text-strong text-xs">
                            •
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-[24px] border border-hairline bg-surface p-6 sm:p-7 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-cabinet text-[18px] font-bold text-strong sm:text-[20px]">
              {EDUCATION_DATA.institution}
            </span>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              CGPA: {EDUCATION_DATA.cgpa}
            </span>
          </div>
          <span className="font-mono text-[12px] text-ink-soft">{EDUCATION_DATA.period}</span>
        </div>

        <div className="mt-3">
          <p className="font-cabinet text-[15px] font-medium text-strong">
            {EDUCATION_DATA.degree}
          </p>
          <p className="text-[13px] text-ink-soft font-cabinet">{EDUCATION_DATA.location}</p>

          <div className="mt-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft font-semibold">
              Core Coursework
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {EDUCATION_DATA.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-md border border-hairline bg-subtle px-2.5 py-1 font-mono text-[11px] text-strong"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[24px] border border-hairline bg-surface p-6 sm:p-7 shadow-md">
        <div className="border-b border-hairline/60 pb-3">
          <h3 className="font-cabinet text-[18px] font-bold text-strong sm:text-[20px]">
            Achievements & Certifications
          </h3>
          <p className="font-mono text-[11px] text-ink-soft mt-0.5">
            Competitive programming & cloud credentials
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div
              key={cert.title}
              className="flex flex-col justify-between rounded-xl border border-hairline bg-subtle/40 p-4 transition-all hover:border-btn-border"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-cabinet text-[15px] font-bold text-strong">
                    {cert.title}
                  </span>
                  {cert.badge && (
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      {cert.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink-soft">
                  {cert.issuer} {cert.year ? `· ${cert.year}` : ''}
                </p>
                <p className="mt-2 font-cabinet text-[13px] leading-relaxed text-body">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
