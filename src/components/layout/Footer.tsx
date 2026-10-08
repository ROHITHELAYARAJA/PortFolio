import React from 'react';
import { Github, Linkedin, Code2, Mail } from 'lucide-react';
import { RdxLogo } from '../ui/RdxLogo';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="mt-16 flex flex-col gap-10 border-t border-dashed border-line pt-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-hairline/70">
        <div className="flex items-center gap-3">
          <RdxLogo className="h-8 w-auto" />
          <div>
            <h3 className="font-cabinet text-[20px] font-bold text-strong tracking-tight">Rohith E</h3>
            <p className="font-mono text-[12px] text-ink-soft">Software Developer · AI & ML Engineer</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenContact}
          className="rounded-full bg-strong px-4 py-2 font-cabinet text-[13px] font-bold text-bg hover:opacity-90 transition-opacity shadow-sm"
        >
          Get in Touch ↗
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 pt-2">
        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-soft">
            Navigate
          </p>
          <nav className="flex flex-col gap-2 font-cabinet text-[15px] text-nav">
            <a href="#home" className="hover:text-strong transition-colors">Home</a>
            <a href="#about" className="hover:text-strong transition-colors">About</a>
            <a href="#experience" className="hover:text-strong transition-colors">Experience</a>
            <a href="#technologies-and-tools" className="hover:text-strong transition-colors">Technologies & Tools</a>
            <a href="#github" className="hover:text-strong transition-colors">GitHub</a>
            <a href="#open-source" className="hover:text-strong transition-colors">Open Source</a>
            <a href="#projects" className="hover:text-strong transition-colors">Projects</a>
            <a href="#contact" className="hover:text-strong transition-colors">Contact</a>
          </nav>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-soft">
            Featured Systems
          </p>
          <nav className="flex flex-col gap-2 font-cabinet text-[15px] text-nav">
            <a href="https://github.com/ROHITHELAYARAJA/Virtual-Labs" target="_blank" rel="noreferrer" className="hover:text-strong transition-colors">Virtual Labs</a>
            <a href="https://github.com/ROHITHELAYARAJA/Student-AI-Assistant" target="_blank" rel="noreferrer" className="hover:text-strong transition-colors">Blast AI</a>
            <a href="https://github.com/ROHITHELAYARAJA/Bank-Management-System" target="_blank" rel="noreferrer" className="hover:text-strong transition-colors">Bank Management System</a>
            <a href="https://rohith-digital-x-xi.vercel.app" target="_blank" rel="noreferrer" className="hover:text-strong transition-colors">Rohith Digital X</a>
            <a href="https://github.com/abacusai/abacusai-bot/pull/70" target="_blank" rel="noreferrer" className="hover:text-strong transition-colors">AbacusAI Bot PR #70</a>
          </nav>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-soft">
            Connect
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/ROHITHELAYARAJA"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="flex size-[36px] items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-all hover:border-btn-border hover:text-strong hover:-translate-y-0.5"
            >
              <Github className="size-4" />
            </a>

            <a
              href="https://linkedin.com/in/rohith-elayaraja"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="flex size-[36px] items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-all hover:border-btn-border hover:text-[#0A66C2] hover:-translate-y-0.5"
            >
              <Linkedin className="size-4" />
            </a>

            <a
              href="https://leetcode.com/u/Rohith_Elayaraja"
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode Profile"
              className="flex size-[36px] items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-all hover:border-btn-border hover:text-[#FFA116] hover:-translate-y-0.5"
            >
              <Code2 className="size-4" />
            </a>

            <a
              href="mailto:e.rohit3130@gmail.com"
              aria-label="Email Rohith"
              className="flex size-[36px] items-center justify-center rounded-lg border border-hairline bg-surface text-ink-soft transition-all hover:border-btn-border hover:text-[#EA4335] hover:-translate-y-0.5"
            >
              <Mail className="size-4" />
            </a>
          </div>

          <p className="mt-2 font-mono text-[12px] text-ink-soft">
            e.rohit3130@gmail.com
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-soft">
            Engineering Standard
          </p>
          <p className="font-cabinet text-[13px] leading-relaxed text-ink-soft">
            Third-year B.E. AI & DS student at VSB Engineering College. Engineered with strict data contracts, bounded token budgets, and zero-insecurity standards.
          </p>
          <span className="font-mono text-[11px] text-ink-soft mt-1">
            Built with React & Tailwind CSS
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-6 pb-12 font-mono text-[12px] text-ink-soft">
        <p>© {new Date().getFullYear()} Rohith E. All rights reserved.</p>
        <p>Namakkal, Tamil Nadu, India · UTC+05:30</p>
      </div>
    </footer>
  );
};
