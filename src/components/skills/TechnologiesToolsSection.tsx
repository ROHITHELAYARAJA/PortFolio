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
      { name: 'JavaScript', description: 'ES6+ & Web Standards' },
      { name: 'TypeScript', description: 'Type-Safe Development' },
      { name: 'SQL', description: 'Relational Query Language' },
    ],
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    icon: <Layout className="size-4 text-[#0EA5E9]" />,
    badgeCount: 5,
    skills: [
      { name: 'HTML5', description: 'Semantic HTML' },
      { name: 'CSS3', description: 'Modern CSS & Flexbox/Grid' },
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
      { name: 'JDBC', description: 'Direct Database Connectivity' },
      { name: 'Express.js', description: 'Node.js Backend Framework' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: <Database className="size-4 text-[#F59E0B]" />,
    badgeCount: 5,
    skills: [
      { name: 'MySQL', description: 'Relational Database Engine' },
      { name: 'PostgreSQL', description: 'Advanced SQL Database' },
      { name: 'Supabase', description: 'PostgreSQL & Realtime' },
      { name: 'Firebase', description: 'Cloud Firestore & Auth' },
      { name: 'SQLite', description: 'Embedded SQL Engine' },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    icon: <Cloud className="size-4 text-[#6366F1]" />,
    badgeCount: 11,
    skills: [
      { name: 'AWS', description: 'Cloud Infrastructure' },
      { name: 'EC2', description: 'Elastic Compute Cloud' },
      { name: 'S3', description: 'Simple Storage Service' },
      { name: 'RDS', description: 'Relational Database Service' },
      { name: 'IAM', description: 'Identity & Access Management' },
      { name: 'Docker', description: 'Containerization' },
      { name: 'GitHub Actions', description: 'CI/CD Pipelines' },
      { name: 'Linux', description: 'System Administration' },
      { name: 'Vercel', description: 'Edge Deployment' },
      { name: 'Netlify', description: 'Static Web Hosting' },
      { name: 'Render', description: 'Cloud Application Hosting' },
    ],
  },
  {
    id: 'ai-data',
    title: 'AI & Data',
    icon: <Sparkles className="size-4 text-[#EC4899]" />,
    badgeCount: 4,
    skills: [
      { name: 'Python', description: 'Data Science & PyTorch' },
      { name: 'NumPy', description: 'Numerical Computing' },
      { name: 'AI Model Integration', description: 'Model Orchestration' },
      { name: 'LLM APIs', description: 'Bedrock & Gemini APIs' },
    ],
  },
  {
    id: 'developer-tools',
    title: 'Developer & Testing Tools',
    icon: <Wrench className="size-4 text-[#8B5CF6]" />,
    badgeCount: 7,
    skills: [
      { name: 'Git', description: 'Version Control' },
      { name: 'GitHub', description: 'Code Collaboration' },
      { name: 'Postman', description: 'API Testing & Documentation' },
      { name: 'Maven', description: 'Java Build Lifecycle' },
      { name: 'JUnit', description: 'Unit Testing Framework' },
      { name: 'Jasmine', description: 'Behavior-Driven Testing' },
      { name: 'Figma', description: 'Interface & UX Design' },
    ],
  },
  {
    id: 'cs-fundamentals',
    title: 'Computer Science Fundamentals',
    icon: <BookOpen className="size-4 text-[#14B8A6]" />,
    badgeCount: 5,
    skills: [
      { name: 'Data Structures & Algorithms', description: 'Problem Solving & LeetCode' },
      { name: 'Object-Oriented Programming', description: 'Inheritance, Polymorphism & Encapsulation' },
      { name: 'Database Management Systems', description: 'Normalization, ACID & Indexing' },
      { name: 'Operating Systems', description: 'Processes, Threads & Memory' },
      { name: 'Computer Networks', description: 'TCP/IP, HTTP & DNS' },
    ],
  },
];

export const TechnologiesToolsSection: React.FC = () => {
  // Each category initially shows its title, icon, and chevron (all collapsed by default)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="technologies-and-tools" className="relative overflow-hidden rounded-[24px] border border-hairline bg-surface p-6 sm:p-7 shadow-sm transition-all duration-300">
      {/* Section Header */}
      <div className="border-b border-hairline/60 pb-4">
        <h3 className="font-cabinet text-[20px] font-bold tracking-tight text-strong sm:text-[22px]">
          Software Developer — Technologies & Tools
        </h3>
        <p className="mt-1 font-mono text-[11px] text-ink-soft">
          Interactive verified technical proficiencies · Click a category to expand
        </p>
      </div>

      {/* Accordion Categories List */}
      <div className="mt-5 flex flex-col divide-y divide-hairline/70">
        {TECH_CATEGORIES.map((category) => {
          const isOpen = expandedId === category.id;

          return (
            <div key={category.id} className="py-3.5 first:pt-0 last:pb-0">
              {/* Category Header Button */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                aria-expanded={isOpen}
                aria-controls={`tech-content-${category.id}`}
                id={`tech-header-${category.id}`}
                className="group flex w-full items-center justify-between rounded-xl p-2 text-left transition-colors duration-200 hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strong"
              >
                {/* Left: Icon & Category Title */}
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

                {/* Right: Smoothly rotating chevron (180deg) */}
                <span className="flex size-7 items-center justify-center rounded-full text-ink-soft transition-colors group-hover:text-strong">
                  <ChevronDown
                    className={`size-4 transition-transform duration-350 ease-in-out ${
                      isOpen ? 'rotate-180 text-strong' : ''
                    }`}
                  />
                </span>
              </button>

              {/* Smooth 300–400ms Expandable Content with height, opacity, and subtle slide transitions */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`tech-content-${category.id}`}
                    role="region"
                    aria-labelledby={`tech-header-${category.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -4, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="pt-4 pb-2 pl-2 sm:pl-3"
                    >
                      <div className="flex flex-wrap gap-2.5">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            title={skill.name}
                            className="group/chip relative flex items-center gap-2 rounded-xl border border-hairline bg-subtle/60 px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-btn-border hover:bg-subtle-strong hover:shadow-sm"
                          >
                            {/* Official Tech Icon */}
                            <div className="flex size-5 shrink-0 items-center justify-center">
                              <TechIcon name={skill.name} className="size-4" />
                            </div>

                            {/* Full Text Label */}
                            <span className="font-cabinet text-[13px] sm:text-[14px] font-medium text-strong whitespace-nowrap">
                              {skill.name}
                            </span>

                            {/* Accessible Floating Tooltip on Hover */}
                            <div
                              role="tooltip"
                              className="pointer-events-none absolute -top-7 left-1/2 z-30 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover/chip:opacity-100 whitespace-nowrap rounded-md border border-hairline bg-surface px-2 py-0.5 font-mono text-[10px] font-medium text-strong shadow-md"
                            >
                              {skill.name}
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
