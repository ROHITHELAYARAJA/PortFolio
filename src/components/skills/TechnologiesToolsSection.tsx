import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Sparkles,
  Wrench,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { TechIcon } from './TechIcons';

export interface TechCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  badgeCount: number;
  skills: {
    name: string;
    description?: string;
  }[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    icon: <Code2 className="size-4 text-[#FF4D36]" />,
    badgeCount: 5,
    skills: [
      { name: 'Java', description: 'Core Java & Java 21' },
      { name: 'Python', description: 'Scripting & AI Tooling' },
      { name: 'JavaScript', description: 'ES6+ & Modern Web' },
      { name: 'TypeScript', description: 'Type-Safe Architecture' },
      { name: 'SQL', description: 'Relational Database Queries' },
    ],
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    icon: <Layout className="size-4 text-[#0EA5E9]" />,
    badgeCount: 5,
    skills: [
      { name: 'HTML5', description: 'Semantic Markup' },
      { name: 'CSS3', description: 'Modern CSS & Flex/Grid' },
      { name: 'React', description: 'Component Architecture' },
      { name: 'Next.js', description: 'App Router & SSR' },
      { name: 'Tailwind CSS', description: 'Utility-First Styling' },
    ],
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    icon: <Server className="size-4 text-[#10B981]" />,
    badgeCount: 4,
    skills: [
      { name: 'Spring Boot', description: 'Enterprise REST APIs' },
      { name: 'REST APIs', description: 'API Design & Integration' },
      { name: 'JDBC', description: 'Atomic Data Persistence' },
      { name: 'Express.js', description: 'Node.js Backend Framework' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: <Database className="size-4 text-[#F59E0B]" />,
    badgeCount: 5,
    skills: [
      { name: 'MySQL', description: 'Relational Database' },
      { name: 'PostgreSQL', description: 'Enterprise Relational DB' },
      { name: 'Supabase', description: 'Postgres & Row Level Security' },
      { name: 'Firebase', description: 'NoSQL & Realtime Auth' },
      { name: 'SQLite', description: 'Embedded Relational DB' },
    ],
  },
  {
    id: 'cloud-and-devops',
    title: 'Cloud & DevOps',
    icon: <Cloud className="size-4 text-[#6366F1]" />,
    badgeCount: 11,
    skills: [
      { name: 'AWS', description: 'Amazon Web Services' },
      { name: 'EC2', description: 'Elastic Compute Cloud' },
      { name: 'S3', description: 'Simple Storage Service' },
      { name: 'RDS', description: 'Relational Database Service' },
      { name: 'IAM', description: 'Identity & Access Management' },
      { name: 'Docker', description: 'Containerization' },
      { name: 'GitHub Actions', description: 'CI/CD Pipelines' },
      { name: 'Linux', description: 'Unix Systems & CLI' },
      { name: 'Vercel', description: 'Edge Deployment' },
      { name: 'Netlify', description: 'Static Web Hosting' },
      { name: 'Render', description: 'Cloud App Hosting' },
    ],
  },
  {
    id: 'ai-and-data',
    title: 'AI & Data',
    icon: <Sparkles className="size-4 text-[#EC4899]" />,
    badgeCount: 4,
    skills: [
      { name: 'Python', description: 'AI & Data Science' },
      { name: 'NumPy', description: 'Numerical Computing' },
      { name: 'AI Model Integration', description: 'Model Orchestration' },
      { name: 'LLM APIs', description: 'Bedrock & Gemini APIs' },
    ],
  },
  {
    id: 'developer-and-testing-tools',
    title: 'Developer & Testing Tools',
    icon: <Wrench className="size-4 text-[#8B5CF6]" />,
    badgeCount: 7,
    skills: [
      { name: 'Git', description: 'Version Control' },
      { name: 'GitHub', description: 'Collaboration & Repos' },
      { name: 'Postman', description: 'API Testing' },
      { name: 'Maven', description: 'Java Build Lifecycle' },
      { name: 'JUnit', description: 'Java Unit Testing' },
      { name: 'Jasmine', description: 'Frontend Testing' },
      { name: 'Figma', description: 'UI/UX Design' },
    ],
  },
  {
    id: 'computer-science-fundamentals',
    title: 'Computer Science Fundamentals',
    icon: <BookOpen className="size-4 text-[#14B8A6]" />,
    badgeCount: 5,
    skills: [
      { name: 'Data Structures & Algorithms', description: '315+ LeetCode Solved' },
      { name: 'Object-Oriented Programming', description: 'OOP Architecture' },
      { name: 'Database Management Systems', description: 'DBMS & Normalization' },
      { name: 'Operating Systems', description: 'Concurrency & Memory' },
      { name: 'Computer Networks', description: 'TCP/IP, HTTP & DNS' },
    ],
  },
];

export const TechnologiesToolsSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('frontend-development');

  const toggleCategory = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="technologies-and-tools" className="relative overflow-hidden rounded-[24px] border border-hairline bg-surface p-6 sm:p-7 shadow-sm transition-all duration-300">
      <div className="border-b border-hairline/60 pb-4">
        <h3 className="font-cabinet text-[20px] font-bold tracking-tight text-strong sm:text-[22px]">
          Software Developer — Technologies & Tools
        </h3>
        <p className="mt-1 font-mono text-[11px] text-ink-soft">
          Interactive verified technical proficiencies · Click a category to expand
        </p>
      </div>

      <div className="mt-5 flex flex-col divide-y divide-hairline/70">
        {TECH_CATEGORIES.map((category) => {
          const isOpen = expandedId === category.id;

          return (
            <div key={category.id} className="py-3.5 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                aria-expanded={isOpen}
                aria-controls={`tech-content-${category.id}`}
                id={`tech-header-${category.id}`}
                className="group flex w-full items-center justify-between rounded-xl p-2 text-left transition-colors duration-200 hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strong"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-hairline bg-subtle/80 text-strong transition-colors group-hover:border-btn-border group-hover:bg-subtle-strong">
                    {category.icon}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className="font-cabinet text-[16px] font-bold tracking-tight text-strong sm:text-[17px] group-hover:text-ink transition-colors">
                      {category.title}
                    </span>
                    <span className="font-mono text-[11px] font-medium text-ink-soft rounded-full bg-subtle px-2 py-0.5 border border-hairline/50">
                      {category.skills.length}
                    </span>
                  </div>
                </div>

                <span className="flex size-7 items-center justify-center rounded-full text-ink-soft transition-colors group-hover:text-strong">
                  <ChevronDown
                    className={`size-4 transition-transform duration-350 ease-in-out ${
                      isOpen ? 'rotate-180 text-strong' : ''
                    }`}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`tech-content-${category.id}`}
                    role="region"
                    aria-labelledby={`tech-header-${category.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transitionEnd: { overflow: 'visible' },
                    }}
                    exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -4, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="pt-7 pb-2.5 pl-2 sm:pl-3"
                    >
                      <div className="flex flex-wrap gap-2.5">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="group/chip relative flex items-center gap-2 rounded-xl border border-hairline bg-subtle/60 px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-btn-border hover:bg-subtle-strong hover:shadow-xs"
                          >
                            <div className="flex size-5 shrink-0 items-center justify-center transition-transform duration-200 group-hover/chip:scale-110">
                              <TechIcon name={skill.name} className="size-4" />
                            </div>

                            <span className="font-cabinet text-[13px] sm:text-[14px] font-medium text-strong whitespace-nowrap">
                              {skill.name}
                            </span>

                            <div
                              role="tooltip"
                              className="pointer-events-none absolute -top-8 left-1/2 z-40 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover/chip:opacity-100 whitespace-nowrap rounded-md border border-hairline bg-surface px-2.5 py-1 font-mono text-[11px] font-semibold text-strong shadow-lg"
                            >
                              {skill.name}
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-b border-r border-hairline bg-surface" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
