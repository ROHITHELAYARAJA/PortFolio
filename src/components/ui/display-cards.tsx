"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Terminal } from "lucide-react";

export interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  onClick?: () => void;
}

function DisplayCard({
  className,
  icon = <Terminal className="size-4 text-emerald-500" />,
  title = "Featured Project",
  description = "Production Engineering Work",
  date = "Spring Boot + Next.js",
  titleClassName = "text-emerald-500",
  onClick,
}: DisplayCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex min-h-[190px] sm:min-h-[210px] w-full max-w-[440px] sm:max-w-[480px] -skew-y-[4deg] sm:-skew-y-[6deg] select-none flex-col justify-between rounded-2xl border-2 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl p-5 sm:p-6 transition-all duration-700 cursor-pointer shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]",
        className
      )}
    >
      {/* Header: Terminal Icon + Title */}
      <div className="flex items-center gap-3">
        <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 shadow-xs">
          {icon}
        </span>
        <h4 className={cn("text-lg sm:text-xl font-cabinet font-bold tracking-tight", titleClassName)}>
          {title}
        </h4>
      </div>

      {/* Main Metric / Description */}
      <p className="text-base sm:text-lg font-semibold text-strong leading-snug my-2">
        {description}
      </p>

      {/* Footer: Tech Stack Pill + Click to Inspect */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline/60 pt-3 text-xs sm:text-sm font-mono">
        <span className="text-ink-soft shrink-0">
          {date}
        </span>
        <span className="inline-flex items-center gap-1.5 font-bold text-strong group-hover:translate-x-1 transition-transform shrink-0">
          Click to inspect <ArrowRight className="size-3.5" />
        </span>
      </div>
    </div>
  );
}

export interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const defaultCards: DisplayCardProps[] = [
    {
      title: "Virtual-Labs (Flagship)",
      description: "500–600 Students · 12 Labs",
      date: "Next.js + Spring Boot 3.3",
    },
    {
      title: "Student-AI-Assistant",
      description: "Blast AI · 80-Page PDF Workspace",
      date: "React + AWS Bedrock",
    },
    {
      title: "AbacusAI Bot",
      description: "Windows 8.3 Path Canonicalization",
      date: "Merged Upstream PR #70",
    },
  ];

  const cardList = cards || defaultCards;
  const total = cardList.length;

  // Auto-advance one card at a time with smooth transition
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handleCardClick = (clickedIndex: number) => {
    setActiveIndex(clickedIndex);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div
      className="flex flex-col items-center gap-5 select-none w-full max-w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Enlarged 3D Stage: Only the first card is visible and sharp, back cards are heavily blurred out */}
      <div className="relative min-h-[240px] sm:min-h-[270px] w-full max-w-[520px] flex items-center justify-center px-3 sm:px-0">
        {cardList.map((cardProps, index) => {
          const diff = (index - activeIndex + total) % total;
          const isFront = diff === 0;

          // Only the first card is visible and interactive
          // Background cards are fully blurred into ghost silhouettes
          let transformClass = "translate-x-0 translate-y-0 z-30 scale-100 opacity-100 filter-none pointer-events-auto";
          if (diff === 1) {
            transformClass = "translate-x-6 sm:translate-x-8 translate-y-5 sm:translate-y-6 z-20 scale-[0.96] opacity-30 filter blur-[8px] sm:blur-[10px] pointer-events-none";
          } else if (diff > 1) {
            transformClass = "translate-x-12 sm:translate-x-14 translate-y-10 sm:translate-y-12 z-10 scale-[0.92] opacity-15 filter blur-[14px] sm:blur-[16px] pointer-events-none";
          }

          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className={cn(
                "absolute w-full max-w-[440px] sm:max-w-[480px] transition-all duration-700 ease-out",
                transformClass
              )}
            >
              <DisplayCard
                {...cardProps}
                className={cn(
                  cardProps.className,
                  isFront
                    ? "ring-2 ring-emerald-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]"
                    : "opacity-40"
                )}
              />
            </div>
          );
        })}
      </div>

      {/* Clean Navigation Bar: Prev / Dots / Next */}
      <div className="flex items-center gap-3 font-mono text-xs text-ink-soft mt-1">
        <button
          type="button"
          onClick={handlePrev}
          className="rounded-lg border border-hairline bg-subtle px-3 py-1.5 font-bold hover:bg-subtle-strong hover:text-strong transition-all"
        >
          ← Prev
        </button>

        <div className="flex items-center gap-1.5">
          {cardList.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === activeIndex ? "w-6 bg-emerald-500 shadow-xs" : "w-2 bg-hairline hover:bg-ink-soft"
              )}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="rounded-lg border border-hairline bg-subtle px-3 py-1.5 font-bold hover:bg-subtle-strong hover:text-strong transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
