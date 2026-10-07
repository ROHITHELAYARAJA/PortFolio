import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Compass,
  FolderGit2,
  GitMerge,
  ExternalLink,
  Mail,
  Copy,
  Check,
  Code2,
  FileText,
  CornerDownLeft,
} from 'lucide-react';
import { FEATURED_PROJECTS } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenContact: () => void;
}

interface PaletteItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Projects' | 'Actions';
  icon: React.ReactNode;
  hint?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenContact,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global key listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Define All Available Items
  const items: PaletteItem[] = [
    // NAVIGATION
    {
      id: 'nav-home',
      label: 'Home',
      category: 'Navigation',
      icon: <Compass className="size-4 text-ink-soft" />,
      hint: 'Top of page',
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-about',
      label: 'About Rohith',
      category: 'Navigation',
      icon: <Compass className="size-4 text-ink-soft" />,
      hint: 'Bio & Focus',
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-experience',
      label: 'Experience',
      category: 'Navigation',
      icon: <Compass className="size-4 text-ink-soft" />,
      hint: 'Career & Freelance',
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-github',
      label: 'GitHub Activity',
      category: 'Navigation',
      icon: <FolderGit2 className="size-4 text-ink-soft" />,
      hint: 'Live Contributions',
      action: () => {
        document.getElementById('github')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-opensource',
      label: 'Open Source (AbacusAI #70)',
      category: 'Navigation',
      icon: <GitMerge className="size-4 text-purple-400" />,
      hint: 'Merged PR #70',
      action: () => {
        document.getElementById('open-source')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-projects',
      label: 'Featured Projects',
      category: 'Navigation',
      icon: <FolderGit2 className="size-4 text-ink-soft" />,
      hint: 'Engineering Work',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-lab',
      label: 'Engineering Lab',
      category: 'Navigation',
      icon: <Code2 className="size-4 text-ink-soft" />,
      hint: 'Architecture & Visualizers',
      action: () => {
        document.getElementById('engineering-lab')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-writing',
      label: 'Writing',
      category: 'Navigation',
      icon: <FileText className="size-4 text-ink-soft" />,
      hint: 'Technical Articles',
      action: () => {
        document.getElementById('writing')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-contact',
      label: 'Contact',
      category: 'Navigation',
      icon: <Mail className="size-4 text-ink-soft" />,
      hint: 'Direct communication',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },

    // PROJECTS
    {
      id: 'proj-vlabs',
      label: 'Virtual Labs — Engineering Learning Platform',
      category: 'Projects',
      icon: <FolderGit2 className="size-4 text-emerald-400" />,
      hint: 'Flagship · Case Study',
      action: () => {
        onSelectProject('virtual-labs');
        onClose();
      },
    },
    {
      id: 'proj-blast',
      label: 'Blast AI — Student AI Assistant',
      category: 'Projects',
      icon: <FolderGit2 className="size-4 text-sky-400" />,
      hint: 'PDF Tutor · Case Study',
      action: () => {
        onSelectProject('blast-ai');
        onClose();
      },
    },
    {
      id: 'proj-bank',
      label: 'Bank Management System',
      category: 'Projects',
      icon: <FolderGit2 className="size-4 text-amber-400" />,
      hint: 'Java JDBC · Case Study',
      action: () => {
        onSelectProject('bank-management-system');
        onClose();
      },
    },
    {
      id: 'proj-rdx',
      label: 'Rohith Digital X Client Deployments',
      category: 'Projects',
      icon: <FolderGit2 className="size-4 text-zinc-400" />,
      hint: 'Production Storefronts',
      action: () => {
        onSelectProject('rohith-digital-x');
        onClose();
      },
    },

    // ACTIONS
    {
      id: 'act-copy-email',
      label: 'Copy Email Address',
      category: 'Actions',
      icon: copiedEmail ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4 text-ink-soft" />,
      hint: 'e.rohith3130@gmail.com',
      action: () => {
        navigator.clipboard.writeText('e.rohith3130@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      },
    },
    {
      id: 'act-github',
      label: 'Open GitHub Profile',
      category: 'Actions',
      icon: <ExternalLink className="size-4 text-ink-soft" />,
      hint: '@ROHITHELAYARAJA',
      action: () => {
        window.open('https://github.com/ROHITHELAYARAJA', '_blank');
        onClose();
      },
    },
    {
      id: 'act-linkedin',
      label: 'Open LinkedIn Profile',
      category: 'Actions',
      icon: <ExternalLink className="size-4 text-ink-soft" />,
      hint: 'rohith-elayaraja',
      action: () => {
        window.open('https://www.linkedin.com/in/rohith-elayaraja/', '_blank');
        onClose();
      },
    },
    {
      id: 'act-leetcode',
      label: 'Open LeetCode Profile',
      category: 'Actions',
      icon: <ExternalLink className="size-4 text-ink-soft" />,
      hint: 'ROHITHELAYARAJA',
      action: () => {
        window.open('https://leetcode.com/u/ROHITHELAYARAJA/', '_blank');
        onClose();
      },
    },
    {
      id: 'act-resume',
      label: 'Request Resume via Email',
      category: 'Actions',
      icon: <FileText className="size-4 text-ink-soft" />,
      hint: 'Send inquiry',
      action: () => {
        window.location.href = 'mailto:e.rohith3130@gmail.com?subject=Resume%20Request%20-%20Rohith%20E';
        onClose();
      },
    },
  ];

  // Filter items based on query
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    (item.hint && item.hint.toLowerCase().includes(query.toLowerCase()))
  );

  // Group filtered items by category
  const groupedCategories = ['Navigation', 'Projects', 'Actions'] as const;

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette Modal Box */}
      <div
        className="relative z-10 flex w-full max-w-[620px] flex-col overflow-hidden rounded-2xl border border-hairline bg-surface shadow-2xl transition-all"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-hairline px-4 py-3.5 sm:px-5">
          <Search className="size-5 shrink-0 text-ink-soft" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search sections, projects, links..."
            className="w-full bg-transparent font-cabinet text-[16px] text-strong placeholder:text-ink-soft/60 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-hairline bg-subtle px-1.5 font-mono text-[10px] text-ink-soft">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="sm:hidden flex size-7 items-center justify-center rounded-md text-ink-soft hover:text-strong"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 sm:p-3 divide-y divide-hairline/40"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-cabinet text-[15px] text-ink-soft">No matching commands or projects found.</p>
              <p className="mt-1 font-mono text-[11px] text-ink-soft/60">Try searching "virtual labs", "abacus", "github", or "email"</p>
            </div>
          ) : (
            groupedCategories.map((category) => {
              const categoryItems = filteredItems.filter((i) => i.category === category);
              if (categoryItems.length === 0) return null;

              return (
                <div key={category} className="py-2 first:pt-0 last:pb-0">
                  <p className="px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-soft/70">
                    {category}
                  </p>
                  <div className="mt-1 flex flex-col gap-0.5">
                    {categoryItems.map((item) => {
                      const itemGlobalIndex = filteredItems.indexOf(item);
                      const isSelected = itemGlobalIndex === selectedIndex;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => item.action()}
                          onMouseEnter={() => setSelectedIndex(itemGlobalIndex)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors ${
                            isSelected
                              ? 'bg-subtle-strong text-strong'
                              : 'text-ink-soft hover:bg-subtle hover:text-strong'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex size-7 items-center justify-center rounded-lg bg-surface border border-hairline">
                              {item.icon}
                            </span>
                            <span className="font-cabinet text-[14px] font-medium sm:text-[15px]">
                              {item.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {item.hint && (
                              <span className="font-mono text-[11px] text-ink-soft/70">
                                {item.hint}
                              </span>
                            )}
                            {isSelected && (
                              <CornerDownLeft className="size-3.5 text-strong opacity-80" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="flex items-center justify-between border-t border-hairline bg-subtle/50 px-4 py-2.5 font-mono text-[11px] text-ink-soft">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-hairline bg-surface px-1">↑</kbd>
              <kbd className="rounded border border-hairline bg-surface px-1">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-hairline bg-surface px-1">↵</kbd>
              <span>to select</span>
            </span>
          </div>
          <span className="hidden sm:inline-block">Rohith Portfolio Index</span>
        </div>
      </div>
    </div>
  );
};
