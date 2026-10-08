import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'size-4' }) => {
  switch (name) {
    case 'Java':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M8.5 17.5c2.5.5 5.5.5 7.5-.5M6.5 20c4.5 1 9.5 1 12.5-.5M10 14.5c1.5.3 3.5.3 5 0"
            stroke="#E76F00"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M13.5 2c-1.5 2-2 3.5 1 5.5s1 4-1 6.5M10.5 4c-1 1.5-1.5 3 0 4.5s.5 3-1 4.5"
            stroke="#5382A1"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'Python':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M11.9 2c-5 0-4.7 2.2-4.7 2.2l.01 2.2h4.8v.7H5.2S2 6.7 2 11.9c0 5.2 2.8 5 2.8 5h1.7v-2.4s-.1-2.8 2.8-2.8h4.7s2.7.05 2.7-2.7V4.7S17 2 11.9 2zm-2.7 1.5a.9.9 0 110 1.8.9.9 0 010-1.8z"
            fill="#3776AB"
          />
          <path
            d="M12.1 22c5 0 4.7-2.2 4.7-2.2l-.01-2.2h-4.8v-.7h6.8s3.2.4 3.2-4.8c0-5.2-2.8-5-2.8-5h-1.7v2.4s.1 2.8-2.8 2.8H10s-2.7-.05-2.7 2.7v4.3s-.3 2.7 4.8 2.7zm2.7-1.5a.9.9 0 110-1.8.9.9 0 010 1.8z"
            fill="#FFD43B"
          />
        </svg>
      );

    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            d="M7.5 18.5c.8.5 1.7.8 2.5.8 1.4 0 2.2-.7 2.2-2.2v-7.6h-2.1v7.5c0 .7-.3 1-1 1-.5 0-1.1-.2-1.6-.5zm7.3-.2c.8.5 1.8.8 2.8.8 1.8 0 2.8-1 2.8-2.5 0-1.5-.9-2.2-2.3-2.8l-.8-.3c-.9-.4-1.3-.8-1.3-1.4 0-.6.5-1.1 1.4-1.1.7 0 1.4.3 1.9.6l.7-1.7c-.6-.4-1.6-.7-2.6-.7-2 0-3.3 1.2-3.3 2.9 0 1.5 1 2.3 2.4 2.9l.8.3c.9.4 1.4.9 1.4 1.5 0 .8-.7 1.3-1.6 1.3-.8 0-1.6-.3-2.3-.7z"
            fill="#000"
          />
        </svg>
      );

    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            d="M4.5 9.5h6.5v1.8H8.8v7.2H6.7v-7.2H4.5zm10.3 8.7c-1.1 0-2.1-.3-3-.9l1-1.7c.6.4 1.3.7 2 .7.8 0 1.3-.3 1.3-.8 0-.5-.4-.7-1.4-1.1l-.8-.3c-1.6-.6-2.5-1.4-2.5-2.8 0-1.8 1.4-3.1 3.6-3.1 1 0 1.9.2 2.7.7l-.9 1.7c-.6-.4-1.2-.6-1.8-.6-.9 0-1.4.4-1.4.9 0 .5.4.7 1.3 1l.8.3c1.8.7 2.6 1.5 2.6 2.9-.1 2-1.5 3.1-3.5 3.1z"
            fill="#FFF"
          />
        </svg>
      );

    case 'SQL':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#00758F" strokeWidth="2" />
          <path
            d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"
            stroke="#00758F"
            strokeWidth="2"
          />
          <path d="M10 12l2 2 4-4" stroke="#F29111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'HTML5':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" fill="#E34F26" />
          <path d="M12 3.8v16.4l5.8-1.4L19.2 3.8H12z" fill="#EF652A" />
          <path
            d="M7 6.8h10l-.2 2.3H9.4l.2 2.3h7.2l-.6 6.3-4.2 1.2-4.2-1.2-.3-3.4h2.2l.2 1.8 2.1.6 2.1-.6.3-2.6H7.3L7 6.8z"
            fill="#FFF"
          />
        </svg>
      );

    case 'CSS3':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" fill="#1572B6" />
          <path d="M12 3.8v16.4l5.8-1.4L19.2 3.8H12z" fill="#33A9DC" />
          <path
            d="M7 6.8h10l-.2 2.3H9.4l.2 2.3h7.2l-.6 6.3-4.2 1.2-4.2-1.2-.3-3.4h2.2l.2 1.8 2.1.6 2.1-.6.3-2.6H7.3L7 6.8z"
            fill="#FFF"
          />
        </svg>
      );

    case 'React':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <circle cx="12" cy="12" r="10" className="text-strong fill-current" />
          <path
            d="M15.5 8.5v7m-7-7v7l8.2-8.5"
            stroke="var(--color-bg)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#06B6D4">
          <path d="M12 6c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.9-2.5 4.8-2 1.1.3 1.9 1.1 2.8 2 1.4 1.4 3 3.1 6.8 3.1 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.8 2-1.1-.3-1.9-1.1-2.8-2-1.4-1.4-3-3.1-6.8-3.1zm-8 6.5c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.9-2.5 4.8-2 1.1.3 1.9 1.1 2.8 2 1.4 1.4 3 3.1 6.8 3.1 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.8 2-1.1-.3-1.9-1.1-2.8-2-1.4-1.4-3-3.1-6.8-3.1z" />
        </svg>
      );

    case 'Spring Boot':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3L12 16l3.7 5.3C19.4 19.8 22 16.2 22 12c0-5.5-4.5-10-10-10z"
            fill="#6DB33F"
          />
          <path
            d="M9 13l2.5-4.5h2L11 13h3l-4.5 5.5V14H8l1-1z"
            fill="#FFF"
          />
        </svg>
      );

    case 'REST APIs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <circle cx="5" cy="12" r="3" stroke="#8B5CF6" strokeWidth="2" />
          <circle cx="19" cy="6" r="3" stroke="#0EA5E9" strokeWidth="2" />
          <circle cx="19" cy="18" r="3" stroke="#10B981" strokeWidth="2" />
          <path d="M8 12h5m0 0l3-4.5M13 12l3 4.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );

    case 'JDBC':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="#E76F00" strokeWidth="1.8" />
          <path d="M7 9h10M7 13h6M7 17h4" stroke="#5382A1" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="16" cy="15" r="2" fill="#E76F00" />
        </svg>
      );

    case 'Express.js':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path
            d="M4 8h16M4 12h12M4 16h16"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="18" cy="12" r="2.5" fill="#68A063" />
        </svg>
      );

    case 'MySQL':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M12 3C7 3 3 6.5 3 11c0 3.2 2.1 6 5.2 7.2L7 21l3.5-1.5C11 19.8 11.5 20 12 20c5 0 9-3.5 9-9s-4-8-9-8z"
            fill="#4479A1"
          />
          <path d="M9 10c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5c0 1.2-.8 2-2 2.3V14h-2v-1.7c-1.2-.3-2-1.1-2-2.3z" fill="#F29111" />
        </svg>
      );

    case 'PostgreSQL':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.8 8.1 6.8 9.4.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.7 9.7 0 015 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7 1 .7 2v3c0 .3.2.6.7.5 4-1.3 6.8-5 6.8-9.4 0-5.5-4.5-10-10-10z"
            fill="#4169E1"
          />
        </svg>
      );

    case 'Supabase':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M13.5 2.5L3.8 13.9c-.6.7-.1 1.8.8 1.8h7.9L10.5 21.5l9.7-11.4c.6-.7.1-1.8-.8-1.8h-7.9l2-5.8z"
            fill="#3ECF8E"
          />
        </svg>
      );

    case 'Firebase':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M4 18l7.5 4.3c.3.2.7.2 1 0L20 18l-8-15-2.5 5.5-3.5-6.5L4 18z" fill="#FFA000" />
          <path d="M12 3l8 15-7.5 4.3c-.3.2-.7.2-1 0L12 3z" fill="#F57C00" />
          <path d="M9.5 8.5L4 18l7.5 4.3L9.5 8.5z" fill="#FFCA28" />
        </svg>
      );

    case 'SQLite':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#003B57" />
          <path
            d="M17 7H7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-1 7H8v-2h8v2zm0-3H8V9h8v2z"
            fill="#0094D3"
          />
        </svg>
      );

    case 'AWS':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M6.5 10c0-1.7 1.3-3 3-3s3 1.3 3 3v4H11v-4c0-.8-.7-1.5-1.5-1.5S8 9.2 8 10v4H6.5v-4zm9.5-3h1.5v7H16v-7z"
            fill="currentColor"
          />
          <path
            d="M4 17.5c4 2 12 2 16 0"
            stroke="#FF9900"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M18 16l3 1.5-1.5 2.5" fill="#FF9900" />
        </svg>
      );

    case 'EC2':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3.5" stroke="#FF9900" strokeWidth="1.8" />
          <path d="M8 8h8M8 12h8M8 16h5" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="16" cy="16" r="1.5" fill="#FF9900" />
        </svg>
      );

    case 'S3':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4 7l8-4 8 4v10l-8 4-8-4V7z" stroke="#FF9900" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M4 7l8 4 8-4M12 11v10" stroke="#FF9900" strokeWidth="1.5" />
        </svg>
      );

    case 'RDS':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="6" rx="7" ry="3" stroke="#FF9900" strokeWidth="1.8" />
          <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" stroke="#FF9900" strokeWidth="1.8" />
        </svg>
      );

    case 'IAM':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2l7 3.5v6c0 5-3.5 9-7 10.5-3.5-1.5-7-5.5-7-10.5v-6L12 2z" stroke="#FF9900" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="2.5" stroke="#FF9900" strokeWidth="1.5" />
          <path d="M9 16c0-1.8 1.3-3 3-3s3 1.2 3 3" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            d="M22 13c-.4-.3-1.6-.4-2.4.1-.3.2-.5.5-.7.8-.8-.4-2.1-.5-3.3 0-.4-1.8-1.7-3.4-3.6-4.1V9.5h-1.5V11H9V9.5H7.5V11H6v1.5h1.5V14H6v1.5h1.5v-1.5H9v1.5h1.5V14h1.5v1.5h1.5V14H15c.8 0 1.6.3 2.2.8.7.6 1.6.8 2.6.5.6-.2 1.3-.6 1.7-1.1.2-.4.4-.8.5-1.2z"
            fill="#2496ED"
          />
          <path
            d="M3 13.5c1 1.2 2.6 1.5 4 1.5h13c1 0 2-.4 2.8-1.2-1.5 4.5-5.5 7.7-10.3 7.7-4.2 0-7.8-2.4-9.5-6.5v-1.5z"
            fill="#1D63ED"
          />
        </svg>
      );

    case 'GitHub Actions':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="9" stroke="#2088FF" strokeWidth="1.8" />
          <path d="M12 7v5l3 3" stroke="#2088FF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'Linux':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <ellipse cx="12" cy="13" rx="6" ry="8" fill="#FCC624" />
          <ellipse cx="12" cy="14" rx="4.5" ry="6.5" fill="#000" />
          <ellipse cx="12" cy="15" rx="3.5" ry="5" fill="#FFF" />
          <circle cx="10.5" cy="9" r="1.2" fill="#000" />
          <circle cx="13.5" cy="9" r="1.2" fill="#000" />
        </svg>
      );

    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2L2 20h20L12 2z" />
        </svg>
      );

    case 'Netlify':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#00C7B7" />
          <path d="M12 4l6 6-6 6-6-6 6-6zm0 4l-4 4 4 4 4-4-4-4z" fill="#FFF" />
        </svg>
      );

    case 'Render':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#46E3B7" />
          <path d="M6 7h6a4 4 0 014 4c0 2.2-1.8 4-4 4H6V7zm4 6h2a2 2 0 100-4h-2v4z" fill="#000" />
        </svg>
      );

    case 'NumPy':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#013243" />
          <path d="M7 6v12h3V9.5l4 8.5h3V6h-3v8.5L10 6H7z" fill="#4DABCF" />
        </svg>
      );

    case 'AI Model Integration':
    case 'LLM APIs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2l2.4 6.2L20.5 10l-4.7 4.3 1.3 6.3L12 17.5 6.9 20.6l1.3-6.3L3.5 10l6.1-1.8L12 2z"
            fill="#8B5CF6"
          />
        </svg>
      );

    case 'Git':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#F05032" />
          <path
            d="M17.5 11.5L12.5 6.5a1.4 1.4 0 00-2 0l-5 5a1.4 1.4 0 000 2l5 5a1.4 1.4 0 002 0l5-5a1.4 1.4 0 000-2zm-7 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4-4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
            fill="#FFF"
          />
        </svg>
      );

    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
          />
        </svg>
      );

    case 'Postman':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="10" fill="#FF6C37" />
          <path
            d="M7 13.5l3.5-3.5 2 2 4.5-4.5m-3 0h3v3"
            stroke="#FFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'Maven':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#C71A36" strokeWidth="1.8" />
          <path d="M12 22V12M21 7l-9 5M3 7l9 5" stroke="#C71A36" strokeWidth="1.5" />
        </svg>
      );

    case 'JUnit':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#25A162" />
          <path d="M7 12l3.5 3.5 6.5-7" stroke="#FFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'Jasmine':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="9" stroke="#8A4182" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.5" fill="#8A4182" />
        </svg>
      );

    case 'Figma':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M8 2h4v4H8z" fill="#F24E1E" />
          <path d="M12 2h4a4 4 0 010 8h-4V2z" fill="#FF7262" />
          <path d="M12 10h4a4 4 0 010 8h-4v-8z" fill="#1ABCFE" />
          <path d="M8 10h4v4H8z" fill="#A259FF" />
          <path d="M8 18a4 4 0 010-8h4v4a4 4 0 01-4 4z" fill="#0ACF83" />
        </svg>
      );

    case 'Data Structures & Algorithms':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="5" r="2.5" stroke="#14B8A6" strokeWidth="1.8" />
          <circle cx="6" cy="18" r="2.5" stroke="#14B8A6" strokeWidth="1.8" />
          <circle cx="18" cy="18" r="2.5" stroke="#14B8A6" strokeWidth="1.8" />
          <path d="M10.5 7l-3 8.5M13.5 7l3 8.5" stroke="#14B8A6" strokeWidth="1.6" />
        </svg>
      );

    case 'Object-Oriented Programming':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="#6366F1" strokeWidth="1.8" />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" stroke="#6366F1" strokeWidth="1.5" />
        </svg>
      );

    case 'Database Management Systems':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="5" rx="7" ry="2.5" stroke="#F59E0B" strokeWidth="1.8" />
          <path d="M5 5v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5M5 10v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5M5 15v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" stroke="#F59E0B" strokeWidth="1.8" />
        </svg>
      );

    case 'Operating Systems':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="5" y="5" width="14" height="14" rx="2" stroke="#EC4899" strokeWidth="1.8" />
          <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2.5" fill="#EC4899" />
        </svg>
      );

    case 'Computer Networks':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="8.5" stroke="#0EA5E9" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="4" ry="8.5" stroke="#0EA5E9" strokeWidth="1.5" />
          <path d="M3.5 12h17M5.5 7h13M5.5 17h13" stroke="#0EA5E9" strokeWidth="1.5" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="8" strokeWidth="1.8" />
          <path d="M12 8v8M8 12h8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
};
