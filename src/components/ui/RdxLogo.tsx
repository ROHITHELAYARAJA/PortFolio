import React from 'react';

interface RdxLogoProps {
  className?: string;
  size?: number | string;
}

export const RdxLogo: React.FC<RdxLogoProps> = ({ className = 'h-6 w-auto' }) => {
  return (
    <img
      src="/assets/rdx-logo.png"
      alt="Rohith E Official Logo"
      className={`${className} object-contain transition-all duration-300 dark:invert select-none`}
    />
  );
};
