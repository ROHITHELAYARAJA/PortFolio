"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Code2, ArrowRight } from "lucide-react";

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
  icon = <Code2 className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  onClick,
}: DisplayCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/80 backdrop-blur-sm px-4 py-3 transition-all duration-500 cursor-pointer hover:border-white/30 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-900/40 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{date}</p>
        <span className="text-xs text-muted-foreground flex items-center gap-1 opacity-70">
          Click to inspect <ArrowRight className="size-3" />
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

  const defaultCards: DisplayCardProps[] = [
    {
      title: "Virtual Labs",
      description: "500–600 Students · 12 Labs",
      date: "Spring Boot + Supabase",
    },
    {
      title: "Blast AI",
      description: "80-Page PDF Workspace",
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
    <div className="flex flex-col items-center gap-6 overflow-hidden select-none">
      {/* 3D Stacked Cards Container with Pure Click Navigation (Zero Scrollbars) */}
      <div className="relative h-64 w-[28rem] max-w-full flex items-center justify-center overflow-hidden">
        {cardList.map((cardProps, index) => {
          // Calculate relative position to active index
          const diff = (index - activeIndex + total) % total;
          const isFront = diff === 0;
          const isMiddle = diff === 1;
          const isBack = diff === 2 || diff > 1;

          let transformClass = "translate-x-0 translate-y-0 z-30 scale-100 opacity-100";
          if (isMiddle) {
            transformClass = "translate-x-8 translate-y-6 z-20 scale-95 opacity-85";
          } else if (isBack) {
            transformClass = "translate-x-16 translate-y-12 z-10 scale-90 opacity-70";
          }

          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className={cn(
                "absolute transition-all duration-500 ease-out cursor-pointer",
                transformClass
              )}
            >
              <DisplayCard
                {...cardProps}
                className={cn(
                  cardProps.className,
                  isFront ? "ring-2 ring-emerald-500/40 shadow-2xl" : "shadow-md hover:scale-[1.02]"
                )}
              />
            </div>
          );
        })}
      </div>

      {/* Click-based Navigation Controls (Click only, No scrolling effect) */}
      <div className="flex items-center gap-3 font-mono text-xs text-ink-soft">
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
                "h-2 rounded-full transition-all",
                i === activeIndex ? "w-6 bg-strong" : "w-2 bg-hairline hover:bg-ink-soft"
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
