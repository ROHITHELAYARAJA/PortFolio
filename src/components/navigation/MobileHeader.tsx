import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Sun, Moon, ArrowUpRight, Mail } from 'lucide-react';
import { AUTHOR_INFO } from '../../data/portfolioData';
import { RdxLogo } from '../ui/RdxLogo';

interface MobileHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  onOpenContact: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isDark,
  onToggleTheme,
  onOpenPalette,
  onOpenContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'GitHub', href: '#github' },
    { label: 'Open Source', href: '#open-source' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="xl:hidden w-full border-b border-hairline bg-surface/90 backdrop-blur-md sticky top-0 z-40 px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-[880px] items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 font-cabinet text-[18px] font-bold text-strong tracking-tight">
          <RdxLogo className="h-5 w-auto" />
          <span>Rohith E</span>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open search"
            className="flex size-10 items-center justify-center rounded-full border border-hairline bg-subtle text-ink-soft hover:text-strong"
          >
            <Search className="size-4" />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex size-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink-soft hover:text-strong"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="flex size-10 items-center justify-center rounded-full border border-hairline bg-surface text-strong hover:bg-subtle"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Slide-in Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel (slides from right, max 85vw or 320px) */}
          <div className="relative z-10 flex h-full w-[300px] max-w-[85vw] flex-col justify-between border-l border-hairline bg-surface p-6 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-hairline">
                <span className="font-cabinet text-[18px] font-bold text-strong">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="flex size-8 items-center justify-center rounded-full text-ink-soft hover:text-strong"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col gap-3">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-cabinet text-[18px] text-nav transition-colors hover:text-strong py-1"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="mt-8 pt-6 border-t border-hairline flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenContact();
                }}
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-btn-border bg-surface font-cabinet text-[15px] font-semibold text-strong hover:bg-subtle"
              >
                <Mail className="size-4" />
                <span>Contact Rohith</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
