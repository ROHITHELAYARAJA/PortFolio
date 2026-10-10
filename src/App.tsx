import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MobileHeader } from './components/navigation/MobileHeader';
import { DesktopSidebar } from './components/navigation/Sidebar';
import { HeroVisual } from './components/hero/HeroVisual';
import { HeroProfile } from './components/hero/HeroProfile';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { GitHubSection } from './components/github/GitHubSection';
import { OpenSourceSection } from './components/opensource/OpenSourceSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/palette/CommandPalette';
import { CaseStudyModal } from './components/projects/CaseStudyModal';
import { TechStackSection } from './components/skills/TechStackSection';

const ScrollSection: React.FC<{
  children: React.ReactNode;
  id?: string;
  className?: string;
}> = ({ children, id, className = '' }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleOpenContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', '#contact');
  };

  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'experience',
      'technologies-and-tools',
      'github',
      'open-source',
      'projects',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible && visible.target.id) {
          const newHash = `#${visible.target.id}`;
          if (window.location.hash !== newHash) {
            window.history.replaceState(null, '', newHash);
          }
        }
      },
      {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full bg-bg text-body transition-colors duration-200 overflow-x-hidden">
      <MobileHeader
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenContact={handleOpenContact}
      />

      <main className="relative mx-auto w-full max-w-[880px] px-4 pb-24 pt-4 sm:px-6 md:px-8 xl:w-full xl:max-w-[1600px] 2xl:max-w-[1728px] xl:px-6 2xl:px-8 xl:pt-10">
        <section id="home" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          <div className="hidden xl:block" />

          <div className="xl:px-8 2xl:px-[33px]">
            <HeroVisual />
            <HeroProfile onOpenContact={handleOpenContact} />
          </div>

          <div className="hidden xl:block xl:pl-6 2xl:pl-8">
            <DesktopSidebar
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onOpenPalette={() => setIsPaletteOpen(true)}
              onOpenContact={handleOpenContact}
            />
          </div>
        </section>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        <ScrollSection id="experience" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-cabinet text-[26px] font-bold tracking-[-1.5px] text-strong sm:text-[30px]">
              Experience
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#FF4D36] font-semibold hidden xl:block">
              Engineering & Systems
            </p>
          </div>

          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <ExperienceSection />
          </div>

          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        <ScrollSection id="technologies-and-tools" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          <div id="stack" className="xl:pr-6 xl:pt-2">
            <h2 className="font-cabinet text-[26px] font-bold tracking-[-1.5px] text-strong sm:text-[30px]">
              Stack
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#0EA5E9] font-semibold hidden xl:block">
              Technologies & Tools
            </p>
          </div>

          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <TechStackSection />
          </div>

          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        <ScrollSection id="github" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-instrument text-[36px] font-normal italic leading-tight tracking-[-0.4px] text-strong sm:text-[44px]">
              On GitHub
            </h2>
            <a
              href="https://github.com/ROHITHELAYARAJA"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-cabinet text-[15px] font-bold text-[#0EA5E9] hover:underline transition-colors"
            >
              @ROHITHELAYARAJA →
            </a>
          </div>

          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <GitHubSection />
          </div>

          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        <ScrollSection id="open-source" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-instrument text-[36px] font-normal italic leading-tight tracking-[-0.4px] text-strong sm:text-[44px]">
              Open source
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#8B5CF6] font-semibold hidden xl:block">
              Upstream Contributions
            </p>
          </div>

          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <OpenSourceSection />
          </div>

          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        <ScrollSection id="projects" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-instrument text-[36px] font-normal italic leading-tight tracking-[-0.4px] text-strong sm:text-[44px]">
              Projects
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#FF4D36] font-semibold hidden xl:block">
              Flagship & Systems
            </p>
          </div>

          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <ProjectsSection onOpenCaseStudy={(id) => setActiveCaseStudyId(id)} />
          </div>

          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        <ScrollSection id="contact" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-instrument text-[36px] font-normal italic leading-tight tracking-[-0.4px] text-strong sm:text-[44px]">
              Get in Touch
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#FF4D36] font-semibold hidden xl:block">
              Direct Channels
            </p>
          </div>

          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <ContactSection />
          </div>

          <div className="hidden xl:block" />
        </ScrollSection>

        <div className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          <div className="hidden xl:block" />
          <div className="xl:px-8 2xl:px-[33px]">
            <Footer onOpenContact={handleOpenContact} />
          </div>
          <div className="hidden xl:block" />
        </div>
      </main>

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectProject={(id) => setActiveCaseStudyId(id)}
        onOpenContact={handleOpenContact}
      />

      <CaseStudyModal
        projectId={activeCaseStudyId}
        onClose={() => setActiveCaseStudyId(null)}
      />
    </div>
  );
};
