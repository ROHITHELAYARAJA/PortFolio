import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechIcon } from './TechIcons';

export interface StackSkillItem {
  id: string;
  name: string;
  tagLabel: string;
}

const ROW_ONE_SKILLS: StackSkillItem[] = [
  { id: 'ts', name: 'TypeScript', tagLabel: 'TypeScript' },
  { id: 'js', name: 'JavaScript', tagLabel: 'JavaScript' },
  { id: 'py', name: 'Python', tagLabel: 'Python' },
  { id: 'java', name: 'Java', tagLabel: 'Java' },
  { id: 'html', name: 'HTML5', tagLabel: 'HTML' },
  { id: 'css', name: 'CSS3', tagLabel: 'CSS' },
  { id: 'react', name: 'React', tagLabel: 'React' },
  { id: 'next', name: 'Next.js', tagLabel: 'Next.js' },
  { id: 'tailwind', name: 'Tailwind CSS', tagLabel: 'Tailwind CSS' },
  { id: 'spring', name: 'Spring Boot', tagLabel: 'Spring Boot' },
  { id: 'fastapi', name: 'FastAPI', tagLabel: 'FastAPI' },
  { id: 'git', name: 'Git', tagLabel: 'Git' },
  { id: 'github', name: 'GitHub', tagLabel: 'GitHub' },
];

const ROW_TWO_SKILLS: StackSkillItem[] = [
  { id: 'gh-actions', name: 'GitHub Actions', tagLabel: 'GitHub Actions' },
  { id: 'postman', name: 'Postman', tagLabel: 'Postman' },
  { id: 'supabase', name: 'Supabase', tagLabel: 'Supabase' },
  { id: 'firebase', name: 'Firebase', tagLabel: 'Firebase' },
  { id: 'sqlite', name: 'SQLite', tagLabel: 'SQLite' },
  { id: 'aws', name: 'AWS', tagLabel: 'AWS' },
  { id: 'docker', name: 'Docker', tagLabel: 'Docker' },
  { id: 'mysql', name: 'MySQL', tagLabel: 'MySQL' },
  { id: 'rest', name: 'REST APIs', tagLabel: 'REST APIs' },
  { id: 'leetcode', name: 'LeetCode', tagLabel: 'LeetCode' },
  { id: 'vercel', name: 'Vercel', tagLabel: 'Vercel' },
  { id: 'figma', name: 'Figma', tagLabel: 'Figma' },
  { id: 'sql', name: 'SQL', tagLabel: 'SQL' },
];

export const TechStackSection: React.FC = () => {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const renderSkillTile = (skill: StackSkillItem) => {
    const isActive = activeSkillId === skill.id;

    return (
      <div
        key={skill.id}
        className="relative flex items-center justify-center"
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              key={`tag-${skill.id}`}
              initial={{ opacity: 0, y: 4, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.94 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
              className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="relative rounded-[7px] bg-white px-3 py-1 shadow-2xl ring-1 ring-black/10">
                <span className="font-sans text-[12px] font-bold text-neutral-950 whitespace-nowrap tracking-wide leading-none select-none">
                  {skill.tagLabel}
                </span>
                <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 size-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onMouseEnter={() => setActiveSkillId(skill.id)}
          onMouseLeave={() => setActiveSkillId(null)}
          onFocus={() => setActiveSkillId(skill.id)}
          onBlur={() => setActiveSkillId(null)}
          onClick={() => setActiveSkillId((prev) => (prev === skill.id ? null : skill.id))}
          aria-label={skill.name}
          title={skill.name}
          className={`group relative flex size-11 sm:size-12 md:size-[50px] items-center justify-center rounded-xl bg-[#0b131f]/90 border border-white/[0.07] shadow-[0_3px_10px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/80 ${
            isActive
              ? 'scale-105 border-teal-400/60 bg-[#122033] shadow-[0_0_16px_rgba(20,184,166,0.25)]'
              : 'hover:scale-105 hover:border-teal-500/40 hover:bg-[#101b2a] hover:shadow-[0_4px_14px_rgba(0,0,0,0.6)] active:scale-95'
          }`}
        >
          <div className="flex size-6 sm:size-6.5 md:size-7 items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <TechIcon name={skill.name} className="size-full object-contain drop-shadow-sm" />
          </div>
        </button>
      </div>
    );
  };

  return (
    <div
      id="technologies-and-tools"
      onMouseLeave={() => setActiveSkillId(null)}
      className="relative overflow-visible rounded-[26px] border border-[#172230] bg-[#090e15] p-6 sm:p-8 md:p-9 shadow-2xl transition-all duration-300"
      style={{
        backgroundImage:
          'radial-gradient(rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-sans text-[32px] sm:text-[36px] font-bold tracking-tight text-white select-none">
            Stack
          </h2>
          <div className="mt-2.5 h-[2.5px] w-14 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-transparent shadow-[0_0_10px_rgba(45,212,191,0.6)]" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-[#0e1724]/90 px-4 py-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="font-mono text-xs font-medium text-neutral-300">
            26 Technologies
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center lg:grid lg:grid-cols-[repeat(13,minmax(0,1fr))] gap-2 sm:gap-2.5 justify-items-center pt-1">
        {[...ROW_ONE_SKILLS, ...ROW_TWO_SKILLS].map(renderSkillTile)}
      </div>

      <div className="mt-8 pt-4.5 border-t border-white/[0.06] flex items-center">
        <span className="font-mono text-[10px] sm:text-[11.5px] tracking-[0.24em] text-neutral-400 select-none uppercase">
          LANGUAGES · FRAMEWORKS · DEV TOOLS · CLOUD
        </span>
      </div>
    </div>
  );
};
