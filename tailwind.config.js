/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        ink: {
          DEFAULT: 'var(--color-ink)',
          soft: 'var(--color-ink-soft)',
        },
        body: 'var(--color-body)',
        nav: 'var(--color-nav)',
        strong: 'var(--color-strong)',
        line: 'var(--color-line)',
        hairline: 'var(--color-hairline)',
        'btn-border': 'var(--color-btn-border)',
        subtle: {
          DEFAULT: 'var(--color-subtle)',
          strong: 'var(--color-subtle-strong)',
        },
      },
      fontFamily: {
        cabinet: ['var(--font-cabinet)', 'system-ui', '-apple-system', 'sans-serif'],
        instrument: ['var(--font-instrument)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        'hero': '18px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
