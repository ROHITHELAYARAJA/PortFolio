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
  { id: 'node', name: 'Node.js', tagLabel: 'Node.js' },
  { id: 'spring', name: 'Spring Boot', tagLabel: 'Spring Boot' },
  { id: 'git', name: 'Git', tagLabel: 'Git' },
  { id: 'github', name: 'GitHub', tagLabel: 'GitHub' },
];

const ROW_TWO_SKILLS: StackSkillItem[] = [
  { id: 'postgres', name: 'PostgreSQL', tagLabel: 'PostgreSQL' },
  { id: 'mysql', name: 'MySQL', tagLabel: 'MySQL' },
  { id: 'supabase', name: 'Supabase', tagLabel: 'Supabase' },
  { id: 'firebase', name: 'Firebase', tagLabel: 'Firebase' },
  { id: 'sqlite', name: 'SQLite', tagLabel: 'SQLite' },
  { id: 'aws', name: 'AWS', tagLabel: 'AWS' },
  { id: 'docker', name: 'Docker', tagLabel: 'Docker' },
  { id: 'linux', name: 'Linux', tagLabel: 'Linux' },
  { id: 'rest', name: 'REST APIs', tagLabel: 'REST APIs' },
  { id: 'postman', name: 'Postman', tagLabel: 'Postman' },
  { id: 'vercel', name: 'Vercel', tagLabel: 'Vercel' },
  { id: 'figma', name: 'Figma', tagLabel: 'Figma' },
  { id: 'sql', name: 'SQL', tagLabel: 'SQL' },
];

export const TechStackSection: React.FC = () => {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const allSkills = [...ROW_ONE_SKILLS, ...ROW_TWO_SKILLS];

  const renderSkillButton = (skill: StackSkillItem) => {
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
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 z-40"
            >
              <div className="relative rounded-[7px] bg-white px-3 py-1 shadow-lg ring-1 ring-black/10">
                <span className="font-sans text-[12.5px] font-bold text-neutral-950 whitespace-nowrap tracking-wide leading-none select-none">
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
          className={`group relative flex size-10 sm:size-11 items-center justify-center rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
            isActive ? 'scale-110' : 'hover:scale-105 active:scale-95'
          }`}
        >
          <div className="flex size-7 sm:size-8 items-center justify-center transition-transform duration-200">
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
      className="relative overflow-visible rounded-2xl border border-neutral-800/90 bg-[#0c0c0e] p-6 sm:p-8 shadow-xl transition-all duration-300"
      style={{
        backgroundImage:
          'radial-gradient(rgba(255, 255, 255, 0.11) 1.2px, transparent 1.2px)',
        backgroundSize: '18px 18px',
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-sans text-[28px] sm:text-[32px] font-bold tracking-tight text-white select-none">
          Stack
        </h2>
        <span className="hidden sm:inline-block font-mono text-[11px] text-zinc-400">
          {allSkills.length} Verified Technologies
        </span>
      </div>

      <div className="flex flex-col gap-5 pt-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-4.5">
          {ROW_ONE_SKILLS.map(renderSkillButton)}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-4.5">
          {ROW_TWO_SKILLS.map(renderSkillButton)}
        </div>
      </div>
    </div>
  );
};
