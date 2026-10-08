import React from 'react';
import { Search, Sun, Moon, ArrowUpRight, FileText, Mail } from 'lucide-react';
import { AUTHOR_INFO } from '../../data/portfolioData';
import { RdxLogo } from '../ui/RdxLogo';

interface SidebarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  onOpenContact: () => void;
}

export const DesktopSidebar: React.FC<SidebarProps> = ({
  isDark,
  onToggleTheme,
  onOpenPalette,
  onOpenContact,
}) => {
  return (
    <aside className="hidden xl:flex xl:flex-col xl:pl-[28px] xl:pr-4 sticky top-10 self-start">
      {/* Brand Logo Header */}
      <div className="mb-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <RdxLogo className="h-6 w-auto group-hover:scale-105 transition-transform" />
          <span className="font-cabinet text-[17px] font-bold text-strong tracking-tight">Rohith E</span>
        </a>
      </div>

      {/* Search & Theme Controls Row */}
      <div className="flex items-center gap-3">
        {/* Search Command Palette Trigger */}
        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Open search command palette (Ctrl+K)"
          className="flex h-[46px] w-full max-w-[210px] items-center gap-2 rounded-full border border-hairline bg-subtle pl-4 pr-2 text-ink-soft transition-all hover:bg-subtle-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strong"
        >
          <Search className="size-[17px] shrink-0" />
          <span className="font-cabinet text-[15px] leading-none">Search</span>
          <span className="ml-auto flex shrink-0 items-center gap-1">
            <kbd className="flex h-[22px] min-w-[22px] items-center justify-center rounded-[6px] border border-hairline bg-surface px-1.5 font-mono text-[11px] font-medium leading-none text-ink-soft">
              Ctrl
            </kbd>
            <kbd className="flex h-[22px] min-w-[22px] items-center justify-center rounded-[6px] border border-hairline bg-surface px-1.5 font-mono text-[11px] font-medium leading-none text-ink-soft">
              K
            </kbd>
          </span>
        </button>

        {/* Dark/Light Mode Switcher */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex size-[46px] shrink-0 items-center justify-center rounded-full border border-hairline bg-surface text-ink-soft transition-colors hover:text-strong hover:border-btn-border"
        >
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </div>

      {/* INDEX NAVIGATION */}
      <div className="mt-8 flex flex-col">
        <p className="font-cabinet text-[20px] font-semibold text-strong tracking-tight">Index</p>
        <nav className="mt-3 flex flex-col gap-2">
          <a
            href="#"
            className="w-fit font-cabinet text-[17px] text-nav transition-colors hover:text-strong"
          >
            Home
          </a>
          <a
            href="#about"
            className="w-fit font-cabinet text-[17px] text-nav transition-colors hover:text-strong"
          >
            About
          </a>
          <a
            href="#experience"
            className="w-fit font-cabinet text-[17px] text-nav transition-colors hover:text-strong"
          >
            Experience
          </a>
          <a
            href="#github"
            className="w-fit font-cabinet text-[17px] text-nav transition-colors hover:text-strong"
          >
            GitHub
          </a>
          <a
            href="#open-source"
            className="w-fit font-cabinet text-[17px] text-nav transition-colors hover:text-strong"
          >
            Open Source
          </a>
          <a
            href="#projects"
            className="w-fit font-cabinet text-[17px] text-nav transition-colors hover:text-strong"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="w-fit font-cabinet text-[17px] text-nav transition-colors hover:text-strong"
          >
            Contact
          </a>
        </nav>
      </div>

      {/* CTA ACTION BUTTON */}
      <div className="mt-8 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onOpenContact}
          className="flex h-[42px] items-center justify-center gap-2 rounded-lg border border-btn-border bg-surface font-cabinet text-[15px] font-semibold text-strong transition-all hover:bg-subtle hover:border-strong"
        >
          <Mail className="size-4 text-ink-soft" />
          <span>Contact Me</span>
        </button>

        <a
          href="mailto:e.rohith3130@gmail.com?subject=Resume%20Request%20-%20Rohith%20E"
          className="flex h-[38px] items-center justify-center gap-2 rounded-lg border border-hairline font-cabinet text-[14px] text-ink-soft transition-colors hover:text-strong hover:bg-subtle"
        >
          <FileText className="size-3.5" />
          <span>Request Resume</span>
        </a>
      </div>
    </aside>
  );
};
