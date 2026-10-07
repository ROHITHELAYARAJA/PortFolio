import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Layers, Cpu, Database, Terminal, Code2 } from 'lucide-react';
import { ENGINEERING_LAB_ITEMS, type LabItem } from '../../data/portfolioData';

export const EngineeringLabSection: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox (Esc, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;

      if (e.key === 'Escape') {
        setActiveItemIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev - 1 + ENGINEERING_LAB_ITEMS.length) % ENGINEERING_LAB_ITEMS.length : null
        );
      } else if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev + 1) % ENGINEERING_LAB_ITEMS.length : null
        );
      }
    };

    if (activeItemIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeItemIndex]);

  const activeItem = activeItemIndex !== null ? ENGINEERING_LAB_ITEMS[activeItemIndex] : null;

  return (
    <div className="flex flex-col gap-6">
      {/* 4:3 Thumbnails Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ENGINEERING_LAB_ITEMS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveItemIndex(index)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface text-left transition-all hover:border-btn-border hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strong"
          >
            {/* 4:3 Aspect Thumbnail Box */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-hairline/60 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 p-5 flex flex-col justify-between">
              {/* Category & Date */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                  {item.category}
                </span>
                <span className="font-mono text-[10px] text-ink-soft">{item.date}</span>
              </div>

              {/* Graphic Blueprint Icon */}
              <div className="flex items-center justify-center py-4">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-hairline bg-surface shadow-sm group-hover:scale-105 transition-transform">
                  <Code2 className="size-6 text-strong" />
                </div>
              </div>

              {/* Tags Bar */}
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-hairline/60 bg-surface/70 px-1.5 py-0.5 font-mono text-[9px] text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover Inspect Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-cabinet text-[12px] font-bold text-white shadow-lg">
                  <Eye className="size-3.5" />
                  <span>Inspect Spec</span>
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4">
              <h4 className="font-cabinet text-[15px] font-bold text-strong leading-snug group-hover:text-ink">
                {item.title}
              </h4>
              <p className="mt-1 line-clamp-2 font-cabinet text-[12px] leading-relaxed text-ink-soft">
                {item.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem !== null && activeItemIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Dark translucent backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setActiveItemIndex(null)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative z-10 flex w-full max-w-[720px] flex-col overflow-hidden rounded-[24px] border border-hairline bg-surface shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  {activeItem.category}
                </span>
                <span className="text-ink-soft/40">•</span>
                <span className="font-mono text-[11px] text-ink-soft">{activeItem.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveItemIndex(
                      (activeItemIndex - 1 + ENGINEERING_LAB_ITEMS.length) %
                        ENGINEERING_LAB_ITEMS.length
                    )
                  }
                  aria-label="Previous item (Left arrow)"
                  className="flex size-8 items-center justify-center rounded-lg border border-hairline text-ink-soft hover:bg-subtle hover:text-strong"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveItemIndex((activeItemIndex + 1) % ENGINEERING_LAB_ITEMS.length)
                  }
                  aria-label="Next item (Right arrow)"
                  className="flex size-8 items-center justify-center rounded-lg border border-hairline text-ink-soft hover:bg-subtle hover:text-strong"
                >
                  <ChevronRight className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveItemIndex(null)}
                  aria-label="Close lightbox (Escape)"
                  className="flex size-8 items-center justify-center rounded-lg border border-hairline text-ink-soft hover:bg-subtle hover:text-strong ml-1"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Spec Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Graphic Blueprint Preview Box */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-hairline bg-gradient-to-br from-neutral-900 to-black p-6 flex flex-col justify-between text-white shadow-inner">
                <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
                  <span>ENGINEERING SPEC // 0{activeItemIndex + 1}</span>
                  <span className="size-2 rounded-full bg-emerald-400" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-cabinet text-[22px] font-bold text-white tracking-tight">
                    {activeItem.title}
                  </h3>
                  <p className="font-mono text-[12px] text-neutral-300 leading-relaxed max-w-[55ch]">
                    {activeItem.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-neutral-700 bg-neutral-800/80 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed Explanation */}
              <div>
                <h4 className="font-cabinet text-[16px] font-bold text-strong">
                  Architectural Implementation Details
                </h4>
                <p className="mt-2 font-cabinet text-[15px] leading-relaxed text-body">
                  {activeItem.details}
                </p>
              </div>
            </div>

            {/* Footer Control Hint */}
            <div className="flex items-center justify-between border-t border-hairline bg-subtle/50 px-6 py-3 font-mono text-[11px] text-ink-soft">
              <span>Press ← and → to navigate · Esc to close</span>
              <span>
                {activeItemIndex + 1} / {ENGINEERING_LAB_ITEMS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
