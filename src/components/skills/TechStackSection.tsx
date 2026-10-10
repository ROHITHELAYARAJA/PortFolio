import React from 'react';

export const TechStackSection: React.FC = () => {
  return (
    <div
      id="technologies-and-tools"
      className="relative overflow-hidden rounded-[24px] border border-neutral-200/90 bg-white p-5 sm:p-7 md:p-9 shadow-xs select-none transition-all duration-200"
    >
      <img
        src="/assets/tech-stack.png"
        alt="Technologies & Tools - Tech Stack"
        className="w-full h-auto max-w-2xl mx-auto object-contain select-none block"
        loading="eager"
      />
    </div>
  );
};
